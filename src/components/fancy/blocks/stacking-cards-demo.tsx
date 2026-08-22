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
  accentColor?: string
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
    accentColor: "#0015ff",
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
    accentColor: "#0015ff",
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
    title: "Twent confirms or asks if it needs to",
    description:
      "Twent asks for confirmation, before doing anything serious or deleting stuff. It asks for Information if it needs you to make a decision, choose an option, etc.",
    videos: [
      {
        src: "https://res.cloudinary.com/dcpcpoyzj/video/upload/v1787414501/lv_0_20260822213044_jzsldc.mp4",
        description: "Twent confirming before emptying the Recycle Bin (user told it to).",
      },
      {
        src: "https://res.cloudinary.com/dcpcpoyzj/video/upload/v1787414601/lv_0_20260822213241_jaigtp.mp4",
        description: "Twent asking when it needs your opinion",
      },
    ],
  },
]

export default function StackingCardsDemo() {
  return (
    <div className="text-white">
      <StackingCards totalCards={cards.length} className="h-[700vh]">
        {cards.map(({ bgColor, textColor, description, videos, image, title, accentColor }, index) => (
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

              <div
                className="rounded-xl relative overflow-hidden flex-1 min-h-0 mx-auto sm:flex-none sm:self-stretch"
                style={{ aspectRatio: "9 / 16", maxWidth: "100%" }}
              >
                {videos ? (
                  <PhoneVideoPlayer videos={videos} accentColor={accentColor} />
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
