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

export const PLANS = ["basic", "pro", "franchise"] as const;

export const PRICING_COMPARISON = [
  {
    sectionKey: "menu_builder",
    sectionTitle: "سیستم منو ساز",
    rows: [
      {
        type: "value",
        label: "رنگ پالت",
        values: {
          basic: "۲",
          pro: "۴",
          franchise: "۴",
        },
      },
    ],
  },

  {
    sectionKey: "reservation_system",
    sectionTitle: "سیستم رزرواسیون",
    rows: [
      {
        type: "boolean",
        label: "قابلیت ایجاد بی‌نهایت میز",
        values: {
          basic: true,
          pro: true,
          franchise: true,
        },
      },
      {
        type: "boolean",
        label: "قابلیت تغییر وضعیت رزرو هر میز",
        values: {
          basic: true,
          pro: true,
          franchise: true,
        },
      },
      {
        type: "boolean",
        label: "ارسال SMS تایید رزرو به مشتری",
        values: {
          basic: true,
          pro: true,
          franchise: true,
        },
      },
      {
        type: "boolean",
        label: "قابلیت دریافت فی برای رزرو",
        values: {
          basic: false,
          pro: true,
          franchise: true,
        },
      },
    ],
  },
  {
    sectionKey: "nigga",
    sectionTitle: "سیستم رزرواسیون",
    rows: [
      {
        type: "boolean",
        label: "قابلیت ایجاد بی‌نهایت میز",
        values: {
          basic: true,
          pro: true,
          franchise: true,
        },
      },
      {
        type: "boolean",
        label: "قابلیت تغییر وضعیت رزرو هر میز",
        values: {
          basic: true,
          pro: true,
          franchise: true,
        },
      },
      {
        type: "boolean",
        label: "ارسال SMS تایید رزرو به مشتری",
        values: {
          basic: true,
          pro: true,
          franchise: true,
        },
      },
      {
        type: "boolean",
        label: "قابلیت دریافت فی برای رزرو",
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
    sectionTitle: "مدیریت زنده",
    rows: [
      {
        type: "boolean",
        label: "قابلیت ایجاد بی‌نهایت میز",
        values: {
          basic: false,
          pro: true,
          franchise: true,
        },
      },
      {
        type: "boolean",
        label: "قابلیت مشاهده اعلان درخواست سالن‌دار",
        values: {
          basic: false,
          pro: true,
          franchise: true,
        },
      },
      {
        type: "boolean",
        label: "قابلیت مشاهده اعلان ثبت سفارش",
        values: {
          basic: false,
          pro: true,
          franchise: true,
        },
      },
      {
        type: "boolean",
        label: "قابلیت مشاهده اعلان رزرو میز",
        values: {
          basic: false,
          pro: true,
          franchise: true,
        },
      },
      {
        type: "boolean",
        label: "قابلیت ثبت میز به عنوان نیاز به رسیدگی",
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

export default async function page() {
  return (
    <div className="flex container mx-auto flex-col items-center gap-24 xl:px-20 md:px-8 2xl:px-28">
      <PricingPlans></PricingPlans>
      {/* Comparison Table */}
      <ComparisonTable className="py-20">
        <ComparisonTableHeader>
          <ComparisonTableHeaderCell className="text-sky-blue">
            بیسیک
          </ComparisonTableHeaderCell>
          <ComparisonTableHeaderCell className="text-purple-900">
            پرو
          </ComparisonTableHeaderCell>
          <ComparisonTableHeaderCell className="text-yellow-300">
            فرنچایزر
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
                              {row.values[plan]}
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
