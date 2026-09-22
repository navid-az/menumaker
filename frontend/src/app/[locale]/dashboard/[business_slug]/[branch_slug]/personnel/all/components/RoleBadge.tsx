import { useTranslations } from "next-intl";


export function RoleBadge({ role }: { role: string }) {
  const t = useTranslations("roles");

  const roleConfig = {
    owner: {
      label: t("owner"),
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      border: "border-yellow-800",
    },
    manager: {
      label: t("manager"),
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-800",
    },
    waiter: {
      label: t("waiter"),
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-800",
    },
    chef: {
      label: t("chef"),
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-800",
    },
  };

  const config = roleConfig[role.toLowerCase()] || {
    label: role,
    bg: "bg-gray-100",
    text: "text-gray-800",
    border: "border-gray-800",
    t: t
  };

  return (
    <span
      className={`inline-flex items-center px-3 h-8 rounded-full text-xs font-medium border-2 ${config.bg} ${config.text} ${config.border}`}
    >
      {config.label}
    </span>
  );
}
