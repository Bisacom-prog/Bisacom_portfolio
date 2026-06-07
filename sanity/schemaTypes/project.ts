export const project = {
  name: 'project',
  title: 'Projects',
  type: 'document',
  groups: [
    { name: 'overview', title: 'Overview', default: true },
    { name: 'strategy', title: 'Strategy' },
    { name: 'research', title: 'Research' },
    { name: 'process', title: 'Process' },
    { name: 'solution', title: 'Solution' },
    { name: 'impact', title: 'Impact' },
    { name: 'links', title: 'Links' },
  ],
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      group: 'overview',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'overview',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'overview',
      description: 'Example: Product Design / Automotive Technology',
    },
    {
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      group: 'overview',
      options: {
        list: [
          { title: 'Product Design Case Study', value: 'Product Design Case Study' },
          { title: 'UX/UI Design', value: 'UX/UI Design' },
          { title: 'Web Design', value: 'Web Design' },
          { title: 'Front-End Build', value: 'Front-End Build' },
          { title: 'Brand / Visual Design', value: 'Brand / Visual Design' },
        ],
      },
    },
    {
      name: 'summary',
      title: 'Short Summary',
      type: 'text',
      group: 'overview',
      rows: 4,
      validation: (Rule: any) => Rule.required().max(500),
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'overview',
      options: { hotspot: true },
    },
    {
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      group: 'overview',
      initialValue: false,
    },

    {
      name: 'role',
      title: 'My Role',
      type: 'string',
      group: 'strategy',
      description: 'Example: Product Designer — UX/UI, User Flow, Visual Design, Design System',
    },
    {
      name: 'timeline',
      title: 'Timeline',
      type: 'string',
      group: 'strategy',
      description: 'Example: 4–6 weeks',
    },
    {
      name: 'tools',
      title: 'Tools',
      type: 'array',
      group: 'strategy',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
      group: 'strategy',
      description: 'Example: Mobile App — iOS',
    },
    {
      name: 'problem',
      title: 'Problem',
      type: 'text',
      rows: 6,
      group: 'strategy',
    },
    {
      name: 'goal',
      title: 'Goal',
      type: 'text',
      rows: 6,
      group: 'strategy',
    },
    {
      name: 'designChallenge',
      title: 'Design Challenge / HMW Statement',
      type: 'text',
      rows: 4,
      group: 'strategy',
      description: 'Example: How might we help drivers find trusted mechanics quickly during stressful breakdowns?',
    },
    {
      name: 'targetUsers',
      title: 'Target Users',
      type: 'array',
      group: 'strategy',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },

    {
      name: 'researchMethods',
      title: 'Research Methods',
      type: 'array',
      group: 'research',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Example: Competitor analysis, user journey mapping, heuristic review',
    },
    {
      name: 'researchInsights',
      title: 'Research Insights',
      type: 'array',
      group: 'research',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Insight Title', type: 'string' },
            { name: 'description', title: 'Insight Description', type: 'text', rows: 3 },
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        },
      ],
    },
    {
      name: 'personasImage',
      title: 'Personas Image',
      type: 'image',
      group: 'research',
      options: { hotspot: true },
    },
    {
      name: 'journeyMapImage',
      title: 'Journey Map Image',
      type: 'image',
      group: 'research',
      options: { hotspot: true },
    },

    {
      name: 'userFlowImage',
      title: 'User Flow Image',
      type: 'image',
      group: 'process',
      options: { hotspot: true },
    },
    {
      name: 'wireframeImages',
      title: 'Wireframe Images',
      type: 'array',
      group: 'process',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },
    {
      name: 'designSystemImage',
      title: 'Design System Image',
      type: 'image',
      group: 'process',
      options: { hotspot: true },
    },

    {
      name: 'solutionOverview',
      title: 'Solution Overview',
      type: 'text',
      rows: 6,
      group: 'solution',
    },
    {
      name: 'keyFeatures',
      title: 'Key Features',
      type: 'array',
      group: 'solution',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Feature Title', type: 'string' },
            { name: 'description', title: 'Feature Description', type: 'text', rows: 3 },
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        },
      ],
    },
    {
      name: 'finalScreens',
      title: 'Final UI Screens',
      type: 'array',
      group: 'solution',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Screen Title', type: 'string' },
            { name: 'description', title: 'Screen Description', type: 'text', rows: 3 },
            {
              name: 'image',
              title: 'Screen Image',
              type: 'image',
              options: { hotspot: true },
            },
          ],
          preview: {
            select: { title: 'title', media: 'image' },
          },
        },
      ],
    },

    {
      name: 'outcome',
      title: 'Outcome',
      type: 'text',
      rows: 6,
      group: 'impact',
    },
    {
      name: 'impactMetrics',
      title: 'Impact Metrics / Intended Impact',
      type: 'array',
      group: 'impact',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'metric', title: 'Metric', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
          ],
          preview: {
            select: { title: 'metric', subtitle: 'label' },
          },
        },
      ],
    },
    {
      name: 'learnings',
      title: 'Key Learnings',
      type: 'text',
      rows: 6,
      group: 'impact',
    },
    {
      name: 'nextSteps',
      title: 'Next Steps',
      type: 'array',
      group: 'impact',
      of: [{ type: 'string' }],
    },

    {
      name: 'sections',
      title: 'Flexible Case Study Sections',
      type: 'array',
      group: 'solution',
      description: 'Optional legacy/flexible sections for extra content.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', title: 'Section Number', type: 'number' },
            { name: 'title', title: 'Section Title', type: 'string' },
            { name: 'description', title: 'Section Description', type: 'text' },
            {
              name: 'image',
              title: 'Section Image',
              type: 'image',
              options: { hotspot: true },
            },
          ],
          preview: {
            select: { title: 'title', media: 'image' },
          },
        },
      ],
    },

    { name: 'liveUrl', title: 'Live URL', type: 'url', group: 'links' },
    { name: 'figmaUrl', title: 'Figma URL', type: 'url', group: 'links' },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'heroImage',
    },
  },
}
