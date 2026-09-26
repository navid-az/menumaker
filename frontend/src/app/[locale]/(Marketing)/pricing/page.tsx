import { Suspense } from "react";

//components
import {
  ComparisonTable,
  ComparisonTableCell,
  ComparisonTableCellDescription,
  ComparisonTableCellTitle,
  ComparisonTableContent,
  ComparisonTableHeader,
  ComparisonTableHeaderCell,
  ComparisonTableRow,
  ComparisonTableSection,
  ComparisonTableSectionContent,
  ComparisonTableSectionTrigger,
} from "./components/ComparisonTable";
import PricingPlans from "./components/PricingPlans";

//functions
import getSubscriptionPlans from "@/lib/subscription/getSubscriptionPlans";
import { toPersianDigits } from "../../(menu)/[business_slug]/utilities/formatCurrency";

//SVGs
import { Gem } from "lucide-react";

//libraries
import { getTranslations } from "next-intl/server";
import getLocale from "@/lib/i18n/getLocale";

const PLANS = ["basic", "pro", "franchise"] as const;


async function PricingPlansSection() {
  const plans = await getSubscriptionPlans()

  return <PricingPlans plans={plans}></PricingPlans>
}

export default async function page() {
  const t = await getTranslations("pricing");
  const locale = await getLocale()

  const PRICING_COMPARISON = [
    {
      sectionKey: "menu_builder",
      sectionTitle: t("comparison.sections.menu_builder"),
      rows: [
        {
          type: "value",
          label: t("comparison.rows.paletteColors"),
          values: {
            basic: 2,
            pro: 4,
            franchise: 4,
          },
        },
      ],
    },
    {
      sectionKey: "reservation_system",
      sectionTitle: t("comparison.sections.reservation_system"),
      rows: [
        {
          type: "boolean",
          label: t("comparison.rows.unlimitedTables"),
          values: {
            basic: true,
            pro: true,
            franchise: true,
          },
        },
        {
          type: "boolean",
          label: t("comparison.rows.reservationStatus"),
          values: {
            basic: true,
            pro: true,
            franchise: true,
          },
        },
        {
          type: "boolean",
          label: t("comparison.rows.reservationSms"),
          values: {
            basic: true,
            pro: true,
            franchise: true,
          },
        },
        {
          type: "boolean",
          label: t("comparison.rows.reservationFee"),
          values: {
            basic: false,
            pro: true,
            franchise: true,
          },
        },
      ],
    },
    {
      sectionKey: "online_order",
      sectionTitle: t("comparison.sections.online_order"),
      rows: [
        {
          type: "boolean",
          label: t("comparison.rows.unlimitedTables"),
          values: {
            basic: true,
            pro: true,
            franchise: true,
          },
        },
        {
          type: "boolean",
          label: t("comparison.rows.reservationStatus"),
          values: {
            basic: true,
            pro: true,
            franchise: true,
          },
        },
        {
          type: "boolean",
          label: t("comparison.rows.reservationSms"),
          values: {
            basic: true,
            pro: true,
            franchise: true,
          },
        },
        {
          type: "boolean",
          label: t("comparison.rows.reservationFee"),
          values: {
            basic: false,
            pro: true,
            franchise: true,
          },
        },
      ],
    },
    {
      sectionKey: "live_management",
      sectionTitle: t("comparison.sections.live_management"),
      rows: [
        {
          type: "boolean",
          label: t("comparison.rows.unlimitedTables"),
          values: {
            basic: false,
            pro: true,
            franchise: true,
          },
        },
        {
          type: "boolean",
          label: t("comparison.rows.waiterRequestNotification"),
          values: {
            basic: false,
            pro: true,
            franchise: true,
          },
        },
        {
          type: "boolean",
          label: t("comparison.rows.orderNotification"),
          values: {
            basic: false,
            pro: true,
            franchise: true,
          },
        },
        {
          type: "boolean",
          label: t("comparison.rows.reservationNotification"),
          values: {
            basic: false,
            pro: true,
            franchise: true,
          },
        },
        {
          type: "boolean",
          label: t("comparison.rows.tableNeedsAttention"),
          values: {
            basic: false,
            pro: true,
            franchise: true,
          },
        },
      ],
    },
  ];

  const DEFAULT_OPEN_SECTIONS = PRICING_COMPARISON.map(
    (section) => section.sectionKey
  );

  return (
    <div className="flex mx-auto flex-col items-center gap-24 xl:px-20 md:px-8 2xl:px-28">
      <section className="flex flex-col gap-16 mt-20 w-full">
        <div className="w-full flex gap-4 items-center">
          <Gem className="size-20 stroke-[1.5]"></Gem>
          <div className="flex flex-col gap-3">
            <h1 className="text-royal-green text-4xl font-bold">
              {t("title")}
            </h1>
            <h3 className="text-gray-400 text-2xl font-normal">
              {t("description")}
            </h3>
          </div>
        </div>
        <Suspense fallback={'loading...'}>
          <PricingPlansSection></PricingPlansSection>
        </Suspense>
      </section>
      {/* Comparison Table */}
      <ComparisonTable className="py-20">
        <ComparisonTableHeader>
          <ComparisonTableHeaderCell className="text-sky-blue">
            {t('comparison.plans.basic')}
          </ComparisonTableHeaderCell>
          <ComparisonTableHeaderCell className="text-purple-900">
            {t('comparison.plans.pro')}
          </ComparisonTableHeaderCell>
          <ComparisonTableHeaderCell className="text-yellow-300">
            {t('comparison.plans.franchiser')}
          </ComparisonTableHeaderCell>
        </ComparisonTableHeader>
        <ComparisonTableContent defaultValue={DEFAULT_OPEN_SECTIONS}>
          {PRICING_COMPARISON.map((pricing, index) => (
            <ComparisonTableSection key={index} value={pricing.sectionKey}>
              <ComparisonTableSectionTrigger>
                {pricing.sectionTitle}
              </ComparisonTableSectionTrigger>
              <ComparisonTableSectionContent>
                {pricing.rows.map((row, rowIndex) => (
                  <ComparisonTableRow key={rowIndex}>
                    {PLANS.map((plan, planIndex) => (
                      <ComparisonTableCell
                        key={planIndex}
                        disabled={!row.values[plan]}
                      >
                        {row.type == "value" ? (
                          <>
                            <ComparisonTableCellTitle>
                              {locale === 'fa' ? toPersianDigits(row.values[plan]) : row.values[plan]}
                            </ComparisonTableCellTitle>
                            <ComparisonTableCellDescription>
                              {row.label}
                            </ComparisonTableCellDescription>
                          </>
                        ) : (
                          <>
                            <ComparisonTableCellTitle>
                              {row.label}
                            </ComparisonTableCellTitle>
                            <ComparisonTableCellDescription>
                              {row.values[plan]}
                            </ComparisonTableCellDescription>
                          </>
                        )}
                      </ComparisonTableCell>
                    ))}
                  </ComparisonTableRow>
                ))}
              </ComparisonTableSectionContent>
            </ComparisonTableSection>
          ))}
        </ComparisonTableContent>
      </ComparisonTable>
    </div>
  );
}

{
  /* mapping strategy  */
}
{
  /* {plans.map((plan, index) => (
        <PlanCard theme={plan.theme} key={index}>
          <PlanCardHeader>
            <PlanCardTitle>{plan.title}</PlanCardTitle>
            <PlanCardDescription>{plan.description}</PlanCardDescription>
          </PlanCardHeader>
          <PlanCardPricing
            theme={plan.theme}
            price={plan.price}
          ></PlanCardPricing>
          <PlanCardContent>
            <div className="flex gap-2 items-center ">
              <CheckCheck className="w-4 h-4"></CheckCheck>
              <p className="text-sm font-medium">
                تمام امکانات استارتر به همراه:
              </p>
            </div>
            {plan.features.map((feature, index) => (
              <PlanCardFeature key={index}>{feature}</PlanCardFeature>
            ))}
          </PlanCardContent>
          <PlanCardFooter theme={plan.theme}>
            <Button size="lg" className={cn("w-full py-3 h-max")}>
              فعالسازی اشتراک
            </Button>
          </PlanCardFooter>
        </PlanCard>
      ))} */
}
