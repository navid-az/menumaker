'use client'

import React, { useRef } from 'react'

//components
import { Section, SectionHeader, SectionTitle, SectionSubtitle } from '@/components/global/marketingLayout/MarketingSection'
import FeatureNameCapsule from '../FeatureNameCapsule'
import { GradientSpan } from '../GradientSpan'
import { DashboardMockup, LiveManagementPanelMockup } from '@/components/global/Mockup/DashboardMockup'
import LiveCard from '@/app/[locale]/dashboard/components/LiveCard'

//hooks
import { useDeferredNow } from '@/app/hooks/useDeferredNow'

//libraries
import { motion, useInView, type Transition } from "motion/react"

//SVGs
import { Radio } from 'lucide-react'

//types
import { TableType } from '@/app/[locale]/dashboard/[business_slug]/[branch_slug]/liveManagement/all/page'
import { useTranslations } from 'next-intl'

export default function LiveManagementSection({ locale }: { locale: string }) {

    const now = useDeferredNow()
    const end = now !== null ? now + 60_000 : 0

    const tableDummyData: TableType = {
        id: 2,
        code: "D4E5F6",
        active_session: {
            code: "T7U8V9",
            started_at: now == null ? '0' : new Date(now).toISOString(),
            expires_at: now == null ? '0' : new Date(end).toISOString(),
            is_active: true,
        },
        name: "Table 2",
        seats: 2,
        is_active: true,
        is_occupied: true,
        is_reserved: false,
    }

    const wrapperRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(wrapperRef, { once: false, amount: 0.1 });
    const transition: Transition = { duration: 0.7, delay: 1.5, ease: 'easeOut' }

    const t = useTranslations('landing.liveManagementSection')

    return (
        <Section ref={wrapperRef} className="bg-royal-green relative overflow-hidden h-150 md:h-170 lg:h-190 xl:h-170 w-full">
            <SectionHeader>
                <FeatureNameCapsule
                    className="bg-lime-200 w-max border-lime-700/40 text-lime-900"
                    name={t('capsule')}
                    svg={<Radio className="w-4.5 h-4.5" />}
                ></FeatureNameCapsule>
                <SectionTitle className="text-soft-blue">
                    {t('title.0')} <br />
                    <GradientSpan variant="light">{t('title.1')}</GradientSpan>
                </SectionTitle>
                <SectionSubtitle>{t('subtitle')}</SectionSubtitle>

            </SectionHeader>
            <div className='absolute scale-50 md:scale-70 lg:scale-85 xl:scale-100 left-0 top-24 md:top-42 lg:top-62 xl:top-36 -translate-x-1/12 rtl:-translate-x-5/12 md:translate-x-2/12 rtl:md:-translate-x-4/12 lg:translate-x-10/12 rtl:lg:-translate-x-5/12 xl:translate-x-9/12 rtl:xl:-translate-x-4/12'>
                <div className='w-max h-max'>
                    <motion.div
                        animate={{
                            filter: isInView
                                ? "blur(6px)"
                                : "blur(0px)",
                            scale: isInView
                                ? 0.98
                                : 1,
                        }}
                        transition={transition}
                    >
                        <DashboardMockup isCompact>
                            <LiveManagementPanelMockup isInView={isInView} isCompact></LiveManagementPanelMockup>
                        </DashboardMockup>
                    </motion.div>
                    <motion.div
                        initial={{ left: locale === 'en' ? 275 : undefined, right: locale === 'en' ? undefined : 274, top: 101 }} //Initial position of the target LiveCard
                        animate={isInView ? { scale: 1.2 } : { scale: 1 }}
                        transition={transition}
                        className="absolute z-20"
                    >
                        <LiveCard
                            isMockup
                            table={tableDummyData}
                            businessSlug="mockup-business"
                            branchSlug="mockup-branch-1"
                        ></LiveCard>
                    </motion.div>
                </div>

            </div>
        </Section >
    )
}
