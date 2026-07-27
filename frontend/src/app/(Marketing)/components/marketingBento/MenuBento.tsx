
'use client'

import React, { useState } from 'react'

//components
import Image from 'next/image'
import {
    Bento,
    BentoBody,
    BentoDescription,
    BentoHeader,
    BentoTitle,
} from '../BentoBox'
import { IPhoneMockup } from '../IphoneMockup'


//SVGs
import { ConciergeBell, Minus, Pizza, Plus, Beef, Menu, Hamburger } from 'lucide-react'

//libraries
import { motion, type Transition } from 'motion/react'

//types
import { type LucideIcon } from 'lucide-react'

const radiusTransition = (toHover: boolean): Transition => ({
    duration: 0.35,
    ease: "easeOut" as const,
    delay: toHover ? 0.28 : 0.38, // on leave → wait for searchbar to collapse first
});

const fullRoundVariants = {
    rest: { borderRadius: "24px" },
    hover: { borderRadius: "8px" },
};

const cardRoundVariants = {
    rest: { borderRadius: "22px" },
    hover: { borderRadius: "8px" },
};

const imageRoundVariants = {
    rest: { borderRadius: "22px" },
    hover: { borderRadius: "8px" },
};

// Searchbar show / hide (pushes content down)
const searchContainerVariants = {
    rest: {
        height: 0,
        opacity: 0,
        marginTop: 0,
        transition: {
            duration: 0.3,
            ease: "easeIn" as const,
        },
    },
    hover: {
        height: "auto",
        opacity: 1,
        marginTop: 8, // gap-2
        transition: {
            duration: 0.3,
            ease: "easeOut" as const,
            delay: 0.4, // after radius animation finishes
        },
    },
};

type CategoryButtonProps = {
    icon: LucideIcon;
    label: string;
    active?: boolean;
    className?: string;
    isHovered?: boolean;
};

export function CategoryButton({
    icon: Icon,
    label,
    active = false,
    className = "",
    isHovered = false,
}: CategoryButtonProps) {
    return (
        <motion.div
            variants={fullRoundVariants}
            animate={isHovered ? "hover" : "rest"}
            transition={radiusTransition(isHovered)}
            className={`
        flex items-center gap-1.5 px-2.5 py-1.5
        font-normal border w-max text-xs translate-x-10
        transition-colors duration-300
        ${active
                    ? `bg-zinc-800 border-zinc-200 text-white
               group-hover:bg-orange-500 group-hover:border-orange-600 group-hover:text-white`
                    : `bg-zinc-50 border-zinc-200 text-zinc-600
               group-hover:bg-orange-100 group-hover:border-orange-400 group-hover:text-orange-800`
                }
        ${className}
      `}
        >
            <Icon className="w-4 h-4" />
            <p>{label}</p>
        </motion.div>
    );
}

type QuantityControlProps = {
    value?: number;
    className?: string;
    isHovered?: boolean;
};

export function QuantityControl({
    value,
    className = "",
    isHovered = false,
}: QuantityControlProps) {
    return (
        <motion.div
            variants={fullRoundVariants}
            animate={isHovered ? "hover" : "rest"}
            transition={radiusTransition(isHovered)}
            className={`
        flex flex-1 justify-between items-center gap-2.5
        h-max px-1 py-1 font-medium border
        border-zinc-200 bg-zinc-50 w-full text-sm text-zinc-600
        transition-colors duration-300
        group-hover:bg-orange-100 group-hover:border-orange-400 group-hover:text-orange-800
        ${className}
      `}
        >
            <motion.button
                type="button"
                variants={fullRoundVariants}
                animate={isHovered ? "hover" : "rest"}
                transition={radiusTransition(isHovered)}
                className="
          h-6 w-10 flex items-center justify-center
          bg-zinc-800 text-soft-blue
          transition-colors duration-300
          group-hover:bg-orange-500 group-hover:text-white
        "
            >
                <Plus className="w-5 h-5" />
            </motion.button>

            <p className="text-md font-medium pt-0.5">{value}</p>

            <motion.button
                type="button"
                variants={fullRoundVariants}
                animate={isHovered ? "hover" : "rest"}
                transition={radiusTransition(isHovered)}
                className="
          h-6 w-10 flex items-center justify-center
          bg-zinc-800 text-soft-blue
          transition-colors duration-300
          group-hover:bg-orange-500 group-hover:text-white
        "
            >
                <Minus className="w-5 h-5" />
            </motion.button>
        </motion.div>
    );
}

function CartBtn({
    className = "",
    isHovered = false, }) {
    return <motion.div
        variants={fullRoundVariants}
        animate={isHovered ? "hover" : "rest"}
        transition={radiusTransition(isHovered)}
        className={`
        flex flex-1 justify-between items-center gap-2.5
        h-max px-1 py-1 font-medium border
        border-zinc-200 bg-zinc-50 w-full text-sm text-zinc-600
        transition-colors duration-300
        group-hover:bg-orange-100 group-hover:border-orange-400 group-hover:text-orange-800
        ${className}
      `}
    >
        <div className='h-6 w-full flex items-center justify-center text-md font-medium'>
            <p>افزودن</p>

        </div>
    </motion.div>
}

type MenuItemCardProps = {
    imageSrc?: string;
    imageAlt?: string;
    name?: string,
    quantity: number;
    isHovered?: boolean;
};

export function MenuItemCard({
    imageSrc,
    imageAlt = "menu item",
    name = '',
    quantity,
    isHovered = false,
}: MenuItemCardProps) {
    return (
        <motion.div
            variants={cardRoundVariants}
            animate={isHovered ? "hover" : "rest"}
            transition={radiusTransition(isHovered)}
            className="bg-orange-200 border relative border-orange-950 h-48 overflow-hidden"
        >
            <div className="h-full w-full relative">
                {imageSrc ? (
                    <motion.div
                        variants={imageRoundVariants}
                        animate={isHovered ? "hover" : "rest"}
                        transition={radiusTransition(isHovered)}
                        className="absolute inset-0 overflow-hidden"
                    >
                        <Image
                            className="object-cover"
                            alt={imageAlt}
                            fill
                            src={imageSrc}
                        />
                    </motion.div>
                ) : (
                    <div className="h-full w-full flex items-center justify-center text-orange-950/60">
                        عکس
                    </div>
                )}
            </div>

            <div className="absolute bottom-0 left-0 p-1 w-full backdrop-blur-[1px] flex justify-between items-center">
                <div className='flex flex-col w-full text-white gap-2'>
                    <p>{name}</p>
                    {quantity === 0 ? <CartBtn isHovered={isHovered}></CartBtn> : <QuantityControl value={quantity} isHovered={isHovered} />}

                </div>
            </div>
        </motion.div>
    );
}

const categories = [
    { icon: Hamburger, label: "پاستا", active: false },
    { icon: Pizza, label: "پیتزا", active: true },
    { icon: Beef, label: "استیک", active: false },
    { icon: Hamburger, label: "برگر", active: false },
];

const menuItems = [
    {
        id: "item-1",
        imageSrc: "/images/menu-mockup/pizza-mockup-4.webp",
        imageAlt: "pizza-mockup-4",
        name: 'پیتزا پپرونی',
        quantity: 2
    },
    {
        id: "item-2",
        imageSrc: "/images/menu-mockup/pizza-mockup-1.webp",
        imageAlt: "pizza-mockup-1",
        name: 'پیتزا پپرونی',
        quantity: 0
    },
    {
        id: "item-3",
        imageSrc: "/images/menu-mockup/pizza-mockup-3.webp",
        imageAlt: "pizza-mockup-3",
        name: 'پیتزا مارگاریتا',
        quantity: 1
    },
    {
        id: "item-4",
        imageSrc: "/images/menu-mockup/pizza-mockup-2.webp",
        imageAlt: "pizza-mockup-2",
        name: '',
        quantity: 0
    },
    {
        id: "item-5",
        imageSrc: "/images/menu-mockup/pizza-mockup-1.webp",
        imageAlt: "pizza-mockup-1",
        name: '',
        quantity: 1
    },
    {
        id: "item-6",
        imageSrc: "/images/menu-mockup/pizza-mockup-1.webp",
        imageAlt: "pizza-mockup-1",
        name: '',
        quantity: 0
    },
];

export default function MenuBento() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Bento colSpan={2} rowSpan={6} className="group overflow-hidden relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <BentoHeader>
                <BentoTitle>منوساز هوشمند</BentoTitle>
                <BentoDescription>
                    شخصی سازی منو با توجه به هویت برند شما
                </BentoDescription>
            </BentoHeader>

            <BentoBody
                className="flex justify-center"
            >
                <IPhoneMockup className="w-90 absolute -bottom-1/2 group-hover:-translate-y-20 transition-all group-hover:scale-90 duration-300">
                    <IPhoneMockup.Screen className="overflow-y-scroll overflow-hidden hide-scrollbar">
                        <div id="menu-mockup" className="px-2">
                            {/* ========== Header badges ========== */}
                            <div className="h-4/12 pt-10 flex justify-between items-center">
                                <motion.div
                                    variants={fullRoundVariants}
                                    animate={isHovered ? "hover" : "rest"}
                                    transition={radiusTransition(isHovered)}
                                    className="
                    flex items-center gap-3 px-4 py-2 font-medium border
                    border-zinc-200 bg-zinc-50 w-max text-xs text-zinc-600
                    transition-colors duration-300
                    group-hover:bg-orange-100 group-hover:border-orange-400 group-hover:text-orange-800
                  "
                                >
                                    <ConciergeBell className="w-4.5 h-4.5" />
                                    <p>سالن دار</p>
                                </motion.div>

                                <motion.div
                                    variants={fullRoundVariants}
                                    animate={isHovered ? "hover" : "rest"}
                                    transition={radiusTransition(isHovered)}
                                    className="
                    p-2 bg-zinc-50 text-zinc-600 border border-zinc-200
                    transition-colors duration-300
                    group-hover:bg-orange-100 group-hover:border-orange-400 group-hover:text-orange-800
                  "
                                >
                                    <Menu className="w-4.5 h-4.5" />
                                </motion.div>
                            </div>

                            {/* ========== Searchbar (initially hidden) ========== */}
                            <motion.div
                                variants={searchContainerVariants}
                                animate={isHovered ? "hover" : "rest"}
                                style={{ overflow: "hidden" }}
                            >
                                <motion.div
                                    variants={fullRoundVariants}
                                    animate={isHovered ? "hover" : "rest"}
                                    transition={radiusTransition(isHovered)}
                                    className="
                    px-4 py-2 bg-zinc-50 text-zinc-600 font-normal text-xs
                    border border-zinc-200 w-full
                    transition-colors duration-300
                    group-hover:bg-orange-100 group-hover:border-orange-400 group-hover:text-orange-800
                  "
                                >
                                    <p>جستوجو</p>
                                </motion.div>
                            </motion.div>

                            {/* ========== Categories ========== */}
                            <div className="flex gap-2 items-center py-2">
                                {categories.map((cat) => (
                                    <CategoryButton
                                        key={cat.label}
                                        icon={cat.icon}
                                        label={cat.label}
                                        active={cat.active}
                                        isHovered={isHovered}
                                    />
                                ))}
                            </div>

                            {/* ========== Menu items ========== */}
                            <div className="grid grid-cols-2 gap-2">
                                {menuItems.map((item) => (
                                    <MenuItemCard
                                        key={item.id}
                                        imageSrc={item.imageSrc}
                                        imageAlt={item.imageAlt}
                                        isHovered={isHovered}
                                        quantity={item.quantity}
                                        name={item.name}
                                    />
                                ))}
                            </div>
                        </div>
                    </IPhoneMockup.Screen>
                </IPhoneMockup>
            </BentoBody>
        </Bento>
    );
}