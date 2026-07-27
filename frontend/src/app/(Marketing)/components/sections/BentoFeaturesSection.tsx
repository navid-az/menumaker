import React from 'react'

//components
import { BentoBox, } from '../BentoBox'
import { GradientSpan } from '../GradientSpan'
import { Section, SectionHeader, SectionTitle, SectionSubtitle } from '@/components/global/marketingLayout/MarketingSection'
import TableBento from '../marketingBento/TableBento'
import BranchBento from '../marketingBento/BranchBento'
import RoleBento from '../marketingBento/RoleBento'
import MenuBento from '../marketingBento/MenuBento'



export default function BentoFeaturesSection() {

    return (
        <Section className='bg-soft-blue flex flex-col gap-6'>
            <SectionHeader>
                <SectionTitle>
                    همه چیز برای یک
                    <br />
                    <GradientSpan>فروشگاه مدرن</GradientSpan>
                </SectionTitle>
                <SectionSubtitle className="text-teal-950/60">
                    از طراحی منو تا مدیریت سفارش و رزرو — همه در یک پلتفرم واحد، بدون
                    نیاز به ابزارهای پراکنده.
                </SectionSubtitle>
            </SectionHeader>
            <BentoBox className='h-150 w-full' cols={6} >
                <MenuBento />
                <BranchBento />
                <TableBento />
                <RoleBento />
            </BentoBox>
        </Section >
    )
}

