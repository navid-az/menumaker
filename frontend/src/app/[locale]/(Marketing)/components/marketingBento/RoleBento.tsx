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
import { useTranslations } from "next-intl";

//types
import { _Translator } from "next-intl";


export default function RoleBento() {
    const [isHovered, setIsHovered] = useState(false);

    const t = useTranslations("landing.bentoFeaturesSection.bentos.3");

    return <Bento onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} colSpan={4} mobileRowSpan={1} rowSpan={2} className='group relative overflow-hidden'>
        <BentoHeader>
            <BentoTitle>{t("title")}</BentoTitle>
            <BentoDescription>
                {t("subtitle")}
            </BentoDescription>
            <BentoBody className='relative group'>
                <div className='flex justify-between gap-2 pt-12 md:pt-6 group-hover:scale-95 mx-auto absolute left-0 right-0 w-full md:w-11/12 group-hover:-translate-y-7 transition-all duration-300'>
                    <div className='flex flex-col w-full h-max'>
                        <div className='rounded-t-xl bg-zinc-50 border text-zinc-400 border-zinc-200 w-full h-max px-1.5 py-0 md:p-2 flex items-center font-normal justify-between'>
                            <div className='flex-1 justify-start text-xs md:text-sm font-medium items-center ps-2'> <p>{t('mockup.headers.0')}</p></div>
                            <div className='flex-1 justify-start text-xs md:text-sm font-medium items-center ps-2'>    <p>{t('mockup.headers.1')}</p></div>
                            <div className='flex-1 justify-start text-xs md:text-sm font-medium items-center ps-2'>  <p>{t('mockup.headers.2')}</p></div>
                            <div className='flex gap-2'>
                                <Button className='opacity-0 p-2 h-auto bg-transparent hover:bg-zinc-100 text-zinc-600'><Trash2 className='w-5 h-5'></Trash2></Button>
                                <Button className='opacity-0 p-2 h-auto bg-transparent hover:bg-zinc-100 text-zinc-600'><Trash2 className='w-5 h-5'></Trash2></Button>
                            </div>
                        </div>
                        <MockupTableRow t={t}>
                            <PermissionsList isHovered={isHovered}></PermissionsList>
                        </MockupTableRow>
                        <MockupTableRow t={t} isBlurred>
                            <div
                                className="px-3 py-2 blur-xs -mt-2 w-max border-2 rounded-full flex items-center gap-2"
                            >
                                <HandPlatter className="w-4 h-4"></HandPlatter>
                                <p className="text-xs font-medium">{t('mockup.users.0.role')}</p>
                            </div>
                        </MockupTableRow>
                        <MockupTableRow t={t} isBlurred />
                    </div>
                </div>
            </BentoBody>
        </BentoHeader>
    </Bento>

}

function MockupTableRow({ children, isBlurred = false, t }: { children?: React.ReactNode, isBlurred?: boolean, t: _Translator<Record<string, any>> }) {
    return <div className={cn('last-of-type:rounded-b-md border border-t-0 text-zinc-600 border-zinc-200 w-full h-max flex items-center font-normal justify-between')}>
        <div className={cn('flex-1 ps-3 py-2 md:py-4 justify-start text-xs md:text-sm font-light items-center', isBlurred && 'blur-xs')}><p>{t('mockup.users.0.name')}</p></div>
        <div className={cn('flex-1 ps-3 py-2 md:py-4 justify-start text-xs md:text-sm font-light items-center', isBlurred && 'blur-xs')}>  <p>{t('mockup.users.0.branch')}</p></div>
        <div className='relative ps-3 py-2 md:py-4 flex-1 justify-start text-sm font-light items-center'>
            {children}
        </div>
        <div className={cn('flex gap-2 px-2 md:px-2 py-2 md:py-4', isBlurred && 'blur-xs')}>
            <Button className='p-2 h-auto bg-transparent hover:bg-zinc-100 text-zinc-600'><Trash2 className='w-3.5 md:w-4 h-3.5 md:h-4'></Trash2></Button>
            <Button className='p-2 h-auto bg-transparent hover:bg-zinc-100 text-zinc-600'><EllipsisVertical className='w-3.5 md:w-4 h-3.5 md:h-4'></EllipsisVertical></Button>
        </div>
    </div>


}


function PermissionsList({ isHovered }: { isHovered: boolean }) {
    const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

    const t = useTranslations("landing.bentoFeaturesSection.bentos.3.mockup.roles")

    const roles = [
        { icon: HandPlatter, label: t('0'), colors: "border-orange-900 bg-orange-200 text-orange-900" },
        { icon: ChefHat, label: t('1'), colors: "border-yellow-900 bg-yellow-200 text-yellow-900" },
        { icon: Star, label: t('2'), colors: "border-blue-900 bg-blue-200 text-blue-900" },
        { icon: Building2, label: t('3'), colors: "border-emerald-900 bg-emerald-200 text-emerald-900" },
        { icon: ShoppingBag, label: t('4'), colors: "border-violet-900 bg-violet-200 text-violet-900" },
        { icon: Boxes, label: t('5'), colors: "border-rose-900 bg-rose-200 text-rose-900", strokeWidth: 1.4 },
    ];

    const [visible, setVisible] = useState(roles);

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

        <div className="absolute z-10 lft:left-0 rtl:right-0 -top-1.5 md:-top-0.5 flex flex-col gap-8 items-start">
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
                  px-2.5 md:px-3 py-1.5 md:py-2 w-max border md:border-2 rounded-full
                  flex items-center gap-2
                  ${role.colors}
                `}
                        >
                            <role.icon
                                className="w-3.5 md:w-4 h-3.5 md:h-4"
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