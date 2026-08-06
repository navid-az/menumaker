import React from 'react'

//components
import { Section, SectionHeader, SectionSubtitle, SectionTitle } from '@/components/global/marketingLayout/MarketingSection'
import { GradientSpan } from '../GradientSpan'
import { Button } from '@/components/ui/button'
import { LiveManagementMockUp } from '@/components/global/Mockup/LiveManagementMockup'

export default function HeroSection() {
    return (
        <Section className='relative overflow-hidden h-200'>
            <SectionHeader>
                <SectionTitle className='xl:leading-20'>
                    <p>مدیریت کافه و رستوران </p>
                    <GradientSpan>هوشمند</GradientSpan> تر از همیشه  <br />
                    <GradientSpan>+</GradientSpan> موتور منو ساز
                </SectionTitle>
                <SectionSubtitle className='leading-relaxed text-teal-950/80'>
                    سیستم مدیریت هوشمند رستوران/کافه به صورت لحظه ای و با به کار گیری منو دیجیتال هوشمند.
                </SectionSubtitle>
                <div className='flex gap-4 xl:mt-4'>
                    <Button size={'lg'} className='bg-royal-green border-2 border-royal-green rounded-full text-white hover:bg-royal-green/90 transition-all duration-300'>شروع رایگان</Button>
                    <Button size={'lg'} className='bg-soft-blue border-2 border-sad-blue rounded-full text-royal-green hover:border-royal-green transition-all duration-300'>تماس با ما</Button>
                </div>
            </SectionHeader>
            <div className='absolute scale-55 md:scale-70 origin-top lg:scale-85 xl:scale-75 left-0 top-24 md:top-42 lg:top-62 xl:top-24 -translate-x-6/12 sm:-translate-x-5/12 md:-translate-x-4/12 lg:-translate-x-5/12 xl:-translate-x-5/12'>
                <LiveManagementMockUp></LiveManagementMockUp>
            </div>
            <div className="pointer-events-none absolute -bottom-2 left-0 z-50 h-[350px] w-full bg-gradient-to-t from-white from-45% via-white/95 via-55% to-transparent" />
        </Section >
    )
}
