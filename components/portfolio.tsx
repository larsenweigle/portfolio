"use client"

import type React from "react"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import * as ReactNS from "react"
import { Button } from "./ui/button"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Cross1Icon, CodeIcon } from "@radix-ui/react-icons"
 
import { sections, type SectionKey } from "@/data/portfolio-sections"
import { useIsMobile } from "@/hooks/use-mobile"

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
// Timings tuned for noticeable but smooth sequence
const LOG_STREAM_DELAY = 120
const TYPING_SPINUP_DELAY = 300
const SEGMENT_STAGGER_DELAY = 0.08 // Delay between paragraph reveals (seconds)
const SEGMENT_INITIAL_Y_OFFSET = 6 // Initial Y offset for segment fade-in (pixels)
const CONTENT_INITIAL_Y_OFFSET = 12 // Initial Y offset for content container (pixels)

export const Portfolio = () => {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const effectiveDuration = prefersReducedMotion ? 0 : (isMobile ? DURATION * 1.8 : DURATION)
  const effectiveDelay = prefersReducedMotion ? 0 : (isMobile ? DELAY * 1.2 : DELAY)
  const [activeSection, setActiveSection] = useState<SectionKey | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [showOutput, setShowOutput] = useState(false)
  const [showTyping, setShowTyping] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [currentOutput, setCurrentOutput] = useState("")

  const isInitialRender = useRef(true)

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

    try {
      // Terminal logs
      const perLineDelay = isMobile ? Math.round(LOG_STREAM_DELAY * 1.2) : LOG_STREAM_DELAY
      for (const log of data.logs) {
        setTerminalLines((prev) => [...prev, log])
        await sleep(perLineDelay)
      }

      // Show output immediately after logs
      setCurrentOutput(data.output)
      setShowOutput(true)

      // Brief typing indicator before streaming content
      const typingDelay = isMobile ? Math.round(TYPING_SPINUP_DELAY * 1.2) : TYPING_SPINUP_DELAY
      setShowTyping(true)
      await sleep(typingDelay)
      setShowTyping(false)
      setShowContent(true)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSectionClick = (section: SectionKey) => {
    if (activeSection === section) {
      setActiveSection(null)
      return
    }

    // Immediate visual feedback for instant responsiveness
    setActiveSection(section)

    // Run async flow without blocking UI thread
    ReactNS.startTransition(() => {
      startAgentFlow(section)
    })
  }

  return (
    <div className="flex overflow-hidden relative flex-col gap-3 justify-center items-center pt-4 w-full h-full short:lg:pt-4 pb-16 md:pb-20 px-sides will-change-transform will-change-opacity gpu-accelerate">
      <motion.div
        animate={{ opacity: 1 }}
        transition={{ duration: effectiveDuration, ease: EASE_OUT }}
      >
        <h1 className="font-serif text-4xl italic short:lg:text-3xl sm:text-4xl lg:text-5xl text-foreground">
          Larsen Weigle
        </h1>
      </motion.div>

      <div className="flex flex-col items-center min-h-0 shrink gap-3">
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
                    delay: effectiveDelay,
                    duration: effectiveDuration,
                    ease: EASE_OUT,
                  },
                },
                hidden: {
                  scale: 0.9,
                  transition: { duration: effectiveDuration, ease: EASE_OUT },
                },
                exit: {
                  y: -150,
                  scale: 0.9,
                  transition: { duration: effectiveDuration, ease: EASE_OUT_OPACITY },
                },
              }}
              className="flex flex-col items-center gap-6 will-change-transform will-change-opacity gpu-accelerate"
            >
              <motion.p
                initial={isInitialRender.current ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: { duration: effectiveDuration, ease: EASE_OUT_OPACITY },
                }}
                transition={{
                  duration: effectiveDuration,
                  ease: EASE_OUT,
                  delay: effectiveDelay,
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

          <motion.div
            animate={{ scale: activeSection ? 0.95 : 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : (isMobile ? 0.35 : 0.2) }}
            key="button"
            className={activeSection ? "my-2" : "mt-4"}
          >
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
                    delay: effectiveDelay,
                    duration: effectiveDuration,
                    ease: EASE_OUT,
                  },
                },
                hidden: {
                  opacity: 0,
                  scale: 0.9,
                  transition: { duration: effectiveDuration, ease: EASE_OUT },
                },
                exit: {
                  opacity: 0,
                  scale: 0.9,
                  transition: { duration: effectiveDuration, ease: EASE_OUT_OPACITY },
                },
              }}
              className="relative flex flex-col gap-3 backdrop-blur-xl border-2 border-border/50 bg-muted/60 max-w-5xl w-full text-foreground rounded-3xl ring-1 ring-offset-primary/10 ring-border/10 ring-offset-2 shadow-button max-h-[calc(100%-3.5rem)] overflow-y-auto will-change-transform will-change-opacity gpu-accelerate"
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
                <div className={cn(
                  "bg-background/90 rounded-xl p-3 border border-border/30 font-mono text-xs will-change-transform will-change-opacity gpu-accelerate",
                  isProcessing && "relative terminal-active"
                )}>
                  <div className="text-muted-foreground mb-2 text-xs">STDOUT</div>
                  <div className="space-y-0.5 min-h-[80px]">
                    {terminalLines.map((line, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: prefersReducedMotion ? 0 : (isMobile ? 0.35 : 0.25) }}
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
                      transition={{ duration: prefersReducedMotion ? 0 : (isMobile ? 0.5 : 0.36) }}
                      className="mt-2 p-2 bg-muted/20 rounded-lg text-xs text-muted-foreground whitespace-pre-wrap border border-border/30 will-change-transform will-change-opacity gpu-accelerate"
                    >
                      {currentOutput}
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="px-4 pb-4">
                <div className="bg-background/10 backdrop-blur-sm rounded-xl p-4 border border-border/30 will-change-transform will-change-opacity gpu-accelerate">
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

                  {showContent && activeSection && <StreamingContent section={activeSection} />}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresenceGuard>
      </div>
    </div>
  )
}

const StreamingContent = ReactNS.memo(({ section }: { section: SectionKey }) => {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const fullContent = sections[section].streamContent.trim()
  const contentDuration = prefersReducedMotion ? 0 : (isMobile ? 0.55 : 0.4)

  return (
    <motion.div
      initial={{ opacity: 0, y: CONTENT_INITIAL_Y_OFFSET }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: contentDuration, ease: EASE_OUT }}
      className="font-mono text-sm text-foreground leading-relaxed whitespace-pre-wrap will-change-opacity will-change-transform gpu-accelerate"
    >
      {fullContent.split(/(<[^>]+>)/g).map((part, index) => (
        /^<[^>]+>$/.test(part) ? (
          <span key={`${section}-${index}`} className="text-blue-400">{part}</span>
        ) : (
          <span key={`${section}-${index}`}>{part}</span>
        )
      ))}
    </motion.div>
  )
})

StreamingContent.displayName = 'StreamingContent'

const AnimatePresenceGuard = ({ children }: { children: React.ReactNode }) => {
  return (
    <AnimatePresence mode="sync" initial={false}>
      {children}
    </AnimatePresence>
  )
}
