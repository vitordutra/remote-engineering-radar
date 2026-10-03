export const LOCALE_COOKIE = 'remote-engineering-radar-locale';
export const LOCALES = ['en', 'pt-BR'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const EN_MESSAGES = {
  app: {
    name: 'Remote Engineering Radar',
    focusStack:
      'Java, Spring Boot, and Kotlin; React, TypeScript, Node.js, GraphQL, and React Native; and Cloud & Ops',
    description:
      'Remote tech jobs and the companies hiring for them, led by Java Engineering for junior, mid-level, and senior developers (Java, Spring Boot, Kotlin), plus React Engineering (React, TypeScript, Node.js, GraphQL, React Native), Cloud & Ops, Mobile, Product, and Data Annotation, with Brazil and LATAM filters.',
  },
  navigation: {
    label: 'Main navigation',
    companies: 'Companies',
    jobs: 'Jobs',
    about: 'About',
    language: 'Language',
    languages: { en: 'English', 'pt-BR': 'Português (Brasil)' },
    github: 'GitHub',
  },
  home: {
    subtitle:
      'Companies hiring remote Java developers – junior, mid-level, and senior, backend or fullstack – plus React, TypeScript, Node.js, GraphQL and React Native, Cloud & Ops, Product, and Data Annotation talent.',
    companiesToWatch: 'Companies to watch',
    relevantJobs: 'Relevant jobs',
    seeAllJobs: (count: number) => `See all ${count} jobs`,
    openRoles: (count: number) =>
      `${count} ${count === 1 ? 'open role' : 'open roles'}`,
    evidence: 'Evidence / sources',
    countryFilterLabel: 'Country',
    countryAll: 'All countries',
    sortLabel: 'Sort',
    sortOptions: {
      default: 'Hiring signal',
      jobs: 'Open roles',
      name: 'Name (A–Z)',
    },
    loading: 'Loading companies…',
  },
  jobs: {
    title: 'Jobs',
    subtitle:
      'Search remote Java openings for junior, mid-level, and senior developers, backend or fullstack, plus React, TypeScript, Node.js, GraphQL and React Native, Cloud & Ops, Product, and Data Annotation roles.',
    metaTitle: 'Remote Java Developer Jobs: Junior, Mid-level & Senior',
    filtersHeading: 'Filters',
    focusLabel: 'Focus area',
    focusAll: 'All roles',
    technology: 'Technology',
    seniority: 'Seniority',
    remote: 'Remote policy',
    country: 'Country',
    anyOption: 'Any',
    minimumScore: 'Minimum score',
    apply: 'Apply filters',
    empty: 'No active jobs match these filters.',
    notFound: 'This job is inactive or was not found.',
    backToJobs: 'Back to jobs',
    loading: 'Loading jobs…',
    whyRelevant: 'Why this is relevant:',
    sortLabel: 'Sort jobs',
    sortOptions: {
      newest: 'Newest first',
      relevance: 'Most relevant',
    },
  },
  jobDetailMeta: {
    title: (title: string, company: string | null) =>
      company ? `${title} at ${company}` : title,
    description: (title: string, location: string | null) =>
      `${title}. Remote engineering opportunity${location ? ` in ${location}` : ''}. View the role and original listing.`,
  },
  seo: {
    homeTitle: 'Companies Hiring Remote Java Developers',
    allCompaniesTitle:
      'Companies hiring remote Java, React, Cloud & Product talent',
    allCompaniesDescription:
      'Companies with open remote roles in Java Engineering, React Engineering, Cloud & Ops, Mobile, Product, and Data Annotation, ranked by hiring signal. Updated daily.',
    countryCompaniesTitle: (place: string) =>
      `Companies hiring remote Java developers – ${place}`,
    countryCompaniesDescription: (place: string) =>
      `Companies with open remote junior, mid-level, and senior Java roles – ${place}. Updated daily.`,
    focusCompaniesTitle: (track: string) =>
      `Companies hiring remote ${track} roles`,
    focusCompaniesDescription: (track: string) =>
      `Companies with open remote senior ${track} roles, ranked by hiring signal. Updated daily.`,
    allJobsTitle: 'Remote Java, React, Cloud & Product Jobs',
    allJobsDescription:
      'Remote Java Engineering, React Engineering, Cloud & Ops, Mobile, Product, and Data Annotation jobs from public job boards. Updated daily.',
    countryJobsTitle: (place: string) => `Remote Java jobs – ${place}`,
    countryJobsDescription: (place: string) =>
      `Remote junior, mid-level, and senior Java jobs, backend or fullstack – ${place}. Updated daily.`,
    focusJobsTitle: (track: string) => `Remote ${track} jobs`,
    focusJobsDescription: (track: string) =>
      `Remote senior ${track} jobs from public job boards. Updated daily.`,
  },
  focus: {
    java: 'Java Engineering',
    engineering: 'React Engineering',
    'cloud-ops': 'Cloud & Ops',
    mobile: 'Mobile',
    'data-annotation': 'Data Annotation',
    product: 'Product',
  },
  countries: {
    brazil: 'Brazil',
    chile: 'Chile',
    argentina: 'Argentina',
    mexico: 'Mexico',
    colombia: 'Colombia',
    'united-states': 'United States',
    ukraine: 'Ukraine',
    india: 'India',
    egypt: 'Egypt',
    pakistan: 'Pakistan',
    latam: 'LATAM',
    worldwide: 'Worldwide',
  },
  seniority: {
    junior: 'junior',
    mid: 'mid',
    senior: 'senior',
    staff: 'staff',
    principal: 'principal',
  },
  remote: { remote: 'remote', hybrid: 'hybrid', onsite: 'onsite' },
  jobReasons: {
    Senior: 'Senior',
    Staff: 'Staff',
    'Mid-level': 'Mid-level',
    Junior: 'Junior',
    Frontend: 'Frontend',
    Fullstack: 'Fullstack',
    Backend: 'Backend',
    Platform: 'Cloud & Ops',
    Remote: 'Remote',
    'On-site only': 'On-site only',
    Brazil: 'Brazil',
    LATAM: 'LATAM',
    Americas: 'Americas',
    'Relocation required': 'Relocation required',
    Contractor: 'Contractor',
    'Work authorization required': 'US work authorization required',
    'Unrelated stack': 'Unrelated stack',
    'Unrelated role': 'Unrelated role',
  },
  jobCard: {
    hideAction: 'Hide job',
    hideConfirmation:
      'Hide this job? You will not see it again in this browser.',
    viewOriginal: 'View original job',
    postedLabel: 'Posted',
    unknownCompany: 'Unknown company',
  },
  companyCard: {
    hiringSignalLabel: 'Hiring signal',
    signalsLabel: 'Signals:',
    viewCompany: 'View company',
    openRolesSuffix: 'engineering positions currently open',
    summaries: {
      'Strong hiring signal': 'Strong hiring signal',
      'Company is actively expanding engineering hiring.':
        'Company is actively expanding engineering hiring.',
    },
    kindLabels: {
      product: 'Product',
      consultancy: 'Consultancy',
      staffing: 'Staffing',
    },
  },
  report: {
    emptyCompanies: 'No companies to watch yet.',
    error: 'The report could not be loaded from the database.',
    unknownTime: 'Unknown',
    updated: (value: string) => `Updated: ${value}`,
  },
  globalError: {
    title: 'Something went wrong',
    description: 'The page could not be rendered. Trying again may be enough.',
    retry: 'Try again',
  },
  about: {
    title: 'About the radar',
    introduction:
      'A daily overview of remote engineering opportunities, with links to the original sources.',
    sourcesTitle: 'Sources',
    sourcesIntro:
      'We ingest public listings only. Each source is fetched as JSON or an embedded public payload — no applications are submitted on your behalf.',
    sources: [
      {
        name: 'Greenhouse',
        description:
          'Public boards of companies on the radar, via the Greenhouse API.',
      },
      {
        name: 'Ashby',
        description:
          'Public boards of companies on the radar, via the Ashby API.',
      },
      {
        name: 'Lever',
        description:
          'Public boards of companies on the radar, via the Lever API.',
      },
      {
        name: 'GetOnBrd',
        description: 'Public programming-category API (LATAM-focused boards).',
      },
      {
        name: 'Hacker News',
        description:
          'Algolia search over the latest “Who is hiring?” thread comments.',
      },
      {
        name: 'Himalayas',
        description: 'Public remote jobs API (bounded recent pages).',
      },
      {
        name: 'Jobicy',
        description: 'Public remote engineering feed (count-limited).',
      },
      {
        name: 'frontendbr',
        description: 'Open issues from the frontendbr/vagas GitHub repository.',
      },
      {
        name: 'quave',
        description: 'Open issues from the quavedev/join GitHub repository.',
      },
      {
        name: 'Y Combinator',
        description:
          'Public Work at a Startup listing pages for remote software-engineering roles.',
      },
    ],
    freshnessTitle: 'Freshness and scope',
    freshness:
      'Ingestion runs once daily through GitHub Actions. Listings can be up to 24 hours out of date.',
    scope:
      'Only remote roles posted within the last 30 days are shown, across all focus areas.',
    scoringTitle: 'Signals, not endorsements',
    scoring:
      'Scores are heuristics over public text — not endorsements of a company or role.',
    scoringJob:
      'The radar tracks six focus areas and opens on Java Engineering. Java Engineering has its own scoring: it favors Java, Spring, Kotlin, Hibernate/JPA, Quarkus, and Micronaut, ranks junior, mid-level, and senior roles equally, backend or fullstack, favors contractor engagements, and down-ranks roles that require US work authorization (W2 only, US citizens only). React Engineering favors React, TypeScript, Node.js, GraphQL, and React Native; Cloud & Ops favors AWS, Kubernetes, Terraform, Docker, Azure, and GCP. Mobile groups iOS and Android roles, Data Annotation groups AI training, data labeling, and RLHF roles, and Product groups product manager and product owner roles. Outside Java, senior/staff titles are favored and junior roles are heavily down-ranked. Every area favors remote work and Brazil/LATAM/Americas geography, and down-ranks onsite-only, relocation-required, and unrelated stacks.',
    scoringCompany:
      'Company hiring score aggregates active engineering openings, recent posting bursts, relevant tech matches, and leadership roles — again from public listings only.',
    applications:
      'The radar does not accept applications. Follow the original job links to check the details and apply directly at the source.',
    contactTitle: 'Contact',
    contact:
      'Questions, corrections, or source suggestions — email works best. The personal site has more context on other work.',
    contactEmailLabel: 'Email',
    contactSiteLabel: 'Personal site',
    repositoryTitle: 'Open source',
    repository: 'Explore the code and how the radar works on GitHub.',
  },
};
export const PT_BR_MESSAGES: typeof EN_MESSAGES = {
  app: {
    name: 'Remote Engineering Radar',
    focusStack:
      'Java, Spring Boot e Kotlin; React, TypeScript, Node.js, GraphQL e React Native; e Cloud & Ops',
    description:
      'Vagas remotas de tecnologia e as empresas que estão contratando, com destaque para Engenharia Java para pessoas desenvolvedoras júnior, plenas e sêniores (Java, Spring Boot, Kotlin), além de Engenharia React (React, TypeScript, Node.js, GraphQL, React Native), Cloud & Ops, Mobile, Produto e Anotação de Dados, com filtros para Brasil e LATAM.',
  },
  navigation: {
    label: 'Navegação principal',
    companies: 'Empresas',
    jobs: 'Vagas',
    about: 'Sobre',
    language: 'Idioma',
    languages: { en: 'English', 'pt-BR': 'Português (Brasil)' },
    github: 'GitHub',
  },
  home: {
    subtitle:
      'Empresas contratando pessoas desenvolvedoras Java para trabalho remoto – júnior, pleno e sênior, backend ou fullstack – além de React, TypeScript, Node.js, GraphQL e React Native, Cloud & Ops, Produto e Anotação de Dados.',
    companiesToWatch: 'Empresas para acompanhar',
    relevantJobs: 'Vagas relevantes',
    seeAllJobs: (count: number) => `Ver todas as ${count} vagas`,
    openRoles: (count: number) =>
      `${count} ${count === 1 ? 'vaga aberta' : 'vagas abertas'}`,
    evidence: 'Evidências / fontes',
    countryFilterLabel: 'País',
    countryAll: 'Todos os países',
    sortLabel: 'Ordenar',
    sortOptions: {
      default: 'Sinal de contratação',
      jobs: 'Vagas abertas',
      name: 'Nome (A–Z)',
    },
    loading: 'Carregando empresas…',
  },
  jobs: {
    title: 'Vagas',
    subtitle:
      'Busque vagas remotas de Java júnior, pleno e sênior, backend ou fullstack, além de React, TypeScript, Node.js, GraphQL e React Native, Cloud & Ops, Produto e Anotação de Dados.',
    metaTitle: 'Vagas remotas de Java: júnior, pleno e sênior',
    filtersHeading: 'Filtros',
    focusLabel: 'Área de foco',
    focusAll: 'Todas as áreas',
    technology: 'Tecnologia',
    seniority: 'Senioridade',
    remote: 'Modelo de trabalho',
    country: 'País',
    anyOption: 'Qualquer',
    minimumScore: 'Pontuação mínima',
    apply: 'Aplicar filtros',
    empty: 'Nenhuma vaga ativa corresponde a estes filtros.',
    notFound: 'Esta vaga está inativa ou não foi encontrada.',
    backToJobs: 'Voltar para vagas',
    loading: 'Carregando vagas…',
    whyRelevant: 'Por que esta vaga é relevante:',
    sortLabel: 'Ordenar vagas',
    sortOptions: {
      newest: 'Mais recentes',
      relevance: 'Maior relevância',
    },
  },
  jobDetailMeta: {
    title: (title: string, company: string | null) =>
      company ? `${title} na ${company}` : title,
    description: (title: string, location: string | null) =>
      `${title}. Oportunidade remota de engenharia${location ? ` em ${location}` : ''}. Veja a vaga e o anúncio original.`,
  },
  seo: {
    homeTitle: 'Empresas com vagas remotas de Java',
    allCompaniesTitle:
      'Empresas contratando remoto em Java, React, Cloud e Produto',
    allCompaniesDescription:
      'Empresas com vagas remotas em Engenharia Java, Engenharia React, Cloud & Ops, Mobile, Produto e Anotação de Dados, ordenadas por sinal de contratação. Atualizado diariamente.',
    countryCompaniesTitle: (place: string) =>
      `Empresas com vagas remotas de Java – ${place}`,
    countryCompaniesDescription: (place: string) =>
      `Empresas com vagas remotas de Java júnior, pleno e sênior – ${place}. Atualizado diariamente.`,
    focusCompaniesTitle: (track: string) =>
      `Empresas contratando remoto em ${track}`,
    focusCompaniesDescription: (track: string) =>
      `Empresas com vagas remotas sênior em ${track}, ordenadas por sinal de contratação. Atualizado diariamente.`,
    allJobsTitle: 'Vagas remotas em Java, React, Cloud e Produto',
    allJobsDescription:
      'Vagas remotas de Engenharia Java, Engenharia React, Cloud & Ops, Mobile, Produto e Anotação de Dados em fontes públicas. Atualizado diariamente.',
    countryJobsTitle: (place: string) => `Vagas remotas de Java – ${place}`,
    countryJobsDescription: (place: string) =>
      `Vagas remotas de Java júnior, pleno e sênior, backend ou fullstack – ${place}. Atualizado diariamente.`,
    focusJobsTitle: (track: string) => `Vagas remotas de ${track}`,
    focusJobsDescription: (track: string) =>
      `Vagas remotas sênior de ${track} em fontes públicas. Atualizado diariamente.`,
  },
  focus: {
    java: 'Engenharia Java',
    engineering: 'Engenharia React',
    'cloud-ops': 'Cloud & Ops',
    mobile: 'Mobile',
    'data-annotation': 'Anotação de Dados',
    product: 'Produto',
  },
  countries: {
    brazil: 'Brasil',
    chile: 'Chile',
    argentina: 'Argentina',
    mexico: 'México',
    colombia: 'Colômbia',
    'united-states': 'Estados Unidos',
    ukraine: 'Ucrânia',
    india: 'Índia',
    egypt: 'Egito',
    pakistan: 'Paquistão',
    latam: 'América Latina',
    worldwide: 'Mundo todo',
  },
  seniority: {
    junior: 'júnior',
    mid: 'pleno',
    senior: 'sênior',
    staff: 'staff',
    principal: 'principal',
  },
  remote: { remote: 'remoto', hybrid: 'híbrido', onsite: 'presencial' },
  jobReasons: {
    Senior: 'Sênior',
    Staff: 'Staff',
    'Mid-level': 'Pleno',
    Junior: 'Júnior',
    Frontend: 'Frontend',
    Fullstack: 'Fullstack',
    Backend: 'Backend',
    Platform: 'Cloud & Ops',
    Remote: 'Remoto',
    'On-site only': 'Somente presencial',
    Brazil: 'Brasil',
    LATAM: 'América Latina',
    Americas: 'Américas',
    'Relocation required': 'Mudança de cidade ou país obrigatória',
    Contractor: 'Contratação como contractor ou PJ',
    'Work authorization required': 'Exige autorização de trabalho nos EUA',
    'Unrelated stack': 'Tecnologias fora do foco',
    'Unrelated role': 'Cargo fora do foco',
  },
  jobCard: {
    hideAction: 'Ocultar vaga',
    hideConfirmation:
      'Ocultar esta vaga? Você não a verá novamente neste navegador.',
    viewOriginal: 'Ver vaga original',
    postedLabel: 'Publicada',
    unknownCompany: 'Empresa desconhecida',
  },
  companyCard: {
    hiringSignalLabel: 'Sinal de contratação',
    signalsLabel: 'Sinais:',
    viewCompany: 'Ver empresa',
    openRolesSuffix: 'vagas de engenharia abertas no momento',
    summaries: {
      'Strong hiring signal': 'Forte sinal de contratação',
      'Company is actively expanding engineering hiring.':
        'A empresa está ampliando as contratações de engenharia.',
    },
    kindLabels: {
      product: 'Produto',
      consultancy: 'Consultoria',
      staffing: 'Recrutamento',
    },
  },
  report: {
    emptyCompanies: 'Ainda não há empresas para acompanhar.',
    error: 'Não foi possível carregar o relatório do banco de dados.',
    unknownTime: 'Desconhecida',
    updated: (value: string) => `Atualizado: ${value}`,
  },
  globalError: {
    title: 'Algo deu errado',
    description:
      'Não foi possível exibir a página. Tentar novamente pode resolver.',
    retry: 'Tentar novamente',
  },
  about: {
    title: 'Sobre o radar',
    introduction:
      'Um panorama diário de oportunidades remotas de engenharia, com links para as fontes originais.',
    sourcesTitle: 'Fontes',
    sourcesIntro:
      'Coletamos apenas listagens públicas. Cada fonte é lida como JSON ou payload público embutido — nenhuma candidatura é enviada em seu nome.',
    sources: [
      {
        name: 'Greenhouse',
        description:
          'Boards públicos de empresas no radar, via API do Greenhouse.',
      },
      {
        name: 'Ashby',
        description: 'Boards públicos de empresas no radar, via API do Ashby.',
      },
      {
        name: 'Lever',
        description: 'Boards públicos de empresas no radar, via API do Lever.',
      },
      {
        name: 'GetOnBrd',
        description: 'API pública da categoria programming (foco LATAM).',
      },
      {
        name: 'Hacker News',
        description:
          'Busca Algolia nos comentários do thread mais recente de “Who is hiring?”.',
      },
      {
        name: 'Himalayas',
        description:
          'API pública de vagas remotas (páginas recentes limitadas).',
      },
      {
        name: 'Jobicy',
        description:
          'Feed público de engenharia remota (com limite de quantidade).',
      },
      {
        name: 'frontendbr',
        description:
          'Issues abertas do repositório frontendbr/vagas no GitHub.',
      },
      {
        name: 'quave',
        description: 'Issues abertas do repositório quavedev/join no GitHub.',
      },
      {
        name: 'Y Combinator',
        description:
          'Páginas públicas do Work at a Startup com vagas remotas de software engineering.',
      },
    ],
    freshnessTitle: 'Atualização e escopo',
    freshness:
      'A coleta é executada uma vez por dia pelo GitHub Actions. As vagas podem estar até 24 horas desatualizadas.',
    scope:
      'São exibidas apenas vagas remotas publicadas nos últimos 30 dias, em todas as áreas de foco.',
    scoringTitle: 'Sinais, não recomendações',
    scoring:
      'As pontuações são heurísticas sobre texto público — não uma recomendação de empresa ou vaga.',
    scoringJob:
      'O radar acompanha seis áreas de foco e abre em Engenharia Java. Engenharia Java tem pontuação própria: favorece Java, Spring, Kotlin, Hibernate/JPA, Quarkus e Micronaut, pontua júnior, pleno e sênior por igual, backend ou fullstack, favorece contratação como contractor ou PJ e penaliza vagas que exigem autorização de trabalho nos EUA (somente W2, somente cidadãos americanos). Engenharia React favorece React, TypeScript, Node.js, GraphQL e React Native; Cloud & Ops favorece AWS, Kubernetes, Terraform, Docker, Azure e GCP. Mobile reúne vagas de iOS e Android, Anotação de Dados reúne vagas de treinamento de IA, rotulagem de dados e RLHF, e Produto reúne vagas de product manager e product owner. Fora de Java, títulos senior/staff são favorecidos e vagas júnior são fortemente penalizadas. Todas as áreas favorecem remoto e geografia Brasil/LATAM/Américas, e penalizam vagas apenas presenciais, com relocação obrigatória ou com stacks sem relação.',
    scoringCompany:
      'A nota da empresa agrega vagas de engenharia ativas, rajadas recentes de publicações, matches de tech relevante e papéis de liderança — sempre a partir de listagens públicas.',
    applications:
      'O radar não recebe candidaturas. Acesse os links originais das vagas para conferir os detalhes e se candidatar diretamente na fonte.',
    contactTitle: 'Contato',
    contact:
      'Dúvidas, correções ou sugestões de fontes — e-mail é o melhor canal. O site pessoal traz mais contexto sobre outros trabalhos.',
    contactEmailLabel: 'E-mail',
    contactSiteLabel: 'Site pessoal',
    repositoryTitle: 'Código aberto',
    repository: 'Explore o código e o funcionamento do radar no GitHub.',
  },
};

export const isLocale = (value: unknown): value is Locale =>
  LOCALES.some((locale) => locale === value);

export const messagesFor = (locale: Locale = DEFAULT_LOCALE) =>
  locale === 'pt-BR' ? PT_BR_MESSAGES : EN_MESSAGES;
