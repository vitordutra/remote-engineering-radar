import { scoreJob } from './score-job';

const JAVA_LEVEL_TITLES = [
  'Junior Java Developer',
  'Mid-level Java Developer',
  'Senior Java Developer',
];
const JAVA_STACK_DESCRIPTION = 'Java, Spring Boot, and Hibernate.';
const REMOTE_POLICY = 'remote';
const LATAM_LOCATION = 'Remote LATAM';
const JAVA_FULLSTACK_JOB = {
  title: 'Fullstack Java Developer',
  description: 'Java, Spring Boot, React, and TypeScript.',
  remotePolicy: REMOTE_POLICY,
};
const JAVA_BACKEND_TITLE = 'Senior Backend Java Developer';
const JAVA_FULLSTACK_TITLE = 'Senior Fullstack Java Developer';
const JAVA_CONTRACTOR_TITLE = 'Senior Java Developer (Contractor)';
const PLAIN_JAVA_TITLE = 'Senior Java Developer';
const W2_ONLY_DESCRIPTION = `${JAVA_STACK_DESCRIPTION} W2 only.`;
const REACT_CONTRACTOR_TITLE = 'Senior React Engineer (Contractor)';
const REACT_TITLE = 'Senior React Engineer';
const REACT_STACK_DESCRIPTION = 'React and TypeScript.';
const REACT_W2_ONLY_DESCRIPTION = `${REACT_STACK_DESCRIPTION} W2 only.`;
const CONTRACTOR_REASON = 'Contractor';
const WORK_AUTHORIZATION_REASON = 'Work authorization required';
const BACKEND_REASON = 'Backend';
const CONTRACTOR_WEIGHT = 10;
const WORK_AUTHORIZATION_WEIGHT = -40;

const javaJob = (title: string, description = JAVA_STACK_DESCRIPTION) =>
  scoreJob({
    title,
    description,
    location: LATAM_LOCATION,
    remotePolicy: REMOTE_POLICY,
  });

describe('scoreJob', () => {
  describe('Java lane', () => {
    it('scores junior, mid-level, and senior Java jobs the same', () => {
      const [junior, mid, senior] = JAVA_LEVEL_TITLES.map((title) =>
        javaJob(title),
      );

      expect(junior.rawScore).toBe(senior.rawScore);
      expect(mid.rawScore).toBe(senior.rawScore);
      expect(junior.reasons).toContain('Junior');
      expect(mid.reasons).toContain('Mid-level');
      expect(senior.reasons).toContain('Senior');
    });

    it('pays the Java stack instead of the React table', () => {
      const result = scoreJob(JAVA_FULLSTACK_JOB);

      expect(result.reasons).toEqual(
        expect.arrayContaining(['Java', 'Spring']),
      );
      expect(result.reasons).not.toContain('React');
      expect(result.reasons).not.toContain('TypeScript');
    });

    it('pays a backend Java job like a fullstack one', () => {
      const backend = javaJob(JAVA_BACKEND_TITLE);
      const fullstack = javaJob(JAVA_FULLSTACK_TITLE);

      expect(backend.rawScore).toBe(fullstack.rawScore);
      expect(backend.reasons).toContain(BACKEND_REASON);
    });

    it('pays a contractor engagement', () => {
      const contractor = javaJob(JAVA_CONTRACTOR_TITLE);
      const employee = javaJob(PLAIN_JAVA_TITLE);

      expect(contractor.rawScore - employee.rawScore).toBe(CONTRACTOR_WEIGHT);
      expect(contractor.reasons).toContain(CONTRACTOR_REASON);
    });

    it('penalizes a US work-authorization requirement', () => {
      const w2Only = javaJob(PLAIN_JAVA_TITLE, W2_ONLY_DESCRIPTION);
      const open = javaJob(PLAIN_JAVA_TITLE);

      expect(w2Only.rawScore - open.rawScore).toBe(WORK_AUTHORIZATION_WEIGHT);
      expect(w2Only.reasons).toContain(WORK_AUTHORIZATION_REASON);
    });

    it('leaves contractor and work authorization unscored off the Java lane', () => {
      const plain = scoreJob({
        title: REACT_TITLE,
        description: REACT_STACK_DESCRIPTION,
      });
      const contractor = scoreJob({
        title: REACT_CONTRACTOR_TITLE,
        description: REACT_STACK_DESCRIPTION,
      });
      const w2Only = scoreJob({
        title: REACT_TITLE,
        description: REACT_W2_ONLY_DESCRIPTION,
      });

      expect(contractor.rawScore).toBe(plain.rawScore);
      expect(w2Only.rawScore).toBe(plain.rawScore);
      expect([...contractor.reasons, ...w2Only.reasons]).not.toEqual(
        expect.arrayContaining([CONTRACTOR_REASON]),
      );
    });
  });

  it('scores a high-fit Senior React TypeScript GraphQL Remote LATAM job highly', () => {
    const result = scoreJob({
      title: 'Senior Frontend Engineer',
      description: 'React, TypeScript, GraphQL',
      location: 'Remote LATAM',
      remotePolicy: 'remote',
    });

    expect(result.score).toBeGreaterThanOrEqual(90);
    expect(result.reasons).toEqual(
      expect.arrayContaining([
        'React',
        'TypeScript',
        'GraphQL',
        'Senior',
        'Remote',
        'LATAM',
      ]),
    );
  });

  it('ranks high-fit jobs above weak-fit jobs', () => {
    const highFit = scoreJob({
      title: 'Senior Fullstack Engineer',
      description: 'React, TypeScript, Node.js, GraphQL',
      location: 'Remote - Brazil',
      remotePolicy: 'remote',
    });

    const weakFit = scoreJob({
      title: 'Software Engineer',
      description: 'Some JavaScript experience',
      location: 'Hybrid',
    });

    expect(highFit.score).toBeGreaterThan(weakFit.score);
  });

  it('keeps Junior React scores extremely low', () => {
    const result = scoreJob({
      title: 'Junior React Developer',
      description: 'React internship-friendly role',
      remotePolicy: 'remote',
    });

    expect(result.score).toBeLessThanOrEqual(10);
    expect(result.reasons).toContain('Junior');
  });

  it('uses stored seniority when free text does not expose the label', () => {
    const result = scoreJob({
      title: 'Desenvolvedor Frontend',
      description: 'React e TypeScript',
      seniority: 'senior',
    });

    expect(result.reasons).toContain('Senior');
  });

  it('strongly penalizes on-site-only roles', () => {
    const remote = scoreJob({
      title: 'Senior React Engineer',
      description: 'React and TypeScript',
      remotePolicy: 'remote',
    });

    const onsite = scoreJob({
      title: 'Senior React Engineer',
      description: 'React and TypeScript',
      location: 'ONSITE New York',
    });

    expect(onsite.score).toBeLessThan(remote.score);
    expect(onsite.reasons).toContain('On-site only');
  });

  it('prevents unrelated stacks from scoring high', () => {
    const result = scoreJob({
      title: 'Senior Data Engineer',
      description: 'Spark and Airflow ETL',
      remotePolicy: 'remote',
    });

    expect(result.score).toBeLessThan(40);
    expect(result.reasons).toContain('Unrelated stack');
  });

  it('is deterministic for the same input', () => {
    const input = {
      title: 'Senior React Native Engineer',
      description: 'React Native and Expo',
      location: 'Remote Americas',
      remotePolicy: 'remote' as const,
    };

    expect(scoreJob(input)).toEqual(scoreJob(input));
  });

  it('scores a senior remote Cloud & Ops job on a par with its React equivalent', () => {
    const cloudOps = scoreJob({
      title: 'Senior DevOps Engineer',
      description: 'AWS, Kubernetes, and Terraform',
      location: 'Remote LATAM',
      remotePolicy: 'remote',
    });

    const react = scoreJob({
      title: 'Senior Frontend Engineer',
      description: 'React, TypeScript, GraphQL',
      location: 'Remote LATAM',
      remotePolicy: 'remote',
    });

    expect(cloudOps.score).toBeGreaterThanOrEqual(90);
    expect(cloudOps.score).toBe(react.score);
    expect(cloudOps.reasons).toEqual(
      expect.arrayContaining(['AWS', 'Kubernetes', 'Terraform', 'Platform']),
    );
    expect(cloudOps.reasons).not.toContain('Unrelated stack');
  });

  it('does not pay a React job for mentioning cloud tooling', () => {
    const withCloudMentions = scoreJob({
      title: 'Senior Frontend Engineer',
      description: 'React and TypeScript, deployed with Docker on AWS',
      remotePolicy: 'remote',
    });

    const withoutCloudMentions = scoreJob({
      title: 'Senior Frontend Engineer',
      description: 'React and TypeScript',
      remotePolicy: 'remote',
    });

    expect(withCloudMentions.rawScore).toBe(withoutCloudMentions.rawScore);
  });
});
