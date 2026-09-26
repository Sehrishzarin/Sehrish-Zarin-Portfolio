export const experiencesByYear = [
  {
    year: '2026',
    entries: [
      {
        id: 'freelance-dev',
        date: 'Jun 2024 – Present',
        title: 'Freelance Software Engineer',
        company: 'Self-employed',
        context:
          'Independent full-stack and product work for early-stage clients.',
        isConcurrent: true,
        isOngoing: true,
        startYear: 2024,
        startMonth: 6,
        endYear: new Date().getFullYear(),
        endMonth: new Date().getMonth() + 1
      },
      {
        id: 'ncgsa-intern',
        date: 'Jul – Aug 2026',
        title: 'Software Solutions Intern',
        company: 'National Center of GIS & Space Applications',
        context:
          'Independently owned and delivered two end-to-end full-stack projects (Planetarium booking + Event Management System).',
        isConcurrent: true,
        startYear: 2026,
        startMonth: 7,
        endYear: 2026,
        endMonth: 8
      },
      {
        id: 'brainwave-fellow',
        date: 'Jul – Aug 2026',
        title: 'AI/ML Engineering Fellow',
        company: 'Brain Wave',
        context: 'Part-time fellowship in applied machine learning.',
        isConcurrent: true,
        startYear: 2026,
        startMonth: 7,
        endYear: 2026,
        endMonth: 8
      }
    ]
  },
  {
    year: '2025',
    entries: [
      {
        id: 'neutrawise-dev',
        date: 'Aug – Oct 2025',
        title: 'Web Developer',
        company: 'Neutrawise',
        context:
          'Contributed to a sustainability platform helping individuals and organizations track and reduce their carbon footprint.',
        startYear: 2025,
        startMonth: 8,
        endYear: 2025,
        endMonth: 10
      },
      {
        id: 'fluxxion-fellow',
        date: 'Jun – Aug 2025',
        title: 'MERN Stack Fellow',
        company: 'Fluxxion',
        context:
          'Hands-on MERN stack development building real projects with React, Next.js, and Node.js.',
        startYear: 2025,
        startMonth: 6,
        endYear: 2025,
        endMonth: 8
      },
      {
        id: 'navttc-training',
        date: 'Mar – Jun 2025',
        title: 'MERN Stack Development',
        company: 'National Vocational and Technical Training Commission (NAVTTC)',
        context:
          "Structured MERN stack training under the Prime Minister's Skills Development Program.",
        startYear: 2025,
        startMonth: 3,
        endYear: 2025,
        endMonth: 6
      }
    ]
  },
  {
    year: '2024',
    entries: [
      {
        id: 'gssoc-contributor',
        date: 'Oct – Nov 2024',
        title: 'Open Source Developer',
        company: 'GirlScript Summer of Code',
        context:
          'Contributed to open-source projects, submitting pull requests and resolving issues under mentor guidance.',
        startYear: 2024,
        startMonth: 10,
        endYear: 2024,
        endMonth: 11
      }
    ]
  }
]

export const flatExperiences = experiencesByYear.flatMap((group) => group.entries)
