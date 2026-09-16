'use client'

import React from 'react'

//components
import { Section, SectionHeader, SectionSubtitle, SectionTitle } from '@/components/global/marketingLayout/MarketingSection'
import { GradientSpan } from '../GradientSpan'

//SVGs
import { Building2Icon, ChartColumn, Palette, QrCode } from 'lucide-react'

//hooks
import { useIsMobile } from '@/hooks/useIsMobile'

//libraries
import { motion, Variants } from 'motion/react'
import { useTranslations } from 'next-intl'

//types
type Step = {
    stepNum: string;
    icon: React.JSX.Element;
    title: any;
    subTitle: any;
}

// each step scales up from 0, staggered
const stepVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
        scale: 1,
        opacity: 1,
        transition: { delay: i * 0.8, type: 'spring', stiffness: 150, damping: 18 },
    }),
};

// each line segment expands from the step it starts at, right after that step appears
const lineVariants = {
    hidden: { scaleX: 0 },
    visible: (i: number) => ({
        scaleX: 1,
        transition: { delay: i * 0.6 + 0.4, duration: 0.8, ease: 'easeInOut' },
    }),
};

export default function StepsSection({ locale }: { locale: string }) {
    const t = useTranslations("landing.stepsSection");

    const steps = [
        {
            stepNum: t("steps.0.stepNum"),
            icon: <Building2Icon className="w-5 md:w-6 lg:w-7 xl:w-8 h-5 md:h-6 lg:h-7 xl:h-8" />,
            title: t("steps.0.title"),
            subTitle: t("steps.0.subTitle"),
        },
        {
            stepNum: t("steps.1.stepNum"),
            icon: <Palette className="w-5 md:w-6 lg:w-7 xl:w-8 h-5 md:h-6 lg:h-7 xl:h-8" />,
            title: t("steps.1.title"),
            subTitle: t("steps.1.subTitle"),
        },
        {
            stepNum: t("steps.2.stepNum"),
            icon: <QrCode className="w-5 md:w-6 lg:w-7 xl:w-8 h-5 md:w-6 lg:w-7 xl:h-8" />,
            title: t("steps.2.title"),
            subTitle: t("steps.2.subTitle"),
        },
        {
            stepNum: t("steps.3.stepNum"),
            icon: <ChartColumn className="w-5 md:w-6 lg:w-7 xl:w-8 h-5 md:h-6 lg:h-7 xl:w-8" />,
            title: t("steps.3.title"),
            subTitle: t("steps.3.subTitle"),
        },
    ];
    return (
        <Section className='flex w-full'>
            <SectionHeader className='text-center justify-center items-center max-w-full w-full'>
                <SectionTitle className='font-bold text-4xl md:text-5xl lg:text-6xl! leading-12 md:leading-19 text-center'>{t("title.0")}<br className="hidden lg:block" />
                    <GradientSpan>{t("title.1")}</GradientSpan>
                </SectionTitle>
                <SectionSubtitle className='text-center text-teal-950/60 text-sm md:text-xl! max-w-full! w-full'>
                    {t("subtitle")}
                </SectionSubtitle>
                <div className='relative flex justify-between items-center w-full pt-8 md:pt-24 gap-6'>
                    <Steps locale={locale} steps={steps}></Steps>
                </div>
            </SectionHeader>
        </Section>
    )

}
function Steps({ steps, locale }: { steps: Step[], locale: string }) {
    const isMobile = useIsMobile()

    const segments = steps.length - 1;

    return (
        <div className="relative flex flex-col md:flex-row justify-center md:justify-between md:items-center w-full gap-8 md:gap-6">
            {/* progress line container */}
            <div className="absolute left-28 right-28 md:top-8 xl:top-12 -translate-y-1/2 -z-5 h-0 hidden md:flex">
                {Array.from({ length: segments }).map((_, i) => {
                    // i is the segment's position from the left (0 = leftmost)
                    // but the rightmost segment should animate first (delayIndex 0)
                    const delayIndex = segments - 1 - i;

                    return (
                        <motion.div
                            key={i}
                            custom={delayIndex}
                            variants={lineVariants as Variants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="absolute top-0 h-0 border-t-2 border-sad-blue origin-left rtl:origin-right"
                            style={{
                                left: locale === 'en' ? undefined : `${(i * 100) / segments}%`,
                                right: locale === 'en' ? `${(i * 100) / segments}%` : undefined,
                                width: `${100 / segments}%`,
                            }}
                        />
                    );
                })}
            </div>
            {/* steps */}
            {steps.map((step, i) =>
                isMobile ? (
                    <div key={step.stepNum}>
                        <Step
                            stepNum={step.stepNum}
                            icon={step.icon}
                            title={step.title}
                            subTitle={step.subTitle}
                        />
                    </div>
                ) : (
                    <motion.div
                        key={step.stepNum}
                        custom={i}
                        variants={stepVariants as Variants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <Step
                            stepNum={step.stepNum}
                            icon={step.icon}
                            title={step.title}
                            subTitle={step.subTitle}
                        />
                    </motion.div>
                )
            )}
        </div>
    );
}

function Step({ title, subTitle, icon, stepNum }: { title: string, subTitle: string, icon: React.ReactNode, stepNum: string }) {
    return <div className='group text-soft-blue flex flex-col items-start md:justify-center md:items-center gap-2 md:gap-4 w-full'>
        <div className='flex md:hidden items-center gap-4'>
            <div className='relative border-2 border-sad-blue bg-soft-blue text-royal-green rounded-md p-3 flex items-center justify-center'>
                {icon}</div>
            <p className='text-royal-green font-semibold text-base'>{title}</p>
        </div>
        <div className='hidden md:flex relative border-2 border-sad-blue bg-soft-blue text-royal-green rounded-md p-4 lg:p-6 xl:p-8 items-center justify-center group-hover:scale-105 group-hover:border-royal-green group-hover:-translate-y-3 transition-all duration-300 group-hover:shadow-xl'>
            <div className='scale-pro absolute top-0 -translate-y-1/2 w-6 py-0.5 lg:w-9 lg:py-1.5 text-xs lg:text-sm rounded-full bg-soft-blue text-royal-green border-2 border-sad-blue group-hover:bg-royal-green group-hover:border-royal-green group-hover:text-soft-blue transition-all duration-300'>{stepNum}</div>
            {icon}</div>
        <p className='hidden md:flex text-royal-green font-semibold text-sm md:text-base xl:text-lg'>{title}</p>
        <p className='text-teal-950/60 text-sm md:text-xs lg:text-sm text-start leading-6 ltr:pl-16 rtl:pr-16 md:rtl:pr-0 md:ltr:pl-0 md:text-center'>{subTitle}</p>
    </div>
}
