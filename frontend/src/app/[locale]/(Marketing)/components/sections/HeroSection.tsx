'use client'

import React, { useEffect, useState, useRef } from 'react'

//components
import { Section, SectionHeader, SectionSubtitle, SectionTitle } from '@/components/global/marketingLayout/MarketingSection'
import { GradientSpan } from '../GradientSpan'
import { Button } from '@/components/ui/button'
import { DashboardMockup, LiveManagementPanelMockup } from '@/components/global/Mockup/DashboardMockup'
import { IPhoneMockup } from '../IphoneMockup'
import { CategoryButton, MenuItemCard } from '../marketingBento/MenuBento'

//libraries
import { motion, useInView } from 'motion/react'
import { useTranslations } from 'next-intl';

//SVGs
import { ConciergeBell, Pizza, Beef, Menu, Hamburger, CupSoda, Search } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const categories = [
    { icon: Hamburger, label: "پاستا", active: false },
    { icon: Pizza, label: "پیتزا", active: true },
    { icon: Beef, label: "استیک", active: false },
    { icon: Hamburger, label: "برگر", active: false },
    { icon: CupSoda, label: "نوشیدنی", active: false },
];

const menuItems = [
    {
        id: "item-2",
        imageSrc: "/images/menu-mockup/pizza-mockup-2.webp",
        blurredUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA+ElEQVR4AQzMMU6DUACA4b+vQK3Aa7FUS2wcjImTk4vhBBrj4mTc3DyIXsGlMSZewFO466CLieKCNVHUlNIHBZ7dv3zi8vRQX5zs69HZgb4+DvXV0a4+39vW4UZPe05Ti0aRMVC/DJMxa/OcwFpmZxCw6a/QsQyEU0zoxF9YfxU938bwbGTLIvS7rHckAqWRqx4ikJSqIokVOptgm228fh9RFTMaLRPXMZGmYKudIoFmbdBIU8Snyim0xnBNLEfid5u4tqAe2oynGSIvFa8LOf1OQf1gukuUVslDHDGfLYasLLmPYkaPEbcvMTdPH9w9v5O8RdRVxT8AAAD//0MxQp0AAAAGSURBVAMAn35iQCw5l3MAAAAASUVORK5CYII=',
        imageAlt: "pizza-mockup-2",
        name: 'پیتزا پپرونی',
        quantity: 2
    },
    {
        id: "item-3",
        imageSrc: "/images/menu-mockup/pizza-mockup-3.webp",
        blurredUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABFElEQVR4AQAIAff+AjA2QP87Ojr/Zk45/4xnQv+BZEL/Wkw8/zY3O/8oLjj/AhEG/ABmMwoAcksfAFAxIABHKxcAbk0UAGM/EAAWEgwAAiQM9wAmFAQA2fTuAOgN+gD/CQEA/+TxAEQdBgA4JQ8AAi4pGADbEQYA0fjsAAnf6wAcERkA+Q8LAAQVGwA8Jg8AAvr19gAd9/4AVChJABUfKgDw5eIA4O/nAOvt4gAJDw8AAsLJ2QAVAP4A7eriAPr89wAG//kAOggRABf8BQDQ2+0AAsvj9gC31+kA+/fyAPne3wD/AQMA9Q0HAM7xBwDC1O4AAvkDCwCRteAAk6TJALrU4ADI4uoAp8bqAJTA6ADl7vUAAAAA//9wsbX4AAAABklEQVQDADd7ZvF6JyJsAAAAAElFTkSuQmCC',
        imageAlt: "pizza-mockup-3",
        name: 'پیتزا مارگاریتا',
        quantity: 0
    },
    {
        id: "item-4",
        imageSrc: "/images/menu-mockup/pizza-mockup-4.webp",
        blurredUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA/UlEQVR4AQSAsUoCYRzAf/7vPK+TPLHUwBAztYi2oKAxqsHXaGsMgoZqiLDcegNfIXqMwKVB0CGCuDKzlCvvOwzvC7m8utGNRlO3bk/0w0Vd358d6Nb5kW427/Tx6bWWbMphx+ixZfYp5y2KlRw16VGJPfHz/Yps5g3caEByo4ReqfBnaqY5k+qcT81ViDXxYL3Kl62YOTOMeJJ0rogaepQTI8RkysxXZH4j4hIgrmDZBk62wEIqhSi7QNDpMPXHWKGBjmnC4Qfh5wgvtJFgfo1EoYbXfUM9ewSPbcy+YiguL1EJGUxivC/VGS/vM8rs4Wd2aZvbdNOHOIur/AMAAP//aJqHxgAAAAZJREFUAwDT7l+dkmIu0QAAAABJRU5ErkJggg==',
        imageAlt: "pizza-mockup-4",
        name: 'پیتزا پپرونی',
        quantity: 1
    },
    {
        id: "item-1",
        imageSrc: "/images/menu-mockup/pizza-mockup-1.webp",
        blurredUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAMCAYAAABfnvydAAABXklEQVR4AQSAP08TUQDAf329vnJXrtc/dxerBanagHXB1UUTJzYnF2PiZ3H2a+jq5OhOQmAAQoBQ0pI2pbS89vro/yuPiH/fS+bXJ9/8/lIz+z9q5v+31+bP3hvz9+uuOfr5wYi7yIJxDmv4yPlFTJ8qWW8TGVQ5b2QRUVzEiVf0owVe4OOuFvT1mJQrKToWopZ6pO5MONgYcal76Gad9GLK7XDASEWIB+mzlw35eC/xlxPcSonmuzWuL8+4Ob5G9PqKeRCS2qmCH6L0BPtkQmXlEvh5hJWx6QaCw3VFY11ylBU0nyVozRdYxQIily+gWhGFjmRXzUgONPfOHB0ronYb4UvYXkrCxpiEVnzOvGTnVPDK8ShvhQhpz0mZJeXtCl2ZJ+napGczXhQDpoMlYqg63Okpq6Th7fsNRu0W+dwaWsY8jHuIzGaZ2Opw063j+Am8ksfzrTRu4oqRPeMJAAD//6yeufwAAAAGSURBVAMAwoeQ2pkb8TYAAAAASUVORK5CYII=',
        imageAlt: "pizza-mockup-1",
        name: 'پیتزا مارگاریتا',
        quantity: 0
    },
];

const defaultTableDummyData = [
    // Batch 1
    {
        id: 1,
        code: "A1B2C3",
        active_session: {
            code: "S1X2Y3",
            started_at: new Date(Date.now() - 18 * 60_000).toISOString(),
            expires_at: new Date(Date.now() + 42 * 60_000).toISOString(),
            is_active: true,
        },
        active_call: {
            resolved: false,
            created_at: new Date(Date.now() - 15_000).toISOString(),
            expires_at: new Date(Date.now() + 105_000).toISOString(),
        },
        name: "میز ۱",
        seats: 4,
        location_description: "Near window",
        is_active: true,
        is_occupied: true,
        is_reserved: false,
        is_requesting_assistance: true,
    },
    {
        id: 2,
        code: "D4E5F6",
        active_session: {
            code: "T7U8V9",
            started_at: new Date(Date.now() - 7 * 60_000).toISOString(),
            expires_at: new Date(Date.now() + 53 * 60_000).toISOString(),
            is_active: true,
        },
        name: "میز ۲",
        seats: 2,
        is_active: true,
        is_occupied: true,
        is_reserved: false,
    },
    {
        id: 3,
        code: "G7H8I9",
        active_session: {
            code: "X1Y2Z3",
            started_at: new Date(Date.now() - 31 * 60_000).toISOString(),
            expires_at: new Date(Date.now() + 29 * 60_000).toISOString(),
            is_active: true,
        },
        active_call: {
            resolved: false,
            created_at: new Date(Date.now() - 72_000).toISOString(),
            expires_at: new Date(Date.now() + 48_000).toISOString(),
        },
        name: "میز ۳",
        seats: 6,
        location_description: "Center hall",
        is_active: true,
        is_occupied: true,
        is_reserved: false,
        is_requesting_assistance: true,
    },
    {
        id: 4,
        code: "J1K2L3",
        active_session: {
            code: "X1Y2Z3",
            started_at: new Date(Date.now() - 49 * 60_000).toISOString(),
            expires_at: new Date(Date.now() + 11 * 60_000).toISOString(),
            is_active: true,
        },
        name: "میز ۴",
        seats: 4,
        location_description: "Patio",
        is_active: true,
        is_occupied: true,
        is_reserved: false,
        is_requesting_assistance: false,
    },

    // Batch 2
    {
        id: 6,
        code: "P7Q8R9",
        active_session: {
            code: "L1M2N3",
            started_at: new Date(Date.now() - 12 * 60_000).toISOString(),
            expires_at: new Date(Date.now() + 48 * 60_000).toISOString(),
            is_active: true,
        },
        active_call: {
            resolved: false,
            created_at: new Date(Date.now() - 97_000).toISOString(),
            expires_at: new Date(Date.now() + 23_000).toISOString(),
        },
        name: "میز ۶",
        seats: 4,
        location_description: "Balcony",
        is_active: true,
        is_occupied: true,
        is_reserved: false,
        is_requesting_assistance: true,
    },
    {
        id: 7,
        code: "S1T2U3",
        active_session: {
            code: "O4P5Q6",
            started_at: new Date(Date.now() - 39 * 60_000).toISOString(),
            expires_at: new Date(Date.now() + 21 * 60_000).toISOString(),
            is_active: true,
        },
        name: "میز ۷",
        seats: 2,
        is_active: true,
        is_occupied: true,
        is_reserved: false,
    },
    {
        id: 8,
        code: "V4W5X6",
        active_session: {
            code: "R7S8T9",
            started_at: new Date(Date.now() - 55 * 60_000).toISOString(),
            expires_at: new Date(Date.now() + 5 * 60_000).toISOString(),
            is_active: true,
        },
        active_call: {
            resolved: false,
            created_at: new Date(Date.now() - 38_000).toISOString(),
            expires_at: new Date(Date.now() + 82_000).toISOString(),
        },
        name: "میز ۸",
        seats: 6,
        location_description: "Main hall",
        is_active: true,
        is_occupied: true,
        is_reserved: false,
        is_requesting_assistance: true,
    },
    {
        id: 9,
        code: "Y7Z8A9",
        active_session: {
            code: "R7S8T9",
            started_at: new Date(Date.now() - 24 * 60_000).toISOString(),
            expires_at: new Date(Date.now() + 36 * 60_000).toISOString(),
            is_active: true,
        },
        name: "میز ۹",
        seats: 4,
        location_description: "Corner",
        is_active: true,
        is_occupied: true,
        is_reserved: false,
        is_requesting_assistance: false,
    },
];


export default function HeroSection() {
    const [activeCall, setActiveCall] = useState(false)

    const t = useTranslations('Landing');

    const ref = useRef<HTMLDivElement>(null);

    // Deactivate active call after 2 minutes
    useEffect(() => {
        if (!activeCall) return;

        const timeout = setTimeout(() => {
            setActiveCall(false);
        }, 120000);

        return () => clearTimeout(timeout);
    }, [activeCall]);

    // Resume live management counters only when mockup is in viewport
    const isInView = useInView(ref, {
        once: false,
        amount: 0.2,
    });

    return (
        <Section className='relative flex flex-col lg:flex-row overflow-hidden gap-16 md:gap-12 h-200 sm:h-240 md:h-270 lg:h-screen'>
            <SectionHeader className='w-full max-w-full flex-1 items-center md:items-start'>
                <SectionTitle className='flex flex-col items-center leading-13! xl:leading-relaxed! text-4xl md:text-4xl md:items-start'>
                    <p>{t('title')}</p>
                    <div><GradientSpan>هوشمند</GradientSpan> تر از همیشه </div>
                    <div><GradientSpan>+</GradientSpan> موتور منو ساز</div>
                </SectionTitle>
                <SectionSubtitle className='leading-relaxed text-teal-950/80 text-center max-w-sm md:max-w-md md:text-right'>
                    سیستم یکپارچه مدیریت رستوران و کافه؛ از ساخت منوی دیجیتال تا مدیریت لحظه‌ای کسب‌وکار، همه در یک پلتفرم.
                </SectionSubtitle>
                <div className='flex gap-4 xl:mt-4'>
                    <Button asChild className='group lg:h-11 lg:px-8 bg-royal-green hover:scale-105 border-2 border-royal-green rounded-full text-white hover:bg-royal-green/90 transition-all duration-300'>
                        <Link href={'/builder'}>
                            <p className='group-hover:scale-95 transition-all duration-300 scale-pro'>شروع رایگان</p>
                        </Link>
                    </Button>
                    <Button asChild className='group lg:h-11 lg:px-8 bg-soft-blue hover:scale-105 border lg:border-2 border-sad-blue rounded-full text-royal-green hover:border-royal-green/60 transition-all duration-300'>
                        <Link href={'/builder'}>
                            <p className='group-hover:scale-95 transition-all duration-300 scale-pro'>مشاهده دمو</p>
                        </Link>
                    </Button>
                </div>
            </SectionHeader>
            <div className='group relative w-7/12 sm:w-6/12 lg:w-6/12 xl:w-5/12 h-full'>
                <motion.div ref={ref} className='absolute scale-40 sm:scale-55 md:scale-70 origin-top-right lg:scale-70 xl:scale-75 top-0 right-0'>
                    <DashboardMockup>
                        <LiveManagementPanelMockup dummyData={defaultTableDummyData} activeCall={activeCall} isInView={isInView}></LiveManagementPanelMockup>
                    </DashboardMockup>
                </motion.div>
                <IPhoneMockup className='select-none top-4/12 sm:top-4/12 md:top-4/12 lg:top-5/12 origin-top translate-x-1/2 absolute w-80 scale-45 sm:scale-60 md:scale-80 lg:scale-70 xl:scale-80' screenClassName='rounded-[36px]'>
                    <IPhoneMockup.Screen className='hide-scrollbar overflow-hidden'>   <div id="menu-mockup" className="px-2">
                        {/* ========== Header badges ========== */}
                        <div className="h-4/12 pt-10 flex justify-between items-center">
                            <div
                                onClick={() => setActiveCall(true)} // activate table's waiter call
                                className={cn("flex items-center gap-3 px-4 py-2 font-medium border w-max text-xs rounded-full transition-all duration-300 group-hover:border-royal-green/40 group-hover:scale-110 cursor-pointer scale-pro", activeCall ? 'bg-royal-green border-royal-green text-soft-blue' : 'border-sad-blue bg-soft-blue text-royal-green')}
                            >
                                <ConciergeBell className="w-4.5 h-4.5" />
                                <p>سالن دار</p>
                            </div>

                            <div
                                className="
                    p-2 bg-soft-blue text-royal-green border border-sad-blue rounded-full
                    transition-colors duration-300
                    
                  "
                            >
                                <Menu className="w-4.5 h-4.5" />
                            </div>
                        </div>

                        <div
                        >
                            <div
                                className="
                    px-4 py-2 bg-soft-blue text-royal-green mt-2 rounded-full font-normal text-xs
                    border border-sad-blue w-full
                    transition-colors duration-300
                     flex gap-2
                  "
                            >
                                <Search className="w-4 h-4 opacity-60"></Search>
                                <p className='opacity-60'>جستوجو...</p>
                            </div>
                        </div>

                        {/* ========== Categories ========== */}
                        <div className="flex gap-2 items-center py-2">
                            {categories.map((cat) => (
                                <CategoryButton
                                    className='bg-soft-blue! text-royal-green! border-sad-blue!'
                                    activeClassName='bg-royal-green! text-white! border-royal-green!'
                                    key={cat.label}
                                    icon={cat.icon}
                                    label={cat.label}
                                    active={cat.active}
                                />
                            ))}
                        </div>

                        {/* ========== Menu items ========== */}
                        <div className="grid grid-cols-2 gap-2">
                            {menuItems.map((item) => (
                                <MenuItemCard
                                    isHovered={false}
                                    key={item.id}
                                    imageSrc={item.imageSrc}
                                    blurredUrl={item.blurredUrl}
                                    imageAlt={item.imageAlt}
                                    quantity={item.quantity}
                                    name={item.name}
                                />
                            ))}
                        </div>
                    </div></IPhoneMockup.Screen>
                </IPhoneMockup>
            </div>
            <div className="pointer-events-none absolute bottom-0 lg:-bottom-35 left-0 z-5 h-[150px] sm:h-[240px] lg:h-[350px] w-full bg-gradient-to-t from-white from-45% via-white/95 via-55% to-transparent" />
        </Section >
    )
}
