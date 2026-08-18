"use client"

import StackingCards, { StackingCardItem } from "./stacking-cards"

const cards = [
  {
    bgColor: "bg-[#f97316]",
    textColor: "text-black",
    title: "Under the Hood",
    description:
      "Not just a chatbot. Twent exposes 50+ built-in tools, connects to 1000+ apps, and loads MCP servers on demand. Chain them together and your phone becomes a programmable agent.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60",
  },
  {
    bgColor: "bg-[#0015ff]",
    textColor: "text-white",
    title: "UI Automation",
    description:
      "The overlay agent sees your screen and interacts like a human: read elements, tap buttons, fill forms, and chain multi-step flows across Gmail, Maps, banking apps, and more.",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=60",
  },
  {
    bgColor: "bg-[#ff5941]",
    textColor: "text-black",
    title: "For Developers",
    description:
      "Run Claude Code, OpenAI Codex, OpenCode, and Hermes Agent from a full Ubuntu 24.04 terminal on your phone. No laptop required for hotfixes, PR reviews, or deployments.",
    image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60",
  },
  {
    bgColor: "bg-[#1f464d]",
    textColor: "text-white",
    title: "Everything Else",
    description:
      "Intelligent memory, voice interaction, mini-apps, file generation, character cards, and BYOK privacy. Twent remembers, creates, and adapts to how you work.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60",
  },
  {
    bgColor: "bg-[#0015ff]",
    textColor: "text-white",
    title: "Privacy First",
    description:
      "Bring your own API key. Run local models with MNN and llama.cpp, or use OpenAI, Anthropic, and Google. Your data stays on your device unless you choose otherwise.",
    image:
      "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&auto=format&fit=crop&q=60",
  },
]

export default function StackingCardsDemo() {
  return (
    <div className="text-white">
      <StackingCards totalCards={cards.length} className="h-[700vh]">
        {cards.map(({ bgColor, textColor, description, image, title }, index) => (
          <StackingCardItem key={index} index={index} className="h-[620px]">
            <div
              className={
                bgColor +
                " " +
                textColor +
                " h-[80%] sm:h-[70%] flex-col sm:flex-row aspect-video px-8 py-10 flex w-11/12 rounded-3xl mx-auto relative"
              }
            >
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="font-bold text-2xl mb-5">{title}</h3>
                <p>{description}</p>
              </div>

              <div className="w-full sm:w-1/2 rounded-xl aspect-video relative overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="object-cover"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </StackingCardItem>
        ))}
      </StackingCards>
    </div>
  )
}
