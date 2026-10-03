import { foldText } from '@/lib/text/fold-text/fold-text';
import { laneRoleFocus } from './lane-strategies';

const laneInput = (title: string, description?: string) => ({
  title: foldText(title),
  haystack: foldText([title, description].filter(Boolean).join('\n')),
});

const REACT_LANE = 'react';
const MOBILE_LANE = 'mobile';
const PLATFORM_LANE = 'platform';
const PRODUCT_LANE = 'product';
const ANNOTATION_LANE = 'annotation';
const JAVA_LANE = 'java';

const SOFTWARE_TITLE = 'Senior Software Engineer';
const REACT_STACK_BODY =
  'React + TypeScript + Next.js + Jest, shipped every week.';
const JAVA_STACK_BODY = 'Java 17, Spring Boot, Kafka, and JPA.';
const JAVA_MENTION_BODY = 'Java, Spring, and Maven are a plus.';

const JAVA_LANE_CASES = [
  {
    name: 'a Java title is enough on its own',
    input: laneInput('Desenvolvedor Java Pleno'),
    lane: JAVA_LANE,
  },
  {
    name: 'a junior contractor Java title is Java',
    input: laneInput('Junior Java Developer (Contractor)'),
    lane: JAVA_LANE,
  },
  {
    name: 'a Java stack in the body clears the support minimum',
    input: laneInput('Backend Engineer', JAVA_STACK_BODY),
    lane: JAVA_LANE,
  },
  {
    name: 'Java listed among other languages is not Java',
    input: laneInput(
      'Software Engineer',
      'Experience with Java, Python, or Go.',
    ),
    lane: undefined,
  },
  {
    name: 'a fullstack body that qualifies for Java and React is Java',
    input: laneInput(
      'Fullstack Engineer',
      'Java, Spring Boot, Hibernate, React, TypeScript, Next.js, and Jest.',
    ),
    lane: JAVA_LANE,
  },
  {
    name: 'a Java + React title is Java',
    input: laneInput('Fullstack Java + React Developer'),
    lane: JAVA_LANE,
  },
  {
    name: 'a Java + Node title is Java',
    input: laneInput('Java / Node.js Developer'),
    lane: JAVA_LANE,
  },
  {
    name: 'a React title whose backend is Java stays React',
    input: laneInput(
      'Senior React Engineer',
      'Our backend runs on Java, Spring, and Hibernate.',
    ),
    lane: REACT_LANE,
  },
  {
    name: 'a Python title vetoes a Java stack in the body',
    input: laneInput('Senior Python Engineer', JAVA_MENTION_BODY),
    lane: undefined,
  },
  {
    name: 'a .NET title vetoes a Java stack in the body',
    input: laneInput('Senior .NET Developer', JAVA_MENTION_BODY),
    lane: undefined,
  },
  {
    name: 'a DevOps title without cloud tools does not fall through to Java',
    input: laneInput('DevOps Engineer', 'Java, Spring, and Maven builds.'),
    lane: undefined,
  },
  {
    name: 'a Kotlin backend title is Java',
    input: laneInput('Kotlin Backend Engineer', 'Ktor and Spring services.'),
    lane: JAVA_LANE,
  },
  {
    name: 'a Kotlin Multiplatform title is not Java',
    input: laneInput(
      'Kotlin Multiplatform Engineer',
      'Share Kotlin code with Gradle and JUnit.',
    ),
    lane: undefined,
  },
  {
    name: 'an Android title in Java and Kotlin stays Mobile',
    input: laneInput(
      'Android Developer (Java/Kotlin)',
      'Ship our Android app.',
    ),
    lane: MOBILE_LANE,
  },
  {
    name: 'a staff augmentation title is not a staff level',
    input: laneInput('Senior Java Developer - Staff Augmentation'),
    lane: JAVA_LANE,
  },
] as const;

/** Java titles the lane rejects even though they name Java. */
const JAVA_EXCLUDED_TITLES = [
  'Java Intern',
  'Estágio Java',
  'Staff Java Engineer',
  'Principal Java Engineer',
  'Especialista Java',
  'Tech Lead Java',
  'Líder Técnico Java',
  'Java Architect',
  'Engineering Manager (Java)',
  'QA Automation Engineer (Java, Selenium)',
  'Java Data Engineer',
] as const;

const LANE_CASES = [
  {
    name: 'a React title is enough on its own',
    input: laneInput('Senior React Engineer'),
    lane: REACT_LANE,
  },
  {
    name: 'a React stack in the body clears the support minimum',
    input: laneInput(SOFTWARE_TITLE, REACT_STACK_BODY),
    lane: REACT_LANE,
  },
  {
    name: 'a data engineering lead is not React',
    input: laneInput(
      'Head of Data Engineering',
      'Own our Spark and Airflow pipelines.',
    ),
    lane: undefined,
  },
  {
    name: 'a designer who works with React engineers is not React',
    input: laneInput(
      'Product Designer',
      'You will work with React engineers every day.',
    ),
    lane: undefined,
  },
  {
    name: 'the verb react is not the library',
    input: laneInput(SOFTWARE_TITLE, 'We react quickly to customer feedback.'),
    lane: undefined,
  },
  {
    name: 'React alone in the body is not enough',
    input: laneInput(SOFTWARE_TITLE, 'Our stack includes React.'),
    lane: undefined,
  },
  {
    name: 'an Angular title vetoes a React stack in the body',
    input: laneInput('Angular Developer', REACT_STACK_BODY),
    lane: undefined,
  },
  {
    name: 'an iOS title is Mobile',
    input: laneInput('iOS Engineer', 'Ship our native app.'),
    lane: MOBILE_LANE,
  },
  {
    name: 'React Native without iOS or Android is not Mobile',
    input: laneInput(
      'React Native Engineer',
      'Build cross-platform apps with Expo.',
    ),
    lane: REACT_LANE,
  },
  {
    name: 'Flutter alone is not Mobile',
    input: laneInput('Mobile Engineer', 'We build with Flutter.'),
    lane: undefined,
  },
  {
    name: 'a Mobile title whose posting names a platform is Mobile',
    input: laneInput('Senior Mobile Engineer', 'Ship our iOS app.'),
    lane: MOBILE_LANE,
  },
  {
    name: 'a React Native title whose posting names both platforms is Mobile',
    input: laneInput(
      'Senior React Native Developer',
      'Ship features on iOS and Android with TypeScript.',
    ),
    lane: MOBILE_LANE,
  },
  {
    name: 'a QA engineer testing the apps is not Mobile',
    input: laneInput('QA Engineer', 'Test our iOS and Android apps.'),
    lane: undefined,
  },
  {
    name: 'a Mobile QA position is not Mobile',
    input: laneInput(
      'Mobile QA Analyst',
      'Manual and automated testing on Android devices.',
    ),
    lane: undefined,
  },
  {
    name: 'a product designer drawing the apps is not Mobile',
    input: laneInput(
      'Mobile Product Designer',
      'Design flows for our iOS and Android apps.',
    ),
    lane: undefined,
  },
  {
    name: 'a backend engineer serving the apps is not Mobile',
    input: laneInput(
      'Senior Backend Engineer',
      'Build the APIs our iOS and Android clients consume.',
    ),
    lane: undefined,
  },
  {
    name: 'a cloud title with two tools is Cloud & Ops',
    input: laneInput(
      'Senior DevOps Engineer',
      'Run AWS and Kubernetes in production.',
    ),
    lane: PLATFORM_LANE,
  },
  {
    name: 'a cloud title with one tool is not Cloud & Ops',
    input: laneInput('Cloud Engineer', 'We run on AWS.'),
    lane: undefined,
  },
  {
    name: 'cloud tooling without a cloud title is not Cloud & Ops',
    input: laneInput(
      SOFTWARE_TITLE,
      'React and TypeScript, deployed with Docker on AWS.',
    ),
    lane: undefined,
  },
  {
    name: 'a product manager title is Product',
    input: laneInput('Senior Product Manager'),
    lane: PRODUCT_LANE,
  },
  {
    name: 'an AI trainer title is Data Annotation',
    input: laneInput('Freelance AI Trainer - Python'),
    lane: ANNOTATION_LANE,
  },
] as const;

describe('laneRoleFocus', () => {
  it.each(LANE_CASES)('$name', ({ input, lane }) => {
    expect(laneRoleFocus(input)).toBe(lane);
  });

  describe('Java', () => {
    it.each(JAVA_LANE_CASES)('$name', ({ input, lane }) => {
      expect(laneRoleFocus(input)).toBe(lane);
    });

    it.each(JAVA_EXCLUDED_TITLES)('keeps %s off every lane', (title) => {
      expect(laneRoleFocus(laneInput(title, JAVA_STACK_BODY))).toBeUndefined();
    });
  });
});
