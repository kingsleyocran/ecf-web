export type NavLink = {
  title: string;
  href: string;
  subPages?: Array<{ title: string; href: string }>;
};

export const navLinks: NavLink[] = [
  {
    title: "Who We Are",
    href: "/about",
  },
  {
    title: "Technologies",
    href: "/technologies",
  },
  {
    title: "Our Programs", 
    href: "/programs",
  },
  {
    title: "Resources", 
    href: "/resources",
  },
  // {
  //   title: "Apply",
  //   href: "/apply",
  //   subPages: [
  //     {
  //       title: "African Climate Innovation Challenge",
  //       href: "/acic",
  //     },
  //     {
  //       title: "Solidarity Fund",
  //       href: "/sf",
  //     },
  //     {
  //       title: "Climate Research Fund for African Students",
  //       href: "/crf",
  //     },
  //   ],
  // },
  // {
  //   title: "What’s new",
  //   href: "/blogs",
  // },
];

export const contactDetails = {
  email: "jambo@aycf.org",
};

export const navCTAButton = {
  title: "Donate",
  href: "/donate",
};

export const termPrivacyList = [
  { title: "Terms", href: "/terms" },
  { title: "Privacy", href: "/privacy" },
];

export const socialLinks = {
  // facebook: "https://www.facebook.com/AYCFund",
  instagram: "https://www.instagram.com/ecfrontiers/",
  twitter: "https://twitter.com/ecfrontiers",
  linkedin: "https://www.linkedin.com/company/emerging-climate-frontiers",
};

export const homeContent = {
  // Hero Banner
  heroBanner: {
    title: (
      <>
        Catalyzing Youth-Led Climate and Environmental Solutions Across Africa
      </>
    ),
    subTitle: (
      <>
        We are committed to catalyzing and building thriving, climate-resilient
        communities by providing support through funding, strengthening
        capacity, and collective care.
      </>
    ),
    buttonTitle: "Learn More",
    buttonLink: "/about",
    imgSrc: "/assets/images/aycf-banner-design.png",
  },

  // WHO WE ARE
  whoWeAre: {
    section: "WHO WE ARE",
    title: (
      <>
         The Africa Youth Climate Fund (AYCF) is a youth-for-youth fund that
        supports underfunded, youth-led climate and environmental solutions
        driving impactful change across Africa.
      </>
    ),
    buttonTitle: "Learn More",
    buttonLink: "/about",
    imgSrc: "/assets/images/AYCF Banner.png",
  },

  // Impact Stories
  impactStories: {
    section: <>Impact Stories</>,
    title: (
      <>
         Through proven models of strengthening grassroots youth climate
        organizations and activists, such as the Africa Climate Innovation
        Challenge, we have supported over 25 youth-led climate and environmental
        solutions across the continent.
      </>
    ),
    data: {
      totalProjects: "25+",
      text: <>youth-led climate and environmental solutions</>,
    },
    buttonTitle: "Read Our Impact Stories",
    buttonLink: "/about",
    imgSrc: "/assets/images/AYCF Banner.png",
  },

  // Our Priority Areas
  priorityArea: {
    section: <>Our Priority Areas</>,
    title: (
      <>
        At AYCF, we focus on funding solutions that address the climate crisis
        through three thematic areas:
      </>
    ),

    buttonTitle: "Learn More",
    buttonLink: "/apply",
  },

  // WHAT’s NEW
  whatsNew: {
    section: "WHAT’s NEW",
    title: "Latest News and Events",
    buttonTitle: "See more",
    buttonLink: "/blogs",
  },

  // Apply for Funding
  fundingCTACard: {
    imgSrc: "/assets/images/apply-for-funding.png",
    title: "Get Funding for Your Community-Centered Solution!",
    content: (
      <>
        At AYCF, we are actively working alongside and for young Africans,
        equipping them with the support they need to implement and scale climate
        innovations, mobilize and convene for climate action, and conduct
        cutting-edge research to drive climate resilience and a sustainable
        future across the continent.
      </>
    ),
    buttonTitle: "Learn How to Apply",
    buttonLink: "/apply",
  },

  // Get Involved
  getInvolveCTACard: {
    imgSrc: "/assets/images/get-invloved.png",
    title: "Get Involved",
    content: (
      <>
        Join us in supporting young leaders in Africa who are at the forefront
        of climate action. By donating to AYCF, you help young leaders address
        climate change in their communities, scale innovative solutions, and
        drive sustainable impact across Africa.
      </>
    ),
    buttonTitle: "Donate",
    buttonLink: "/donate",
  },
};

export const thematicAreasOfFunding = {
  title: <>Our Thematic Areas of Funding</>,

  contentList: [
    {
      title: "African Climate Innovation Challenge",
      content: (
        <>
          We support startups that introduce innovative approaches,
          technologies, and solutions to address climate challenges faced by
          frontline communities, with a focus on creating sustainable and
          dignified green jobs.
        </>
      ),
      buttonTitle: "Apply for funding",
      buttonLink: "/apply/acic",
      imgSrc: "/assets/images/priority-areas-1.png",
    },

    {
      title: "The Solidarity Fund",
      content: (
        <>
          We provide funding support that enables youth climate organizers to
          mobilize, convene, and strategize.
        </>
      ),
      buttonTitle: "Apply for funding",
      buttonLink: "/apply/sf",
      imgSrc: "/assets/images/priority-areas-2.png",
    },

    {
      title: "Climate Research Fund",
      content: (
        <>
          We support Africa’s youth in leading cutting-edge research that
          delivers findings on the ever-changing needs of communities bearing
          the brunt of climate change.
        </>
      ),
      buttonTitle: "Apply for funding",
      buttonLink: "/apply/crf",
      imgSrc: "/assets/images/priority-areas-3.png",
    },
  ],
};

export const aboutContent = {
  title: (
    <>
      The Africa Youth Climate Fund (AYCF) is a youth-for-youth fund that
      supports underfunded, youth-led climate and environmental solutions
      driving impactful change across Africa.
    </>
  ),
  subTitle: (
    <>
      Through direct collaboration with local communities and a participatory
      approach to grantmaking, we ensure that decision-making is driven by the
      youth whose communities are most affected by climate change.
    </>
  ),

  // Mission
  mission: {
    title: "Our North Star",
    content: (
      <>
        Our goal is to shift resources, autonomy, and power to youth climate
        movements in Africa, enabling them to scale solutions that are
        grassroots-based, youth-led, effective, and result-oriented. We
        don&apos;t just provide funding to under-resourced groups; we work
        alongside our community, supporting them in project implementation and
        organizational development.
      </>
    ),
  },

  // Vision
  vision: {
    title: "Our Vision",
    content: (
      <>
        We envision a thriving, climate-resilient Africa where youth-led
        movements are at the forefront, empowered with the resources and
        autonomy to implement innovative, community-driven solutions to combat
        the climate crisis.
      </>
    ),
  },

  // Values
  values: {
    title: "Our VALUES",
    subTitle: "What we believe in",
    listContent: [
      // Trust
      {
        title: "Trust",
        content: (
          <>
            We believe in the knowledge and capability of local youth and
            communities to lead sustainable change. We trust in the communities
            and young individuals we collaborate with, recognizing their unique
            insights and expertise. We empower them to drive sustainable change
            within their contexts.
          </>
        ),
      },

      // Intersectionality
      {
        title: "Intersectionality",
        content: (
          <>
            We recognize the unique needs of our grantees and provide all of our
            grant-making through a participatory and trust-based process. Our
            participatory grantmaking process prioritizes those who have
            historically borne the brunt of multiple forms of oppression. We
            acknowledge the interconnectedness of their struggles and the
            impacts of climate change, addressing these issues through a
            holistic lens.
          </>
        ),
      },

      // Locally-Led
      {
        title: "Locally-Led",
        content: (
          <>
            Our grants focus on projects that engage and benefit local
            communities, fostering a sense of ownership and long-term
            sustainability. We prioritize initiatives that actively involve
            community members in the decision-making process, acknowledging
            their unique needs, knowledge, and perspectives in both design and
            implementation.
          </>
        ),
      },

      // Transparency and Accountability
      {
        title: "Transparency and Accountability",
        content: (
          <>
            We are accountable to ourselves, the communities we serve, partners,
            and other stakeholders. We also aim to build a generation of African
            leaders rooted in practicing transparency and accountability to
            themselves and their communities.
          </>
        ),
      },

      // Equity and Accessibility
      {
        title: "Equity and Accessibility",
        content: (
          <>
            We are committed to addressing systemic inequalities by promoting
            fairness and justice and ensuring that resources are distributed
            equitably among communities and groups. We work to eliminate
            barriers to accessing funds for local groups by making our grant
            application process straightforward. Our approach emphasizes active
            participation and inclusive collaboration.
          </>
        ),
      },

      // Solidarity and Collective Care
      {
        title: "Solidarity and Collective Care",
        content: (
          <>
            We foster a spirit of solidarity and collective care, recognizing
            that collaboration and mutual support are essential in addressing
            the complex challenges posed by climate change. This includes
            safeguarding measures and comprehensive assistance beyond financial
            aid.
          </>
        ),
      },

      // Continuous Learning and Adaptability
      {
        title: "Continuous Learning and Adaptability",
        content: (
          <>
            We acknowledge the dynamic nature of environmental issues and
            encourage a culture of continuous learning. We pay close attention
            and listen carefully to the communities and individuals we support
            and collaborate with. We are committed to being adaptable and
            responsive to the changing needs of our communities.{" "}
          </>
        ),
      },
    ],
  },
};

export const impactStoriesContent = {
  heroBanner: {
    title: "Impact Stories",
    subTitle: (
      <>
        We are building the next generation of youth climate leaders in Africa
        through targeted funding, personalized capacity-strengthening programs,
        and strategic partnerships. These young leaders are at the forefront of
        climate action, driving solutions by helping their communities adapt,
        build resilience, and thrive. Our support enables youth innovators to
        mobilize communities to push for ambitious climate policies while
        working with policymakers to help them fulfill their promises and
        pledges.
      </>
    ),
    imgSrc: "/assets/images/impact-stories.png",
  },
  statsHeader: (
    <>
      Over $500,000 has been allocated to support young climate leaders and
      youth-led climate solutions  in countries including:
    </>
  ),
  statsList: [
    { text: "Initiatives supported", value: "35" },
    { text: "Allocated to grantee partners", value: "$500,000+" },
    { text: "Countries reached", value: "10" },
  ],
  storiesTitle: "Read Our Stories",
};

export const applyContent = {
  heroBanner: {
    title: "Apply for Funding",
    subTitle: (
      <>
        Are you a young changemaker with a vision for a climate-resilient
        Africa? AYCF provides funding and capacity-building support to youth-led
        initiatives across the continent, empowering innovative solutions to the
        climate crisis. Our grant programs focus on local impact and encourage
        creative approaches to tackling the environmental and climate crisis
        challenges.
      </>
    ),
    buttonTitle: "Apply Now!",
    buttonLink: "/about",
    imgSrc: "/assets/images/apply-hero.png",
  },

  // WHO WE FUND
  whoWeFund: {
    title: "Who We Fund",
    subTitle: (
      <>
        We offer funding to youth-led groups that often face barriers to
        accessing financial resources, enabling them to bring their climate
        solutions to life. Are you a young changemaker with a vision for a
        climate-resilient Africa? AYCF provides funding and capacity-building
        support to youth-led initiatives across the continent, empowering
        innovative solutions to the climate crisis. Our grant programs
        prioritize local impact and encourage inventive approaches to tackling
        environmental challenges. Youth-led teams with members primarily aged
        18-35.
      </>
    ),
  },
};

export const whoReviewApplication = {
  title: "Who Reviews Your Application?",
  subTitle: (
    <>
      Your application undergoes a three-step review process to ensure alignment
      with AYCF’s mission, principles, and values:
    </>
  ),
  contentList: [
    {
      title: "Initial Review by the AYCF Team",
      content: (
        <>
          AYCF will conduct a preliminary assessment to confirm your application
          meets the eligibility criteria and aligns with the fund’s objectives.
        </>
      ),
    },
    {
      title: "Evaluation by the Jury",
      content: (
        <>
          An independent jury composed of experts in climate research,
          education, and development will serve as the decision-makers for the
          application process. They will assess proposals based on their
          relevance, innovation, and potential impact and will determine the
          finalists.
        </>
      ),
    },
    {
      title: "Final Review by AYCF team",
      content: (
        <>
          After the Advisory Circle ranks the applications, AYCF staff handle
          the final steps. They:
          <br />
          <br />
          <ul>
            <li>
              Notify successful applicants and provide details on next steps.
            </li>
            <li>
              Facilitate the due diligence and  disbursement of funds and
              support grantees with onboarding.
            </li>
          </ul>
        </>
      ),
    },
  ],
};

export const faqFundsContentList = [
  // Application
  {
    title: "Application",
    faqlist: [
      {
        title: "What types of projects are eligible for funding?",
        content:
          "We fund a wide range of projects that address climate change and environmental issues, including but not limited to renewable energy, sustainable agriculture, waste management, water conservation, and climate education.",
      },
      {
        title: "Who can apply for funding?",
        content:
          "AYCF supports youth-led groups and organizations, with a focus on those led by individuals aged 18-35. We prioritize initiatives that are grassroots-based, community-centered, and innovative in addressing climate challenges.",
      },
      {
        title: "What types of projects are eligible for funding?",
        content:
          "We fund a wide range of projects that address climate change and environmental issues, including but not limited to renewable energy, sustainable agriculture, waste management, water conservation, and climate education.",
      },
      {
        title: "How do I apply for funding?",
        content:
          "To apply for funding, please visit our application page and follow the instructions provided. Ensure that you meet the eligibility criteria and submit all required documents.",
      },
    ],
  },

  // Eligibility Criteria
  {
    title: "Eligibility Criteria",
    faqlist: [
      {
        title: "Who can apply for funding?",
        content:
          "AYCF supports youth-led groups and organizations, with a focus on those led by individuals aged 18-35. We prioritize initiatives that are grassroots-based, community-centered, and innovative in addressing climate challenges.",
      },
      {
        title: "What types of projects are eligible for funding?",
        content:
          "We fund a wide range of projects that address climate change and environmental issues, including but not limited to renewable energy, sustainable agriculture, waste management, water conservation, and climate education.",
      },
      {
        title: "How do I apply for funding?",
        content:
          "To apply for funding, please visit our application page and follow the instructions provided. Ensure that you meet the eligibility criteria and submit all required documents.",
      },
    ],
  },

  //  Financial Information
  {
    title: "Financial Information",
    faqlist: [
      {
        title: "Who can apply for funding?",
        content:
          "AYCF supports youth-led groups and organizations, with a focus on those led by individuals aged 18-35. We prioritize initiatives that are grassroots-based, community-centered, and innovative in addressing climate challenges.",
      },
      {
        title: "What types of projects are eligible for funding?",
        content:
          "We fund a wide range of projects that address climate change and environmental issues, including but not limited to renewable energy, sustainable agriculture, waste management, water conservation, and climate education.",
      },
      {
        title: "How do I apply for funding?",
        content:
          "To apply for funding, please visit our application page and follow the instructions provided. Ensure that you meet the eligibility criteria and submit all required documents.",
      },
    ],
  },

  // Project-Specific
  {
    title: "Project-Specific",
    faqlist: [
      {
        title: "Who can apply for funding?",
        content:
          "AYCF supports youth-led groups and organizations, with a focus on those led by individuals aged 18-35. We prioritize initiatives that are grassroots-based, community-centered, and innovative in addressing climate challenges.",
      },
      {
        title: "What types of projects are eligible for funding?",
        content:
          "We fund a wide range of projects that address climate change and environmental issues, including but not limited to renewable energy, sustainable agriculture, waste management, water conservation, and climate education.",
      },
      {
        title: "How do I apply for funding?",
        content:
          "To apply for funding, please visit our application page and follow the instructions provided. Ensure that you meet the eligibility criteria and submit all required documents.",
      },
    ],
  },

  // General
  {
    title: "General",
    faqlist: [
      {
        title: "Who can apply for funding?",
        content:
          "AYCF supports youth-led groups and organizations, with a focus on those led by individuals aged 18-35. We prioritize initiatives that are grassroots-based, community-centered, and innovative in addressing climate challenges.",
      },
      {
        title: "What types of projects are eligible for funding?",
        content:
          "We fund a wide range of projects that address climate change and environmental issues, including but not limited to renewable energy, sustainable agriculture, waste management, water conservation, and climate education.",
      },
      {
        title: "How do I apply for funding?",
        content:
          "To apply for funding, please visit our application page and follow the instructions provided. Ensure that you meet the eligibility criteria and submit all required documents.",
      },
    ],
  },
];

export const applyForACICContent = {
  heroBanner: {
    title: "The African Climate Innovation Challenge",
    subTitle: (
      <>
        The African Climate Innovation Challenge (ACIC) is a competition
        designed to support and empower young African start-ups focused on
        developing innovative solutions to address climate change mitigation and
        adaptation. The ACIC provides a platform for these youth-led start-ups
        to scale up their impactful solutions that address the most pressing
        climate challenges faced by local communities across the continent.
        <br />
        <br />
        Youth innovation and entrepreneurship are essential to building
        climate-resilient, thriving communities in Africa. Through the ACIC, we
        support youth - led start-ups that are driving change with innovative,
        SMART, and community-centred approaches to tackle climate-related
        challenges. We prioritize initiatives that offer fresh, creative
        solutions to the challenges posed by climate change on the frontline
        communities. The ACIC is committed to fostering local entrepreneurship
        that introduces novel ideas, technologies, and methods in sectors such
        as renewable energy, climate-smart agriculture, water management, waste
        management, and more.
      </>
    ),
    buttonTitle: "Apply Now!",
    buttonLink: "/about",
    imgSrc: "/assets/images/acic.png",
  },
  priorityAreas: {
    title: "Our Priority Areas",
    subTitle:
      "The ACIC is committed to advancing climate action through the following priority areas:",
    contentList: [
      {
        title: "Climate Change Mitigation & Adaptation",
        content: (
          <>
            Supporting initiatives that help African communities both reduce
            their carbon footprint and adapt to the increasingly unpredictable
            climate patterns that threaten food security, health, and
            livelihoods.
          </>
        ),
      },
      {
        title: "Youth-Led Innovation & Entrepreneurship",
        content: (
          <>
            Empowering young entrepreneurs and innovators with the resources,
            skills, and knowledge needed to develop scalable, sustainable
            solutions that address the root causes and impacts of climate
            change.
          </>
        ),
      },
      {
        title: "Community Resilience & Sustainability",
        content: (
          <>
            Promoting solutions that enhance both the environmental and
            socio-economic resilience of local communities, ensuring that they
            are better prepared to withstand and recover from climate impacts.
          </>
        ),
      },
      {
        title: "Integration of Traditional & Modern Knowledge",
        content: (
          <>
            Elevating the integration of indigenous knowledge and modern
            scientific practices, fostering solutions that are locally relevant,
            culturally sensitive, and sustainable in the long term.
          </>
        ),
      },
      {
        title: "Green Economy & Job Creation",
        content: (
          <>
            Supporting the development of a green economy by funding
            youth-driven ventures that create green jobs, reduce environmental
            degradation, and promote sustainable development.
          </>
        ),
      },
      {
        title: "Climate Justice & Equity",
        content: (
          <>
            Prioritizing initiatives that center marginalized and vulnerable
            groups, ensuring that youth-led solutions are inclusive and
            equitable, and contribute to broader climate justice goals.
          </>
        ),
      },
    ],
  },
  ourWhy: {
    title: "Our Why",
    contentList: [
      {
        title: "Empower African Youth",
        content: (
          <>
            By equipping young people with the skills, tools, and opportunities
            to lead climate solutions, we enable them to take ownership of their
            communities&apos; futures and build a resilient, climate-smart
            Africa.
          </>
        ),
      },
      {
        title: "Support Local Solutions with Global Impact",
        content: (
          <>
            The ACIC is dedicated to fostering homegrown solutions that have the
            potential to generate global impact. We invest in ideas that not
            only address local challenges but also contribute to the global
            effort to reduce emissions, protect ecosystems, and safeguard
            vulnerable communities.
          </>
        ),
      },
      {
        title: "Promote Climate Resilience and Justice",
        content: (
          <>
            We are committed to supporting projects that prioritize the most
            affected populations—those on the frontlines of climate change. By
            elevating the voices and perspectives of marginalized groups, we aim
            to achieve both environmental and social justice through equitable
            solutions.
          </>
        ),
      },
      {
        title: "Foster Collaboration and Knowledge Sharing",
        content: (
          <>
            The ACIC seeks to create an ecosystem of innovation by bringing
            together traditional practices, modern technologies, and diverse
            stakeholders—youth movements, philanthropists, policymakers, and the
            private sector. This collaborative effort ensures the scaling of
            sustainable solutions that will leave a lasting legacy for
            generations to come.
          </>
        ),
      },
      {
        title: "Create a Sustainable Green Economy",
        content: (
          <>
            By promoting youth entrepreneurship, the ACIC nurtures a green
            economy that not only drives climate action but also helps reduce
            poverty and unemployment and strengthens local economies.
          </>
        ),
      },
    ],
  },
  applicationProcess: {
    title: "The Application Process",
    subTitle: (
      <>
        The African Climate Innovation Challenge (ACIC) is implemented through a
        structured four-stage process designed to support youth-led climate
        innovations from inception to implementation:
      </>
    ),
    processList: [
      {
        title: "Call for Applications",
        content: (
          <>
            The ACIC process begins with an open call lasting four to five
            weeks, inviting young African innovators, entrepreneurs, and
            startups to apply. This stage ensures that a wide and diverse group
            of applicants from across Africa has the opportunity to participate,
            focusing on those with innovative solutions to address climate
            change challenges. It’s an inclusive process aimed at attracting
            local, impactful projects that prioritize climate resilience and
            adaptation.
          </>
        ),
      },
      {
        title: "Selection of Cohort and Curriculum Training",
        content: (
          <>
            Once the application period closes, the ACIC team reviews and
            screens all submissions to select the participants for the cohort.
            The selected applicants are invited to a curriculum training that
            spans four to eight weeks. During this training, they are equipped
            with the necessary knowledge and skills to enhance their projects.
            The training covers key areas such as:
            <br />
            <br />
            <ul className="!list-disc pl-5">
              <li>Climate change science and solutions</li>
              <li>Sustainable entrepreneurship</li>
              <li>Fundraising and financial management</li>
              <li>Team building and leadership</li>
              <li>Scaling innovative climate solutions</li>
            </ul>
          </>
        ),
      },
      {
        title: "ACIC Pitch Event and Selection of Finalists",
        content: (
          <>
            Following the training phase, the most promising cohort participants
            are selected to pitch their climate solutions at the ACIC Pitch
            Event. This event provides finalists with a platform to showcase
            their innovative ideas, share their project impact, and demonstrate
            their potential for addressing climate challenges. A panel of
            esteemed judges, including industry leaders, funders, and experts,
            evaluates the projects based on their creativity, scalability, and
            sustainability. The finalists are chosen based on their ability to
            drive positive, impactful change in their communities.
          </>
        ),
      },
      {
        title: "Winners’ Startup Scale-Up",
        content: (
          <>
            The winners selected from the ACIC Pitch Event receive funding and
            tailored support to scale their projects. This funding helps them
            implement and expand their climate solutions, ensuring they can
            create lasting impact. In addition to financial support, winners are
            provided with:
            <br />
            <br />
            <ul>
              <li>Ongoing mentorship from experienced professionals</li>
              <li>
                Networking opportunities with potential partners, funders, and
                stakeholders
              </li>
              <li>
                Access to platforms that connect them with global climate change
                solutions
              </li>
            </ul>
          </>
        ),
      },
    ],
  },
};

export const applyForSFContent = {
  heroBanner: {
    title: "The Solidarity Fund",
    subTitle: (
      <>
        The Solidarity Fund is a catalytic initiative of the Africa Youth
        Climate Fund (AYCF) created to bridge funding gaps for youth-led climate
        movements. By offering flexible and accessible financial support, the
        fund empowers young climate leaders and grassroots organizations to
        mobilize, convene, and advocate for systemic change. Grounded in
        principles of climate justice and equity, the fund amplifies the voices
        of frontline communities and strengthens efforts in movement-building.
        The Solidarity Fund nurtures a resilient and impactful climate movement
        through strategic philanthropy and sustained investment in youth
        leadership, driving bold action and policy shifts across Africa.
      </>
    ),
    buttonTitle: "Apply Now!",
    buttonLink: "/about",
    imgSrc: "/assets/images/sf.png",
  },
  priorityAreas: {
    title: "Our Priority Areas",
    subTitle:
      "The Solidarity Fund is committed to advancing climate action through the following priority areas:",
    contentList: [
      {
        title: "Sustainable Livelihood Support",
        content: (
          <>
            Provide direct financial support to grassroots climate
            organizations, empowering communities to sustain advocacy,
            movement-building, and collective action efforts.
          </>
        ),
      },
      {
        title: "Build Leadership and Strategic Capacity",
        content: (
          <>
            Fund capacity-building programs that foster leadership, community
            care, policy engagement, and strategic communication, prioritizing
            climate resilience and sustainable development.
          </>
        ),
      },
      {
        title: "Strengthen Collaboration and Networks",
        content: (
          <>
            Support convenings and networking opportunities that nurture strong,
            inclusive alliances among youth movements, policymakers, industry
            leaders, and community advocates.
          </>
        ),
      },
      {
        title: "Elevate Frontline Voices",
        content: (
          <>
            Fund campaigns that amplify the voices of frontline communities,
            ensuring their perspectives are central to advancing climate action
            and equity.
          </>
        ),
      },
    ],
  },
  ourWhy: {
    title: "Our Why",
    contentList: [
      {
        title: "Strengthening Organizational Capacities",
        content: (
          <>
            Provide resources and support to enhance the operational
            effectiveness and sustainability of youth climate movements.
          </>
        ),
      },
      {
        title: "Increasing Collaboration",
        content: (
          <>
            Foster partnerships among youth-led climate movements, policymakers,
            and industry leaders to create a cohesive and impactful climate
            action ecosystem.Foster partnerships among youth-led climate
            movements, policymakers, and industry leaders to create a cohesive
            and impactful climate action ecosystem.
          </>
        ),
      },
      {
        title: "Enhancing Advocacy Skills",
        content: (
          <>
            Equip young climate leaders with the necessary skills and tools to
            engage in effective advocacy and policy influence.
          </>
        ),
      },
      {
        title: "Empowering Youth Movements for Systemic Change",
        content: (
          <>
            Support youth-led initiatives in mobilizing communities, advocating
            for ambitious climate policies, and working alongside policymakers
            to fulfill their promises and pledges.
          </>
        ),
      },
      {
        title: "Driving Policy and Structural Change",
        content: (
          <>
            Facilitate sustained advocacy efforts that lead to increased
            political will, policy reforms, and the implementation of climate
            initiatives that reflect the aspirations of young people across
            Africa.
          </>
        ),
      },
    ],
  },
  howToApply: {
    title: "How to Apply",
    subTitle: (
      <>
        Our application process is designed to be accessible and
        straightforward. Follow the steps below to submit your application for
        the Solidarity Fund through the AYCF portal:
      </>
    ),
    contentList: [
      {
        title: "Check Eligibility",
        content: (
          <>
            Review our funding criteria to ensure your project aligns with our
            priorities. We fund projects that promote youth-led climate
            solutions, capacity building, and climate justice across Africa.
          </>
        ),
      },
      {
        title: "Prepare Your Application",
        content: (
          <>
            Gather the necessary documents and project details. This includes a
            project proposal, budget plan, and any supporting materials required
            by our team.
          </>
        ),
      },
      {
        title: "Submit Your Application",
        content: (
          <>
            Applications open once a year in [Month].  See our how to apply page
            for our call for proposal document. Be sure to submit your
            application before the deadline.
          </>
        ),
      },
      {
        title: "Review & Selection",
        content: (
          <>
            Our team will review all submitted applications and select projects
            based on their alignment with AYCF’s goals, feasibility, and
            potential impact.
          </>
        ),
      },
      {
        title: "Grant Notification",
        content: (
          <>
            Successful applicants will be notified and provided with the next
            steps for receiving funding and support.
          </>
        ),
      },
    ],
  },
  applicationProcess: {
    title: "The Application Process",
    subTitle: (
      <>
        The Solidarity Fnnd is implemented through a structured four-stage
        process designed to support youth-led climate innovations from inception
        to implementation:
      </>
    ),
    processList: [
      {
        title: "Open Call",
        content: (
          <>
            For a period of 5 weeks, we invite youth-led initiatives to submit
            their applications.
          </>
        ),
      },
      {
        title: "Eligibility Screening",
        content: (
          <>
            The AYCF team reviews each application to ensure it meets the basic
            eligibility criteria and aligns with the program&apos;s priorities.
          </>
        ),
      },
      {
        title: "Advisory Circle Review",
        content: (
          <>
            The AYCF Advisory Circle evaluates and ranks applications, making
            the final selection based on alignment with AYCF’s mission, values,
            and regional representation.
          </>
        ),
      },
      {
        title: "Due Diligence",
        content: (
          <>
            The AYCF team reaches out to selected applicants, guiding them
            through the due diligence process to ensure they meet the necessary
            requirements for funding.
          </>
        ),
      },
      {
        title: "Grant Disbursement",
        content: (
          <>
            The AYCF team collaborates with selected groups to facilitate a
            smooth process, ensuring the timely disbursement of funds to
            grantees.
          </>
        ),
      },
      {
        title: "Project Implementation & Engagement",
        content: (
          <>
            The AYCF team works closely with grantees during the project
            implementation phase, fostering a collaborative community that
            enables peer-to-peer learning and mutual support.
          </>
        ),
      },
    ],
  },
};

export const applyForCSFContent = {
  heroBanner: {
    title: "Climate Research Fund for African Students",
    subTitle: (
      <>
        Africa’s academic and research institutions have long been
        under-resourced, limiting their ability to support ambitious research
        projects at both the undergraduate and postgraduate levels. This
        resource gap hampers the development of critical skills and talents
        among young people, which are essential for addressing the
        continent&apos;s most pressing climate challenges. While Africa holds a
        wealth of knowledge, the challenge lies in effectively documenting and
        sharing it in ways that are accessible and practical for academia and
        industry. The lack of capacity to bridge knowledge creation and its
        application prevents young researchers from reaching their full
        potential, limiting their ability to drive significant contributions to
        sustainable development. Consequently, the full potential of Africa’s
        young researchers remains untapped, preventing significant contributions
        to sustainable development.
      </>
    ),
    buttonTitle: "Apply Now!",
    buttonLink: "/about",
    imgSrc: "/assets/images/csf.png",
  },
  priorityAreas: {
    title: "Our Priority Areas",
    subTitle:
      "This initiative is designed to close these gaps by providing funding, mentorship, and platforms for young African researchers. By empowering students and academic institutions, we are building a new generation of climate leaders who can:",
    contentList: [
      {
        title: undefined,
        content: (
          <>
            Cultivate a culture of research and innovation among undergraduate
            and postgraduate students.
          </>
        ),
      },
      {
        title: undefined,
        content: (
          <>
            Generate new knowledge and insights that contribute to climate
            science.
          </>
        ),
      },
      {
        title: undefined,
        content: (
          <>
            Promote interdisciplinary collaboration among students from various
            academic backgrounds.
          </>
        ),
      },
      {
        title: undefined,
        content: (
          <>
            Facilitate the development of sustainable solutions to mitigate and
            adapt to climate change.
          </>
        ),
      },
    ],
    endNote: (
      <>
        The CRFAS resources and supports projects focused on Africa’s most
        pressing environmental and climate issues.  From assessing the impacts
        of climate change on local communities to developing sustainable
        solutions for adaptation and mitigation,.  The Africa Youth Climate
        Fund’s research funding plays a critical role in informing
        decision-making and driving meaningful action.
      </>
    ),
  },
  ourWhy: {
    title: "Our Why",
    contentList: [
      {
        title: "Empower Young Researcherss",
        content: (
          <>
            Provide funding and support for African students to lead innovative,
            impactful climate research addressing the continent’s unique
            environmental challenges.
          </>
        ),
      },
      {
        title: "Drive Sustainable Solutions",
        content: (
          <>
            Support research that provides evidence-based recommendations for
            informed climate policy and practice in Africa, with a focus on
            climate mitigation, adaptation, and resilience solutions tailored to
            the needs of local communities most affected by climate change.
          </>
        ),
      },
      {
        title: "Enhance Capacity and Skills Development",
        content: (
          <>
            Build students’ research capacity by offering tailored mentorship,
            training, and resources to strengthen their academic and practical
            skills.
          </>
        ),
      },
      {
        title: "Foster Interdisciplinary Collaboration and Knowledge Sharing",
        content: (
          <>
            Facilitate collaboration among students from diverse academic
            backgrounds to address climate challenges through interdisciplinary
            research, while creating platforms for them to connect with
            international experts, policymakers, and stakeholders, amplifying
            their research&apos;s impact and contributing to global climate
            discourse.
          </>
        ),
      },
    ],
  },
  howToApply: {
    title: "How to Apply",
    subTitle: (
      <>
        Our application process is designed to be accessible and
        straightforward. Follow the steps below to submit your application for
        the Solidarity Fund through the AYCF portal:
      </>
    ),
    contentList: [
      {
        title: "Check Eligibility",
        content: (
          <>
            Review our funding criteria to ensure your project aligns with our
            priorities. We fund projects that promote youth-led climate
            solutions, capacity building, and climate justice across Africa.
          </>
        ),
      },
      {
        title: "Prepare Your Application",
        content: (
          <>
            Gather the necessary documents and project details. This includes a
            project proposal, budget plan, and any supporting materials required
            by our team.
          </>
        ),
      },
      {
        title: "Submit Your Application",
        content: (
          <>
            Applications open once a year in [Month].  See our how to apply page
            for our call for proposal document. Be sure to submit your
            application before the deadline.
          </>
        ),
      },
      {
        title: "Review & Selection",
        content: (
          <>
            Our team will review all submitted applications and select projects
            based on their alignment with AYCF’s goals, feasibility, and
            potential impact.
          </>
        ),
      },
      {
        title: "Grant Notification",
        content: (
          <>
            Successful applicants will be notified and provided with the next
            steps for receiving funding and support.
          </>
        ),
      },
    ],
  },
  applicationProcess: {
    title: "The Application Process",
    subTitle: (
      <>
        The Climate Research Fund application process ensures a seamless and
        transparent experience for all applicants:
      </>
    ),
    processList: [
      {
        title: "Preliminary Review and Shortlisting",
        content: (
          <>
            AYCF staff will review all applications to shortlist candidates
            whose proposals meet the fund&apos;s requirements and objectives.
          </>
        ),
      },
      {
        title: "Notification of Shortlisting",
        content: (
          <>
            Shortlisted applicants will receive an email notification inviting
            them to the next phase of the process.
          </>
        ),
      },
      {
        title: "Proposal Presentation and Defense",
        content: (
          <>
            Shortlisted candidates will present and defend their proposals
            before the jury, showcasing the research’s potential to address
            climate issues.
          </>
        ),
      },
      {
        title: "Jury Evaluation",
        content: (
          <>
            The jury will assess each proposal based on AYCF’s values and
            principles, selecting finalists for the fund.
          </>
        ),
      },
      {
        title: "Final Notification",
        content: (
          <>
            AYCF staff will notify selected finalists and guide them through the
            next steps to access the grant and implement their research projects
          </>
        ),
      },
    ],
  },
};

export const getInvolvedContent = {
  title: "Get Involved",
  subTitle: (
    <>
      Join us in supporting young leaders in Africa who are at the forefront of
      climate action. By donating to AYCF, you help young leaders address
      climate change in their communities, scale innovative solutions, and drive
      sustainable impact across Africa.
    </>
  ),
  content: (
    <>
      All our projects are executed with support from you and our friends around
      the globe who believe in environmental sustainability and community
      development. Your support starts with following us on social media and
      sharing our work; volunteering on our projects;  donating to support our
      activities via our official bank account using the details below or
      by online transfer. Your interest in our work is the first step in
      motivating us to do more, kindly reach us via info@greenafricayouth.com
    </>
  ),
  paymentDetails: (
    <>
      Bank Name: Guaranty Trust Bank LTD, Ghana. <br />
      Account Name: Green Africa Youth Organization
      <br />
      SWIFT code/ Routing No: GTBIGHAC
      <br />
      <br />
      Address : Guaranty Trust Bank (Ghana)LTD
      <br />
      25A Castle Road,
      <br />
      Ambassadorial area Ridge
      <br />
      Accra-Ghana
      <br />
      <br />
      ACCOUNT NUMBER: 204117654110
    </>
  ),
  paystackLink: "https://paystack.shop/pay/aycf",
};

export const studentFundContent = {
  // Banner
  banner: {
    title: "Climate Research Fund for African Students",
    imgUrl: "/assets/images/DYEC Main.jpg",
    content: (
      <>
        Africa’s academic and research institutions have long been
        under-resourced, limiting their ability to support ambitious research
        projects at both the undergraduate and postgraduate levels. This
        resource gap hampers the development of critical skills and talents
        among young people, which are essential for addressing the
        continent&apos;s most pressing climate challenges. While Africa holds a
        wealth of knowledge, the challenge lies in effectively documenting and
        sharing it in ways that are accessible and practical for academia and
        industry. The lack of capacity to bridge knowledge creation and its
        application prevents young researchers from reaching their full
        potential, limiting their ability to drive significant contributions to
        sustainable development. Consequently, the full potential of Africa’s
        young researchers remains untapped, preventing significant contributions
        to sustainable development.
      </>
    ),
  },
  postBanner: {
    preamble: (
      <>
        This initiative is designed to close these gaps by providing funding,
        mentorship, and platforms for young African researchers. By empowering
        students and academic institutions, we are building a new generation of
        climate leaders who can:
      </>
    ),
    listContent: [
      <>
        Cultivate a culture of research and innovation among undergraduate and
        postgraduate students.
      </>,
      <>
        Generate new knowledge and insights that contribute to climate science.
      </>,
      <>
        Facilitate the development of sustainable solutions to mitigate and
        adapt to climate change.
      </>,
      <>
        Promote interdisciplinary collaboration among students from various
        academic backgrounds.
      </>,
    ],
    conclusion: (
      <>
        The CRFAS resources and supports projects focused on Africa’s most
        pressing environmental and climate issues. From assessing the impacts of
        climate change on local communities to developing sustainable solutions
        for adaptation and mitigation. The Africa Youth Climate Fund’s research
        funding plays a critical role in informing decision-making and driving
        meaningful action.
      </>
    ),
  },

  // Our Why
  ourWhy: {
    title: "Our Why",
    listContent: [
      {
        title: "Empower Young Researchers",
        content: (
          <>
            Provide funding and support for African students to lead innovative,
            impactful climate research addressing the continent’s unique
            environmental challenges.
          </>
        ),
      },
      {
        title: "Drive Sustainable Solutions",
        content: (
          <>
            Support research that provides evidence-based recommendations for
            informed climate policy and practice in Africa, with a focus on
            climate mitigation, adaptation, and resilience solutions tailored to
            the needs of local communities most affected by climate change.
          </>
        ),
      },
      {
        title: "Enhance Capacity and Skills Development",
        content: (
          <>
            Build students’ research capacity by offering tailored mentorship,
            training, and resources to strengthen their academic and practical
            skills.
          </>
        ),
      },
      {
        title: "Foster Interdisciplinary Collaboration and Knowledge Sharing",
        content: (
          <>
            Facilitate collaboration among students from diverse academic
            backgrounds to address climate challenges through interdisciplinary
            research, while creating platforms for them to connect with
            international experts, policymakers, and stakeholders, amplifying
            their research&apos;s impact and contributing to global climate
            discourse.
          </>
        ),
      },
    ],
  },

  // Application and Review Process
  applicationReviewProcess: {
    title: "Application and Review Process",

    reviewTeam: {
      title: "Who Reviews Your Application?",
      subTitle: (
        <>
          Your application undergoes a three-step review process to ensure
          alignment with AYCF’s mission, principles, and values:
        </>
      ),
      listContent: [
        {
          title: "Initial Review by the AYCF Team",
          content: (
            <>
              AYCF will conduct a preliminary assessment to confirm your
              application meets the eligibility criteria and aligns with the
              fund’s objectives.
            </>
          ),
        },
        {
          title: "Evaluation by the Jury",
          content: (
            <>
              An independent jury composed of experts in climate research,
              education, and development will serve as the decision-makers for
              the application process. They will assess proposals based on their
              relevance, innovation, and potential impact and will determine the
              finalists.
            </>
          ),
        },
        {
          title: "Final Review by AYCF team",
          content: (
            <>
              The AYCF team will carry out a final review of the jury&apos;s
              decisions to ensure they are in line with the fund&apos;s
              principles and values. The review will prioritize diversity and
              inclusion, considering gender, regional balance, and the support
              of historically marginalized communities.
            </>
          ),
        },
      ],
    },

    process: {
      title: "The Application Process",
      subTitle: (
        <>
          The Climate Research Fund application process ensures a seamless and
          transparent experience for all applicants:
        </>
      ),
      listContent: [
        {
          title: "Preliminary Review and Shortlisting",
          content: (
            <>
              AYCF staff will review all applications to shortlist candidates
              whose proposals meet the fund&apos;s requirements and objectives.
            </>
          ),
        },
        {
          title: "Notification of Shortlisting",
          content: (
            <>
              Shortlisted applicants will receive an email notification inviting
              them to the next phase of the process.
            </>
          ),
        },
        {
          title: "Proposal Presentation and Defense",
          content: (
            <>
              Shortlisted candidates will present and defend their proposals
              before the jury, showcasing the research’s potential to address
              climate issues.
            </>
          ),
        },
        {
          title: "Jury Evaluation",
          content: (
            <>
              The jury will assess each proposal based on AYCF’s values and
              principles, selecting finalists for the fund.
            </>
          ),
        },
        {
          title: "Final Notification",
          content: (
            <>
              AYCF staff will notify selected finalists and guide them through
              the next steps to access the grant and implement their research
              projects
            </>
          ),
        },
      ],
    },
  },

  // About AYCF
  aboutUs: {
    title: "About The Africa Youth Climate Fund (AYCF)",
    content: (
      <>
        The Africa Youth Climate Fund (AYCF), an initiative of the Green Africa
        Youth Organization (GAYO), is a youth-led fund supporting underfunded,
        youth-driven climate and environmental solutions across Africa. AYCF
        empowers young climate leaders and groups by prioritizing community
        leadership through a participatory grantmaking approach. Our goal is to
        shift resources, autonomy, and power to youth climate movements,
        enabling them to implement and scale impactful, grassroots solutions.
        AYCF offers funding through three thematic programs: The Africa Climate
        Innovations Challenge, The Solidarity Fund, and The Climate Research
        Fund for African Students.
      </>
    ),
  },
};

// List of African countries
export const africanCountries = [
  "Algeria",
  "Angola",
  "Benin",
  "Botswana",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cameroon",
  "Central African Republic",
  "Chad",
  "Comoros",
  "Côted Ivoire",
  "Democratic Republic of Congo",
  "Djibouti",
  "Egypt",
  "Equatorial Guinea",
  "Eritrea",
  "Eswatini",
  "Ethiopia",
  "Gabon",
  "Gambia",
  "Ghana",
  "Guinea",
  "Guinea-Bissau",
  "Kenya",
  "Lesotho",
  "Liberia",
  "Libya",
  "Madagascar",
  "Malawi",
  "Mali",
  "Mauritania",
  "Mauritius",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Niger",
  "Nigeria",
  "Rwanda",
  "Republic of Congo",
  "Sao Tome and Principe",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Sudan",
  "Swaziland",
  "Tanzania",
  "Togo",
  "Tunisia",
  "Uganda",
  "Western Sahara",
  "Zambia",
  "Zimbabwe",
];
