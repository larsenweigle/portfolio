import { PersonIcon, BackpackIcon, CodeIcon, RocketIcon } from "@radix-ui/react-icons"

export type SectionKey = "me" | "education" | "experience" | "projects"

export const sections = {
  me: {
    icon: PersonIcon,
    tool: "about_me",
    logs: [
      ">> executing about_me()...",
      ">> fetching personal information...",
      ">> compiling bio data...",
      ">> returning results...",
    ],
    output: `{
  "name": "Larsen Weigle",
  "role": "Data Scientist",
  "location": "San Francisco, CA",
  "interests": ["AI/ML", "Conversational AI", "LLM Applications"],
  "status": "thinking about context windows"
}`,
    streamContent: `<assistant>

<name>
Larsen Weigle
</name>

<location>
San Francisco, CA
</location>

<role>
Data scientist specializing in conversational AI and task-oriented agents. I build AI-powered applications focused on LLM-augmented systems and data-driven solutions. I love working on highly collaborative, fast-paced teams.
</role>

<current_focus>
Tech lead for conversational AI team at Candidly. Building student loan and college planning assistants from prototype to production, defining roadmaps for evaluation, guardrails, and deployment.
</current_focus>

</assistant>`,
  },
  education: {
    icon: BackpackIcon,
    tool: "fetch_education",
    logs: [
      ">> executing fetch_education()...",
      ">> accessing academic records...",
      ">> retrieving certifications...",
      ">> returning educational data...",
    ],
    output: `{
  "degrees": ["B.S. Computer Science", "M.S. Computer Science"],
  "university": "Stanford University",
  "years": "2023, 2024",
  "specialization": "Artificial Intelligence",
  "research": "Stanford OVAL"
}`,
    streamContent: `<assistant>

<stanford_bs_2023>
Completed Bachelor of Science in Computer Science with specialization in Artificial Intelligence. Developed strong foundation in machine learning, natural language processing, and software engineering principles.
</stanford_bs_2023>

<stanford_ms_2024>
Pursued Master of Science in Computer Science, deepening expertise in AI systems and research methodologies. Focused on practical applications of large language models and task-oriented conversational agents.
</stanford_ms_2024>

<research_and_publications>
Stanford Open Virtual Assistant Lab (OVAL) - Contributed to Genie Worksheets, a declarative framework for task-oriented agents, and SUQL, an extension of SQL with free-text primitives for LLMs to perform search over hybrid structured/unstructured data. Coauthor of ACL 2025 paper: "Controllable and Reliable Knowledge-Intensive Task-Oriented Conversational Agents with Declarative Genie Worksheets"
</research_and_publications>

<athletics_and_leadership>
Men's Water Polo: Four-year varsity athlete, senior captain. NCAA National Champion (2019). NCAA Elite 90 Award recipient (2021) - highest GPA at national championship. Postgraduate Scholarship Recipient. Alpha Pi chapter vice president. Member of StanfordStartups.ai.
</athletics_and_leadership>

</assistant>`,
  },
  experience: {
    icon: CodeIcon,
    tool: "get_experience",
    logs: [
      ">> executing get_experience()...",
      ">> querying work history...",
      ">> processing achievements...",
      ">> returning career data...",
    ],
    output: `{
  "current": "Data Scientist @ Candidly",
  "roles": ["Data Scientist", "Research Assistant", "ML Engineer"],
  "companies": ["Candidly", "Stanford OVAL", "The Ocean Cleanup", "Caktus.ai", "Momentum"],
  "specialties": ["Conversational AI", "LLM Applications", "ML Infrastructure"]
}`,
    streamContent: `<assistant>

<candidly>
<role>Data Scientist</role>
<duration>June 2024 - Present</duration>
<description>
Tech lead for conversational AI team. Built AI student-loan and college planning assistant from prototype to production, defining roadmap for evaluation, guardrails, and deployment. Designed automated support-ticket analysis pipeline and dashboard that summarize, classify, and cluster tickets to surface trends and product bugs.
</description>
<stack>Python, TypeScript, LangGraph, AI SDK, Arize Phoenix, AWS, Postgres, Hex</stack>
</candidly>

<stanford_oval>
<role>Research Assistant</role>
<duration>January - June 2024</duration>
<description>
Contributed to Genie Worksheets, a declarative framework for task-oriented agents, and SUQL, an extension of SQL with free-text primitives for LLMs to perform search over hybrid structured/unstructured data. Coauthored ACL 2025 paper on OVAL's LLM-Augmented Cognition research.
</description>
<stack>Python, Postgres, PyTorch, GCS</stack>
</stanford_oval>

<the_ocean_cleanup>
<role>Data Scientist Intern</role>
<duration>September - December 2023</duration>
<description>
Developed marine-plastic beaching predictor to forecast density/weight at coastline hotspots and candidate sites worldwide. Built end-to-end pipeline for feature engineering, dataset assembly, and model training/evaluation using linear regression, XGBoost, and ordinal logistic models, producing ranked maps to prioritize cleanup efforts.
</description>
<stack>Python, Pandas, scikit-learn</stack>
</the_ocean_cleanup>

<caktus_ai>
<role>Machine Learning Engineer Intern</role>
<duration>March - September 2023</duration>
<description>
Supervised fine-tuned and quantized open source models on proprietary academic journal datasets. Constructed company's first LLM-as-judge pipeline to generate pairwise evaluations across different models.
</description>
<stack>Python, Hugging Face, Google Colab</stack>
</caktus_ai>

<momentum>
<role>Software Engineer Intern</role>
<duration>June - August 2022</duration>
<description>
Fine-tuned and modified T5 Text-to-Text Transformer model to produce unique search queries given product descriptions, which was used to build training targets for a CLIP embedding model for products. Created packages to scrape stock keeping units and global trade numbers from HTML of product pages for various e-commerce websites.
</description>
<stack>Python, PyTorch, Golang, K8s</stack>
</momentum>

</assistant>`,
  },
  projects: {
    icon: RocketIcon,
    tool: "search_projects",
    logs: [
      ">> executing search_projects()...",
      ">> scanning repositories...",
      ">> analyzing contributions...",
      ">> returning project list...",
    ],
    output: `{
  "research": ["Genie Worksheets", "SUQL"],
  "publication": "ACL 2025",
  "focus_areas": ["Conversational AI", "Task-Oriented Agents", "ML Infrastructure"],
  "github": "github.com/larsenweigle"
}`,
    streamContent: `<assistant>

<coming soon>
More projects coming soon...
</coming soon>

<acl_2025_publication>
<title>
Controllable and Reliable Knowledge-Intensive Task-Oriented Conversational Agents with Declarative Genie Worksheets
</title>
<conference>ACL 2025</conference>
<role>Coauthor</role>
<arxiv>arXiv:2407.05674</arxiv>
<description>
Research on building reliable and controllable task-oriented conversational agents using declarative frameworks. Explores methods for creating knowledge-intensive dialogue systems that can handle complex, multi-turn interactions while maintaining accuracy and user trust.
</description>
</acl_2025_publication>

</assistant>`,
  },
}
