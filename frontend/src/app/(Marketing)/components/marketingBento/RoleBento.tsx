'use client'

import React, { useState, useEffect, useRef } from "react";

//components
import { Button } from "@/components/ui/button";
import { Bento, BentoHeader, BentoTitle, BentoDescription, BentoBody } from "../BentoBox"

//SVGs
import { ChefHat, HandPlatter, Star, ShoppingBag, Boxes, Building2, EllipsisVertical, Trash2 } from 'lucide-react'

//libraries
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'motion/react'


export default function RoleBento() {
    const [isHovered, setIsHovered] = useState(false);

    return <Bento onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} colSpan={4} rowSpan={2} className='group relative overflow-hidden'>
        <BentoHeader>
            <BentoTitle>مدیریت سطح دسترسی</BentoTitle>
            <BentoDescription>
                مدیریت اعضا با سطح دسترسی های مختلف و نقش های متفاوت
            </BentoDescription>
            <BentoBody className='relative group'>
                <div className='flex justify-between gap-2 pt-6 group-hover:scale-95 mx-auto absolute left-0 right-0 w-11/12  group-hover:-translate-y-7 transition-all duration-300'>
                    <div className='flex flex-col w-full'>
                        <div className='rounded-t-xl bg-zinc-50 border text-zinc-400 border-zinc-200 w-full h-max p-2 flex items-center font-normal justify-between'>
                            <div className='flex-1 justify-start text-sm font-medium items-center'> <p>نام کاربر</p></div>
                            <div className='flex-1 justify-start text-sm font-medium items-center'>    <p>شعبه</p></div>
                            <div className='flex-1 justify-start text-sm font-medium items-center'>  <p>سمت</p></div>
                            <div className='flex gap-2'>
                                <Button className='opacity-0 p-2 h-auto bg-transparent hover:bg-zinc-100 text-zinc-600'><Trash2 className='w-5 h-5'></Trash2></Button>
                                <Button className='opacity-0 p-2 h-auto bg-transparent hover:bg-zinc-100 text-zinc-600'><Trash2 className='w-5 h-5'></Trash2></Button>
                            </div>
                        </div>
                        <MockupTableRow>
                            <PermissionsList isHovered={isHovered}></PermissionsList>
                        </MockupTableRow>
                        <MockupTableRow isBlurred>
                            <div
                                className="px-3 py-2 blur-xs -mt-2 w-max border-2 rounded-full flex items-center gap-2"
                            >
                                <HandPlatter className="w-4 h-4"></HandPlatter>
                                <p className="text-xs font-medium">سالن دار</p>
                            </div>
                        </MockupTableRow>
                        <MockupTableRow isBlurred />
                    </div>
                </div>
            </BentoBody>
        </BentoHeader>
    </Bento>

}

function MockupTableRow({ children, isBlurred = false }: { children?: React.ReactNode, isBlurred?: boolean }) {
    return <div className={cn('last-of-type:rounded-b-md border border-t-0 text-zinc-600 border-zinc-200 w-full h-max flex items-center font-normal justify-between')}>
        <div className={cn('flex-1 px-2 py-4 justify-start text-sm font-light items-center', isBlurred && 'blur-xs')}><p>پارسا کاظمی</p></div>
        <div className={cn('flex-1 px-2 py-4 justify-start text-sm font-light items-center', isBlurred && 'blur-xs')}>  <p>شعبه تهران-نیاوران</p></div>
        <div className='relative px-2 py-4 flex-1 justify-start text-sm font-light items-center'>
            {children}
        </div>
        <div className='flex gap-2 px-4 py-2'>
            <Button className='p-2 h-auto bg-transparent hover:bg-zinc-100 text-zinc-600'><Trash2 className='w-5 h-5'></Trash2></Button>
            <Button className='p-2 h-auto bg-transparent hover:bg-zinc-100 text-zinc-600'><EllipsisVertical className='w-5 h-5'></EllipsisVertical></Button>
        </div>
    </div>


}

const roles = [
    { icon: HandPlatter, label: "سالن دار", colors: "border-orange-900 bg-orange-200 text-orange-900" },
    { icon: ChefHat, label: "آشپز", colors: "border-yellow-900 bg-yellow-200 text-yellow-900" },
    { icon: Star, label: "مدیر", colors: "border-blue-900 bg-blue-200 text-blue-900" },
    { icon: Building2, label: "مدیر شعبه", colors: "border-emerald-900 bg-emerald-200 text-emerald-900" },
    { icon: ShoppingBag, label: "پیک", colors: "border-violet-900 bg-violet-200 text-violet-900" },
    { icon: Boxes, label: "انباردار", colors: "border-rose-900 bg-rose-200 text-rose-900", strokeWidth: 1.4 },
];

function PermissionsList({ isHovered }: { isHovered: boolean }) {
    const [visible, setVisible] = useState(roles);
    const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

    const clearSequence = () => {
        timeouts.current.forEach(clearTimeout);
        timeouts.current = [];
    };

    const startSequence = () => {
        clearSequence();

        const HOLD = 500;   // how long each item stays in the target position
        const FLY = 350;   // duration of the upward exit
        const INTERVAL = HOLD + FLY;

        // Only schedule removals for every item EXCEPT the last one.
        // The final item will stay in the target position forever while hovering.
        roles.slice(0, -1).forEach((_, index) => {
            const t = setTimeout(() => {
                setVisible((prev) => prev.slice(1));
            }, index * INTERVAL);

            timeouts.current.push(t);
        });
    };

    useEffect(() => {
        if (isHovered) {
            startSequence();
        } else {
            clearSequence();
            setVisible(roles);
        }
        return clearSequence;
    }, [isHovered]);

    return (

        <div className="absolute z-10 right-0 -top-0.5 flex flex-col gap-8 items-start">
            <AnimatePresence mode="popLayout">
                {visible.map((role, index) => {
                    const isTop = index === 0;
                    const show = !isHovered || isTop;

                    return (
                        <motion.div
                            key={role.label}
                            layout
                            initial={{ opacity: 0, y: 30 }}
                            animate={{
                                opacity: show ? 1 : 0,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -70,
                                transition: { duration: 0.35, ease: "easeIn" },
                            }}
                            transition={{
                                layout: { duration: 0.35, ease: "easeOut" },
                                opacity: { duration: 0.3 },
                            }}
                            className={`
                  px-3 py-2 w-max border-2 rounded-full
                  flex items-center gap-2
                  ${role.colors}
                `}
                        >
                            <role.icon
                                className="w-4 h-4"
                                strokeWidth={role.strokeWidth ?? 2}
                            />
                            <p className="text-xs font-medium">{role.label}</p>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}