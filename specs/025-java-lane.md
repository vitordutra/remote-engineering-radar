# SPEC-025 — Java lane

**Status: open.** Fork-only (`vitordutra/remote-engineering-radar`). Adds a lane
to the [SPEC-023](023-lane-rules.md) table and makes it the site's default
focus. Every existing lane, chip, and weight keeps its behaviour.

## Problem

The fork tracks Junior, Mid-level, and Senior Java roles, backend or fullstack.
Today the radar throws them away:

- `UNRELATED_STACK_PATTERNS` matches `\bjava\b`, so a Java posting that names no
  React-stack technology is flagged `isUnrelatedStack` and never persisted.
- `REACT_TITLE_VETOES` rejects every title that says Java.
- Scoring buries the levels the fork wants: junior −100, mid −30.
- The classifier does not know US junior titles ("Software Engineer I",
  "Associate Engineer", "New Grad") or the Brazilian "Jr".

## Decision

A **Java** lane (`roleFocus: 'java'`, chip slug `java`) that is the default
view of `/` and `/jobs`. "All roles" moves to `?focus=all`.

## Lane

Order: Product → Data Annotation → Cloud & Ops → Mobile → **Java** → React.
Java sits before React so a generic fullstack title whose body qualifies for
both lands on Java.

```ts
{
  roleFocus: JAVA_ROLE_FOCUS,
  rules: [
    titleMatchesNone(JAVA_EXCLUDED_POSITIONS),
    titleMatchesNone(JAVA_TITLE_VETOES, { unless: JAVA_ANCHORS }),
    titleAnchorOrBodyPlusN({ titleAnchors: JAVA_ANCHORS, bodyAnchors: JAVA_ANCHORS,
      support: JAVA_SUPPORT_TERMS, n: JAVA_SUPPORT_MINIMUM }),
  ],
}
```

- **Anchors** — Java (never JavaScript) and Kotlin.
- **Support terms** (`n = 2`) — Spring / Spring Boot, Hibernate / JPA,
  Maven / Gradle, Quarkus, Micronaut, JUnit / Mockito, Jakarta EE / J2EE, Ktor.
  Android-only terms (Jetpack Compose, Android SDK) are not support.
- **Excluded positions**, always, even with an anchor in the title:
  - internships: intern, internship, estágio, estagiário
  - levels above senior: staff (not "staff augmentation"), principal,
    especialista
  - leadership: lead, tech lead, líder técnico, architect, arquiteto, manager,
    gerente, head, director
  - other disciplines: QA / SDET / test automation, data engineering
  - mobile platforms: Android, iOS, Mobile, Multiplatform / KMP — Mobile
    keeps Android, and a Kotlin title only counts when it is not mobile
- **Title vetoes**, only when the title has no anchor: Python, Go / Golang,
  .NET / C#, Ruby / Rails, PHP, Node, React, Angular, Vue, Frontend, and the
  Cloud & Ops titles (DevOps, SRE, Platform Engineer, …). "Fullstack Java +
  React" and "Java / Node Developer" stay Java. A DevOps title with fewer than
  two cloud tools does not fall through to Java.

`titleMatchesNone` gains an optional `unless`: the title names none of `terms`,
unless it names one of `unless`.

A Java job no lane accepts (an internship, a Staff or Tech Lead title, a Java
data engineer) keeps `isUnrelatedStack` and is not persisted at all.

## Seniority vocabulary

Title only, for every lane:

- **junior** — Jr, Associate Engineer / Developer, Engineer I / Developer I,
  New Grad, Early Career, Trainee
- **mid** — Engineer II / Developer II
- **senior** — Engineer III / Developer III

Unlabeled Java jobs stay on the lane. Internships stay `junior` in the
classifier; only the Java lane rejects them.

## Classification

Two new booleans, both language vocabulary like `relocation`:

- `isContractor` — contractor, independent contractor, 1099, C2C (not
  "no C2C"), B2B contract, PJ
- `requiresWorkAuthorization` — W2 only, authorized to work in the US,
  US citizens only

New technology kind `java`: Java, Spring, Kotlin, Hibernate (incl. JPA),
Quarkus, Micronaut. Displayed and filterable, never `focus`: a `focus` name
short-circuits `isUnrelatedStack` and would keep every Java data-engineering
job.

## Scoring

Java lane only; every other lane keeps its weights.

| Signal                      | Weight |
| --------------------------- | ------ |
| Java                        | 25     |
| Spring                      | 20     |
| Kotlin                      | 15     |
| Hibernate                   | 15     |
| Quarkus                     | 15     |
| Micronaut                   | 15     |
| Junior / Mid-level / Senior | +15    |
| Backend                     | +10    |
| Contractor                  | +10    |
| Work authorization required | −40    |

The technology table replaces the React table on the lane, as the Cloud & Ops
table does. Fullstack (+10), remote, geography, onsite, and relocation are
unchanged.

## Company signals

The relevant-technology cluster counts the Java technologies too, and its
description no longer names a stack.

## Default view and SEO

- `parseFocusFilter`: no value or an unknown value → `java`; `all` → no lane
  filter. `focusSearchValue` is its inverse: `java` → no parameter, no lane →
  `all`.
- Tabs on `/` and `/jobs`: Java Engineering, All roles, React Engineering,
  Cloud & Ops, Mobile, Data Annotation, Product.
- `/` and `/jobs` are the Java view, indexed, canonical to the bare URL.
  `?focus=java` canonicalizes to the bare URL.
- `?focus=all` is indexable and in the sitemap, like every single-focus view.
- `?country=X` is Java in X; its copy says Java. Combinations stay noindex.

## Copy

- Chip: "Java Engineering" / "Engenharia Java".
- Description, meta titles, home and jobs subtitles lead with Java in both
  locales; About methodology explains the Java lane and its level parity.
- New reasons: Backend, Contractor, Work authorization required.
- README tagline leads with Java. Site name unchanged.

## Data migration

`025-java-lane` reclassifies active jobs once. It only re-sorts stored rows
(a Java + React fullstack job moves from React to Java). Java jobs that were
dropped before return on the next daily ingest.

## Acceptance

RED → GREEN → REFACTOR. Every SPEC-023 case stays green, plus:

- Desenvolvedor Java Pleno → Java, mid
- Junior Java Developer (Contractor) → Java, junior, Contractor reason
- Backend Engineer, Java 17 + Spring Boot + JPA → Java
- Software Engineer, "Java, Python, or Go" → not Java, not persisted
- Fullstack Engineer, Java + Spring Boot + Hibernate + React + TypeScript +
  Next.js + Jest → Java
- Fullstack Java + React Developer → Java
- Senior React Engineer, body with Java + Spring + Hibernate → React
- Senior Python Engineer, body with Java + Spring + Maven → not Java
- Kotlin Backend Engineer, Ktor + Spring → Java
- Kotlin Multiplatform Engineer → not Java
- Android Developer (Java/Kotlin) → Mobile
- Java Intern / Estágio Java → not Java, not persisted
- Staff / Principal / Tech Lead / Java Architect / Engineering Manager (Java)
  → not Java
- Senior Java Developer – Staff Augmentation → Java
- QA Automation Engineer (Java, Selenium) → not Java
- DevOps Engineer, Java + Spring + Maven, no cloud tools → not Java
- Software Engineer I / Associate Software Engineer / New Grad → junior;
  Engineer II → mid; Engineer III → senior; Desenvolvedor Java Jr → junior
- Java lane: junior, mid, and senior score the same; W2-only scores 40 less
- `/jobs` lists Java jobs; `/jobs?focus=all` lists every job
- `/jobs?country=brazil` lists Java jobs in Brazil, titled as Java
- The sitemap lists `?focus=all` and never `?focus=java`
- The `025-java-lane` data migration reclassifies active jobs once

## Debt

- Seniority still reads the whole posting first: a senior posting that says
  "mentor junior engineers" classifies as junior (pre-existing).
- A generic-title Android posting whose body names Kotlin + Gradle + JUnit and
  never says Android in the title can land on Java.
- "(Contract)" in a title is not a contractor signal; only the listed terms are.
- Upstream's `\b\.net\b` (React vetoes, unrelated stacks) misses " .NET" after
  a space; the Java vetoes use a pattern that does not.
- `backend-br/vagas` as a source is a separate spec.
