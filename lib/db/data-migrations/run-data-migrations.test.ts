import {
  JAVA_ROLE_FOCUS,
  REACT_ROLE_FOCUS,
} from '@/lib/classification/constants';
import { createCompaniesRepository } from '@/lib/db/repositories/companies-repository';
import { createJobsRepository } from '@/lib/db/repositories/jobs-repository';
import { TEST_COMPANY, TEST_JOB } from '@/lib/db/repositories/test-fixtures';
import { createTestDb } from '@/lib/db/test/create-test-db';
import {
  JAVA_LANE_DATA_MIGRATION,
  LANE_STRATEGIES_DATA_MIGRATION,
} from './constants';
import { DATA_MIGRATIONS } from './registry';
import { runPendingDataMigrations } from './run-data-migrations';

const FIRST_MIGRATION = 'test-first';
const SECOND_MIGRATION = 'test-second';
const JAVA_FULLSTACK_JOB = {
  sourceJobId: 'java-fullstack',
  title: 'Fullstack Java + React Developer',
  description: 'Java, Spring Boot, React, and TypeScript.',
};

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

  it('moves a stored Java + React job onto the Java lane once', async () => {
    const db = await createTestDb();
    const company = await createCompaniesRepository(db).create(TEST_COMPANY);
    const jobsRepository = createJobsRepository(db);
    const job = await jobsRepository.create({
      ...TEST_JOB,
      ...JAVA_FULLSTACK_JOB,
      companyId: company.id,
      roleFocus: [REACT_ROLE_FOCUS],
      technologies: [...TEST_JOB.technologies],
    });
    const javaLane = DATA_MIGRATIONS.filter(
      (migration) => migration.name === JAVA_LANE_DATA_MIGRATION,
    );

    await expect(runPendingDataMigrations(db, javaLane)).resolves.toEqual([
      JAVA_LANE_DATA_MIGRATION,
    ]);
    await expect(jobsRepository.findById(job.id)).resolves.toMatchObject({
      isActive: true,
      roleFocus: expect.arrayContaining([JAVA_ROLE_FOCUS]),
    });
    await expect(runPendingDataMigrations(db, javaLane)).resolves.toEqual([]);
  });
});
