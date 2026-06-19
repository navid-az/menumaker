import React from "react";

export const roleConfig: Record<
  string,
  { label: string; bg: string; text: string; border: string }
> = {
  owner: {
    label: "صاحب مجموعه",
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-800",
  },
  manager: {
    label: "مدیر",
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-800",
  },
  waiter: {
    label: "سالن دار",
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-800",
  },
  chef: {
    label: "سرآشپز",
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-800",
  },
};

export function RoleBadge({ role }: { role: string }) {
  const config = roleConfig[role.toLowerCase()] || {
    label: role,
    bg: "bg-gray-100",
    text: "text-gray-800",
    border: "border-gray-800",
  };

  return (
    <span
      className={`inline-flex items-center px-3 h-8 rounded-full text-xs font-medium border-2 ${config.bg} ${config.text} ${config.border}`}
    >
      {config.label}
    </span>
  );
}
