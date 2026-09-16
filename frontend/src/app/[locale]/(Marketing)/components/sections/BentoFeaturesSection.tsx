//components
import { BentoBox, } from '../BentoBox'
import { GradientSpan } from '../GradientSpan'
import { Section, SectionHeader, SectionTitle, SectionSubtitle } from '@/components/global/marketingLayout/MarketingSection'
import TableBento from '../marketingBento/TableBento'
import BranchBento from '../marketingBento/BranchBento'
import RoleBento from '../marketingBento/RoleBento'
import MenuBento from '../marketingBento/MenuBento'

//libraries
import { getTranslations } from "next-intl/server";



export default async function BentoFeaturesSection() {
    const t = await getTranslations("landing.bentoFeaturesSection");

    return (
        <Section className='bg-soft-blue flex flex-col gap-6'>
            <SectionHeader>
                <SectionTitle>
                    {t("title.0")}
                    <br />
                    <GradientSpan>{t("title.1")}</GradientSpan>
                </SectionTitle>
                <SectionSubtitle className="text-teal-950/60">
                    {t("subtitle")}
                </SectionSubtitle>
            </SectionHeader>
            <BentoBox className='h-370 md:h-150 w-full select-none' cols={6} >
                <MenuBento />
                <BranchBento />
                <TableBento />
                <RoleBento />
            </BentoBox>
        </Section >
    )
}

