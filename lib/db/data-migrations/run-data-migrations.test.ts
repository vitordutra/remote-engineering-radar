import {
  JAVA_ROLE_FOCUS,
  REACT_ROLE_FOCUS,
} from '@/lib/classification/constants';
import { createCompaniesRepository } from '@/lib/db/repositories/companies-repository';
import { createJobsRepository } from '@/lib/db/repositories/jobs-repository';
import { TEST_COMPANY, TEST_JOB } from '@/lib/db/repositories/test-fixtures';
import { createTestDb } from '@/lib/db/test/create-test-db';
import { SCORE_WEIGHTS } from '@/lib/scoring/constants';
import {
  CONTRACT_TITLE_DATA_MIGRATION,
  JAVA_LANE_DATA_MIGRATION,
  LANE_STRATEGIES_DATA_MIGRATION,
  TITLE_FIRST_SENIORITY_DATA_MIGRATION,
} from './constants';
import { DATA_MIGRATIONS } from './registry';
import { runPendingDataMigrations } from './run-data-migrations';

const FIRST_MIGRATION = 'test-first';
const SECOND_MIGRATION = 'test-second';
/** A row as the previous classifier stored it, and what the backfill fixes. */
const STORED_JOB_BACKFILLS = [
  {
    name: 'moves a stored Java + React job onto the Java lane',
    migration: JAVA_LANE_DATA_MIGRATION,
    stored: {
      sourceJobId: 'java-fullstack',
      title: 'Fullstack Java + React Developer',
      description: 'Java, Spring Boot, React, and TypeScript.',
      roleFocus: [REACT_ROLE_FOCUS],
    },
    expected: { roleFocus: expect.arrayContaining([JAVA_ROLE_FOCUS]) },
  },
  {
    name: 'reads a stored senior job by its title, not its mentoring duties',
    migration: TITLE_FIRST_SENIORITY_DATA_MIGRATION,
    stored: {
      sourceJobId: 'senior-mentor',
      title: 'Senior React Engineer',
      description: 'You will mentor junior engineers.',
      seniority: 'junior',
    },
    expected: { seniority: 'senior' },
  },
];

/** One posting, with and without "(Contract)" in its title. */
const CONTRACT_TITLE_TWINS = [
  {
    sourceJobId: 'java-contract',
    title: 'Junior Java Developer (Contract)',
    description: 'Java and Spring.',
  },
  {
    sourceJobId: 'java-employee',
    title: 'Junior Java Developer',
    description: 'Java and Spring.',
  },
] as const;

describe('runPendingDataMigrations', () => {
  it('registers the lane-strategies backfill that ships with the classifier', () => {
    expect(DATA_MIGRATIONS.map((migration) => migration.name)).toContain(
      LANE_STRATEGIES_DATA_MIGRATION,
    );
  });

  it('runs an unapplied migration once and skips it the next time', async () => {
    const db = await createTestDb();
    const ran: string[] = [];
    const migrations = [
      {
        name: FIRST_MIGRATION,
        up: async () => {
          ran.push(FIRST_MIGRATION);
        },
      },
      {
        name: SECOND_MIGRATION,
        up: async () => {
          ran.push(SECOND_MIGRATION);
        },
      },
    ];

    await expect(runPendingDataMigrations(db, migrations)).resolves.toEqual([
      FIRST_MIGRATION,
      SECOND_MIGRATION,
    ]);
    await expect(runPendingDataMigrations(db, migrations)).resolves.toEqual([]);
    expect(ran).toEqual([FIRST_MIGRATION, SECOND_MIGRATION]);
  });

  it.each(STORED_JOB_BACKFILLS)(
    '$name once',
    async ({ migration, stored, expected }) => {
      const db = await createTestDb();
      const company = await createCompaniesRepository(db).create(TEST_COMPANY);
      const jobsRepository = createJobsRepository(db);
      const job = await jobsRepository.create({
        ...TEST_JOB,
        ...stored,
        companyId: company.id,
        technologies: [...TEST_JOB.technologies],
      });
      const backfill = DATA_MIGRATIONS.filter(
        (registered) => registered.name === migration,
      );

      await expect(runPendingDataMigrations(db, backfill)).resolves.toEqual([
        migration,
      ]);
      await expect(jobsRepository.findById(job.id)).resolves.toMatchObject({
        isActive: true,
        ...expected,
      });
      await expect(runPendingDataMigrations(db, backfill)).resolves.toEqual([]);
    },
  );

  it('pays a stored contract-titled Java job its contractor weight once', async () => {
    const db = await createTestDb();
    const company = await createCompaniesRepository(db).create(TEST_COMPANY);
    const jobsRepository = createJobsRepository(db);
    const [contractTwin, employeeTwin] = CONTRACT_TITLE_TWINS;
    const contract = await jobsRepository.create({
      ...TEST_JOB,
      ...contractTwin,
      companyId: company.id,
      technologies: [...TEST_JOB.technologies],
    });
    const employee = await jobsRepository.create({
      ...TEST_JOB,
      ...employeeTwin,
      companyId: company.id,
      technologies: [...TEST_JOB.technologies],
    });
    const backfill = DATA_MIGRATIONS.filter(
      (registered) => registered.name === CONTRACT_TITLE_DATA_MIGRATION,
    );
    const scoreOf = async (id: string) =>
      (await db.job.findUniqueOrThrow({ where: { id } })).score;

    await expect(runPendingDataMigrations(db, backfill)).resolves.toEqual([
      CONTRACT_TITLE_DATA_MIGRATION,
    ]);
    expect((await scoreOf(contract.id)) - (await scoreOf(employee.id))).toBe(
      SCORE_WEIGHTS.contractor,
    );
    await expect(runPendingDataMigrations(db, backfill)).resolves.toEqual([]);
  });
});
