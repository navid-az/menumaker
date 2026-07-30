"use client";

import React from "react";

//libraries
import { motion, type Variants } from "motion/react";

//utils
import BlurRevealText from "@/lib/blurRevealText";

//SVGs
import {
    Users,
    Radar,
    ScrollText,
    Settings,
    Chart,
} from "@/app/components/icons/DuoTone";

const icons = [
    {
        id: 1,
        Component: Settings,
        className: "w-5 h-5 sm:w-8 sm:h-8 opacity-35 md:w-9 md:h-9 lg:w-14 lg:h-14",
    },
    {
        id: 2,
        Component: ScrollText,
        className:
            "w-8 h-8 sm:w-12 sm:h-12 opacity-55 md:w-14 md:h-14 lg:w-22 lg:h-22 mt-5",
    },
    {
        id: 3,
        Component: Radar,
        className:
            "w-15 h-15 sm:w-22 sm:h-22 md:w-28 md:h-28 lg:w-40 lg:h-40 mt-10",
    },
    {
        id: 4,
        Component: Chart,
        className:
            "w-8 h-8 sm:w-12 sm:h-12 opacity-55 md:w-14 md:h-14 lg:w-22 lg:h-22 mt-5",
    },
    {
        id: 5,
        Component: Users,
        className: "w-5 h-5 sm:w-8 sm:h-8 opacity-35 md:w-9 md:h-9 lg:w-14 lg:h-14",
    },
];
export default function Hero() {
    // Animation variants
    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 2, filter: "blur(24px)" },
        visible: (delay: number) => ({
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                delay,
                duration: 0.6,
                ease: "easeOut",

                stiffness: 150,
            },
        }),
    };

    // delays so: outer → inner → center
    const delayOrder = [0, 2, 4, 2, 0];
    return (
        <section className="relative flex flex-col items-center justify-center overflow-hidden mt-16">
            <div className="relative mt-10 mb-16 flex w-full flex-col justify-between sm:mb-24 md:mb-32 lg:mb-42">
                {/* icons */}

                <div className="flex w-full justify-between self-end px-4 lg:px-24">
                    {icons.map((icon, i) => {
                        const Icon = icon.Component;
                        const delay = delayOrder[i] * 0.3;

                        return (
                            <motion.div
                                key={icon.id}
                                custom={delay}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <Icon
                                    primaryColor="var(--royal-green)"
                                    strokeWidth={1.5}
                                    className={icon.className}
                                />
                            </motion.div>
                        );
                    })}
                </div>
                {/* curved line */}
                <svg
                    className="absolute -bottom-6"
                    width="100%"
                    viewBox="0 0 1441 148"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0.203156 0.454102C0.203156 0.454102 323.203 146.954 720.203 146.954C1117.2 146.954 1440.2 0.454102 1440.2 0.454102"
                        stroke="var(--royal-green)"
                        strokeWidth={2}
                        strokeOpacity="0.1"
                    />
                </svg>
            </div>
            {/* blue glow  */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: -20 }}
                transition={{
                    duration: 3,
                    ease: "easeInOut",
                }}
                className="absolute bottom-0 z-5 h-1/4 w-10/12 rounded-full bg-[#4EEBFF]/50 blur-[120px]"
            ></motion.div>

            {/* hero title  */}
            <div className="text-center">
                <BlurRevealText
                    className="text-center sm:text-xl md:text-3xl lg:text-4xl/14"
                    text="مدیریت مجموعه در هر لحظه و هر زمان"
                ></BlurRevealText>
                <BlurRevealText
                    className="text-center sm:text-xl md:text-3xl lg:text-4xl/14"
                    text="به صورت زنده"
                ></BlurRevealText>
            </div>
            {/* <motion.h1
              initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.6, delay: 1, ease: "easeInOut" }}
              className="text-center sm:text-xl md:text-3xl lg:text-4xl/14"
            >
              مدیریت مجموعه در هر لحظه و هر زمان <br />
              به صورت{" "}
              <span className="text-grad bg-gradient-to-b from-[#94D9E2] to-[#06434C] bg-clip-text text-transparent">
                زنده
              </span>
            </motion.h1> */}
            {/* arc  */}
            <svg
                className="z-20"
                width="100%"
                viewBox="0 0 1441 319"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M720.5 147.276C323.5 147.276 0.5 0.775879 0.5 0.775879V317.776H1440.5V0.775879C1440.5 0.775879 1117.5 147.276 720.5 147.276Z"
                    fill="white"
                    stroke="#0F2C30"
                    strokeOpacity="0.1"
                />
            </svg>
        </section>
    )
}
