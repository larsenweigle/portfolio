"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button, buttonVariants } from "./ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Cross1Icon, CodeIcon, PersonIcon, BackpackIcon, RocketIcon } from "@radix-ui/react-icons"
import { useIsV0 } from "@/lib/context"

const DURATION = 0.3
const DELAY = DURATION
const EASE_OUT = "easeOut"
const EASE_OUT_OPACITY = [0.25, 0.46, 0.45, 0.94] as const
const SPRING = {
  type: "spring" as const,
  stiffness: 60,
  damping: 10,
  mass: 0.8,
}

type SectionKey = "me" | "education" | "experience" | "projects"

const sections = {
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
    content: {
      title: "Hi, I'm Larsen Weigle",
      subtitle: "Data Scientist specializing in conversational AI and task-oriented agents.",
      cards: [
        {
          title: "What I Do",
          content:
            "I build AI-powered applications focused on conversational AI, LLM-augmented systems, and data-driven solutions.",
          skills: ["Python", "TypeScript", "LangGraph", "AI SDK"],
        },
        {
          title: "Current Focus",
          content: "Tech lead for conversational AI at Candidly, building student loan and college planning assistants from prototype to production.",
          skills: [],
        },
      ],
    },
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
    content: {
      title: "Education & Learning",
      subtitle: "Stanford Computer Science with specialization in Artificial Intelligence.",
      cards: [
        {
          title: "Stanford University",
          content: "B.S. Computer Science (2023) • M.S. Computer Science (2024) • Specialization: Artificial Intelligence",
          skills: [],
        },
        {
          title: "Research & Publications",
          content:
            "Stanford Open Virtual Assistant Lab (OVAL) • Contributed to Genie Worksheets and SUQL • Coauthor: ACL 2025 paper on LLM-Augmented Cognition",
          skills: [],
        },
        {
          title: "Athletics & Leadership",
          content:
            "Men's Water Polo: 4-year varsity, senior captain • NCAA National Champion (2019) • NCAA Elite 90 Award (2021) • Postgraduate Scholarship Recipient",
          skills: [],
        },
      ],
    },
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
    content: {
      title: "Professional Experience",
      subtitle: "Building AI-powered solutions across education, research, and environmental sectors.",
      cards: [
        {
          title: "Candidly - Data Scientist",
          content:
            "June 2024 - Present • Tech lead for conversational AI team. Built AI student-loan and college planning assistant from prototype to production. Designed automated support-ticket analysis pipeline and dashboard.",
          skills: ["Python", "TypeScript", "LangGraph", "AI SDK", "Arize Phoenix", "AWS"],
        },
        {
          title: "Stanford OVAL - Research Assistant",
          content:
            "Jan - June 2024 • Contributed to Genie Worksheets framework and SUQL. Coauthored ACL 2025 paper on LLM-Augmented Cognition research.",
          skills: ["Python", "Postgres", "PyTorch"],
        },
        {
          title: "The Ocean Cleanup - Data Scientist Intern",
          content:
            "Sep - Dec 2023 • Developed marine-plastic beaching predictor. Built end-to-end pipeline for feature engineering, dataset assembly, and model training/evaluation.",
          skills: ["Python", "Pandas", "scikit-learn"],
        },
      ],
    },
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
    content: {
      title: "Projects & Research",
      subtitle: "Research contributions and technical work in AI, ML, and data science.",
      cards: [
        {
          title: "ACL 2025 Publication",
          content: "Coauthor of 'Controllable and Reliable Knowledge-Intensive Task-Oriented Conversational Agents with Declarative Genie Worksheets'",
          skills: ["Research", "NLP", "Task-Oriented Agents"],
        },
        {
          title: "Conversational AI Platform",
          content: "Built production AI assistant at Candidly for student-loan and college planning with evaluation, guardrails, and deployment infrastructure.",
          skills: ["LangGraph", "AI SDK", "Arize Phoenix"],
        },
        {
          title: "Marine Plastic Predictor",
          content: "Developed ML pipeline to forecast plastic density at coastline hotspots worldwide, producing ranked maps to prioritize cleanup efforts.",
          skills: ["XGBoost", "Pandas", "scikit-learn"],
        },
      ],
    },
  },
}

export const Portfolio = () => {
  const [activeSection, setActiveSection] = useState<SectionKey | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [showOutput, setShowOutput] = useState(false)
  const [showTyping, setShowTyping] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [currentOutput, setCurrentOutput] = useState("")

  const isInitialRender = useRef(true)
  const contentContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return () => {
      isInitialRender.current = false
    }
  }, [activeSection])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveSection(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const startAgentFlow = async (section: SectionKey) => {
    if (isProcessing) return

    setIsProcessing(true)
    const data = sections[section]

    // Reset UI
    setTerminalLines([])
    setShowOutput(false)
    setShowContent(false)
    setShowTyping(false)
    setCurrentOutput("")

    await sleep(500)

    // Terminal logs
    for (const log of data.logs) {
      setTerminalLines((prev) => [...prev, log])
      await sleep(600)
    }

    // Show output
    await sleep(300)
    setCurrentOutput(data.output)
    setShowOutput(true)

    // Show typing indicator
    await sleep(800)
    setShowTyping(true)

    // Show content
    await sleep(1500)
    setShowTyping(false)
    setShowContent(true)

    setIsProcessing(false)
  }

  const handleSectionClick = (section: SectionKey) => {
    if (activeSection === section) {
      setActiveSection(null)
      return
    }

    setActiveSection(section)
    startAgentFlow(section)
  }

  return (
    <div className="flex overflow-hidden relative flex-col gap-6 justify-center items-center pt-4 w-full h-full short:lg:pt-4 pb-footer-safe-area 2xl:pt-footer-safe-area px-sides">
      <motion.div layout="position" transition={{ duration: DURATION, ease: EASE_OUT }}>
        <h1 className="font-serif text-4xl italic short:lg:text-3xl sm:text-4xl lg:text-5xl text-foreground">
          Larsen Weigle
        </h1>
      </motion.div>

      <div className="flex flex-col items-center min-h-0 shrink gap-6">
        <AnimatePresenceGuard>
          {!activeSection && (
            <motion.div
              key="navigation"
              initial={isInitialRender.current ? false : "hidden"}
              animate="visible"
              exit="exit"
              variants={{
                visible: {
                  scale: 1,
                  transition: {
                    delay: DELAY,
                    duration: DURATION,
                    ease: EASE_OUT,
                  },
                },
                hidden: {
                  scale: 0.9,
                  transition: { duration: DURATION, ease: EASE_OUT },
                },
                exit: {
                  y: -150,
                  scale: 0.9,
                  transition: { duration: DURATION, ease: EASE_OUT_OPACITY },
                },
              }}
              className="flex flex-col items-center gap-6"
            >
              <motion.p
                initial={isInitialRender.current ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: { duration: DURATION, ease: EASE_OUT_OPACITY },
                }}
                transition={{
                  duration: DURATION,
                  ease: EASE_OUT,
                  delay: DELAY,
                }}
                className="text-sm short:lg:text-sm sm:text-base lg:text-lg leading-relaxed font-medium text-center text-foreground/90 text-pretty max-w-2xl"
              >
                Data scientist and software engineer shipping LLM products. Previously at Stanford. Now turning research into production systems.
              </motion.p>

              <div className="flex flex-wrap gap-3 justify-center">
                {Object.entries(sections).map(([key, section]) => {
                  const IconComponent = section.icon
                  return (
                    <Button
                      key={key}
                      variant="outline"
                      onClick={() => handleSectionClick(key as SectionKey)}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Button>
                  )
                })}
              </div>
            </motion.div>
          )}

          <motion.div layout="position" transition={SPRING} key="button" className={activeSection ? "my-2" : "mt-4"}>
            <Button
              variant="outline"
              className={cn("relative h-7", activeSection ? "px-2 w-7" : "px-4 text-xs")}
              onClick={() => setActiveSection(null)}
            >
              {activeSection ? (
                <Cross1Icon className="size-3 text-foreground" />
              ) : (
                "Portfolio"
              )}
            </Button>
          </motion.div>

          {activeSection && (
            <motion.div
              key="portfolio-content"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: DELAY,
                    duration: DURATION,
                    ease: EASE_OUT,
                  },
                },
                hidden: {
                  opacity: 0,
                  scale: 0.9,
                  transition: { duration: DURATION, ease: EASE_OUT },
                },
                exit: {
                  opacity: 0,
                  scale: 0.9,
                  transition: { duration: DURATION, ease: EASE_OUT_OPACITY },
                },
              }}
              ref={contentContainerRef}
              className="relative flex flex-col gap-3 backdrop-blur-xl border-2 border-border/50 bg-muted/60 max-w-5xl w-full text-foreground rounded-3xl ring-1 ring-offset-primary/10 ring-border/10 ring-offset-2 shadow-button max-h-[calc(90dvh-var(--footer-safe-area))] overflow-y-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-4">
                {/* Agent Visualization */}
                <div className="bg-background/10 backdrop-blur-sm rounded-xl p-3 border border-border/30">
                  <div className="flex flex-col items-center space-y-2">
                    <motion.div
                      animate={{ rotate: isProcessing ? 360 : 0 }}
                      transition={{ duration: 2, repeat: isProcessing ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
                      className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center border-2 border-border/50"
                    >
                      <CodeIcon className="w-5 h-5 text-foreground" />
                    </motion.div>

                    <div className="text-xs font-mono text-muted-foreground bg-background/20 rounded-lg p-2 border border-border/30">
                      {`{ "role": "system", "content": "You are a helpful assistant." }`}
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                      {Object.entries(sections).map(([key, section]) => {
                        const isActive = activeSection === key && isProcessing
                        return (
                          <motion.div
                            key={key}
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-mono transition-all duration-300 text-center",
                              isActive
                                ? "bg-success/20 text-success border border-success/30 animate-pulse"
                                : "bg-muted/20 text-muted-foreground border border-border/30",
                            )}
                            animate={isActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                            transition={{ duration: 1, repeat: isActive ? Number.POSITIVE_INFINITY : 0 }}
                          >
                            {`${section.tool}()`}
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Terminal */}
                <div className="bg-background/90 rounded-xl p-3 border border-border/30 font-mono text-xs">
                  <div className="text-muted-foreground mb-2 text-xs">STDOUT</div>
                  <div className="space-y-0.5 min-h-[80px]">
                    {terminalLines.map((line, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-success"
                      >
                        {line}
                      </motion.div>
                    ))}
                  </div>

                  {showOutput && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mt-2 p-2 bg-muted/20 rounded-lg text-xs text-muted-foreground whitespace-pre-wrap border border-border/30"
                    >
                      {currentOutput}
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="px-4 pb-4">
                <div className="bg-background/10 backdrop-blur-sm rounded-xl p-4 border border-border/30">
                  {/* <div className="text-muted-foreground mb-4 text-sm font-medium border-b border-border/30 pb-2">
                    Chat Output
                  </div> */}

                  {showTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-muted-foreground italic text-sm mb-4"
                    >
                      <span className="inline-block w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
                      Streaming response...
                    </motion.div>
                  )}

                  {showContent && activeSection && (
                    <StreamingContent section={activeSection} containerRef={contentContainerRef} />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresenceGuard>
      </div>
    </div>
  )
}

const StreamingContent = ({ section, containerRef }: { section: SectionKey; containerRef: React.RefObject<HTMLDivElement> }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const fullContent = sections[section].streamContent

  useEffect(() => {
    setDisplayedText("")
    setIsComplete(false)
    let currentIndex = 0
    const chunkSize = 3 // Stream multiple characters at once for better readability

    const streamInterval = setInterval(() => {
      if (currentIndex < fullContent.length) {
        const nextChunk = fullContent.slice(currentIndex, currentIndex + chunkSize)
        setDisplayedText((prev) => prev + nextChunk)
        currentIndex += chunkSize
      } else {
        setIsComplete(true)
        clearInterval(streamInterval)
      }
    }, 20) // Fast streaming speed

    return () => clearInterval(streamInterval)
  }, [section, fullContent])

  // Separate effect to handle auto-scrolling when displayedText changes
  useEffect(() => {
    if (bottomRef.current && displayedText.length > 0) {
      // Use scrollIntoView to scroll the bottom element into view
      bottomRef.current.scrollIntoView({ behavior: 'auto', block: 'end' })
    }
  }, [displayedText])

  return (
    <div className="font-mono text-sm text-foreground leading-relaxed whitespace-pre-wrap">
      {displayedText.split(/(<[^>]+>)/g).map((part, index) => {
        if (part.match(/^<[^>]+>$/)) {
          return (
            <span key={index} className="text-blue-400">
              {part}
            </span>
          )
        }
        return <span key={index}>{part}</span>
      })}
      {!isComplete && <span className="inline-block w-2 h-4 bg-foreground ml-1 animate-pulse" />}
      <div ref={bottomRef} />
    </div>
  )
}

const AnimatePresenceGuard = ({ children }: { children: React.ReactNode }) => {
  const isV0 = useIsV0()
  return isV0 ? (
    <>{children}</>
  ) : (
    <AnimatePresence mode="popLayout" propagate>
      {children}
    </AnimatePresence>
  )
}
