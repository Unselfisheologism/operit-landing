"use client"

import StackingCards, { StackingCardItem } from "./stacking-cards"
import PhoneVideoPlayer from "./PhoneVideoPlayer"

const phoneVideos = [
  {
    src: "https://res.cloudinary.com/dcpcpoyzj/video/upload/v1787407427/makeanimageofadonkeyuiautomationvideo_ra7obd.mp4",
    description: "Twent using the Gemini app to make an image of a donkey",
  },
  {
    src: "https://res.cloudinary.com/dcpcpoyzj/video/upload/v1787407406/emptyrecyclebinuiautomationvideo_x5k84q.mp4",
    description: "Twent empties Recycle Bin (on user confirmation) in the My Files app",
  },
]

type Card = {
  bgColor: string
  textColor: string
  title: string
  description: string
  image?: string
  videos?: { src: string; description: string }[]
}

const cards: Card[] = [
  {
    bgColor: "bg-[#0015ff]",
    textColor: "text-white",
    title: "Twent can use your phone",
    description:
      "Twent can use your apps and any part of your phone (it's safe!), and run on autopilot. It can explain what's on screen",
    videos: phoneVideos,
  },
  {
    bgColor: "bg-[#f97316]",
    textColor: "text-black",
    title: "Twent can make",
    description: "Twent can write code, generate slide decks, videos, images, spreadsheets, and websites — all from a simple request.",
    videos: [
      {
        src: "https://res.cloudinary.com/dcpcpoyzj/video/upload/v1787412593/lv_0_20260822203703_y0uqiv.mp4",
        description: "Twent creating something from a simple request",
      },
    ],
  },
  {
    bgColor: "bg-[#0015ff]",
    textColor: "text-white",
    title: "Twent has a terminal",
    description:
      "Twent has a full Linux-style terminal on your phone, can install tools, run scripts, and do the kind of work that used to need a laptop.",
    videos: [
      {
        src: "https://res.cloudinary.com/dcpcpoyzj/video/upload/v1787412082/lv_0_20260822204900_btagzf.mp4",
        description: "Twent running a Linux-style terminal on the phone",
      },
    ],
  },
  {
    bgColor: "bg-[#f97316]",
    textColor: "text-black",
    title: "Twent can remember",
    description:
      "Twent can remember your preferences, past requests, and important context over time — it's memory grows overtime!",
    videos: [
      {
        src: "https://res.cloudinary.com/dcpcpoyzj/video/upload/v1787414081/lv_0_20260822212259_mhes06.mp4",
        description: "Twent remembering preferences and past context",
      },
    ],
  },
  {
    bgColor: "bg-[#0015ff]",
    textColor: "text-white",
    title: "Twent can grow with you",
    description:
      "Twent can use extra abilities you add, run on its own on a schedule or when you trigger it, and even ask you when it needs a real decision.",
    image:
      "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&auto=format&fit=crop&q=60",
  },
]

export default function StackingCardsDemo() {
  return (
    <div className="text-white">
      <StackingCards totalCards={cards.length} className="h-[700vh]">
        {cards.map(({ bgColor, textColor, description, videos, image, title }, index) => (
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
                {videos ? (
                  <PhoneVideoPlayer videos={videos} />
                ) : (
                  <img
                    src={image}
                    alt={title}
                    className="object-cover"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                  />
                )}
              </div>
            </div>
          </StackingCardItem>
        ))}
      </StackingCards>
    </div>
  )
}
