"use client";

import React, { useState, useEffect } from "react";

//actions
import { logOut } from "@/app/actions/auth/register";

//components
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

//functions
import { getBusinessUrl } from "@/lib/getBusinessUrl";

//configs
import { APP_URL } from "@/lib/config";

//SVGs
import {
  Plus, Power, Settings, Users, ChartColumn, Radio, ScrollText, Info
} from "lucide-react";

//types
import { User } from "@/app/types/api/auth";

//libraries
import { useTranslations } from "next-intl";

export function UserProfile({
  user,
  businesses,
  locale,
  children,
}: {
  user: User;
  businesses: any;
  locale: string;
  children: React.ReactNode;
}) {
  const t = useTranslations("userProfile");

  const DEMO_MODE_ENABLED =
    process.env.NEXT_PUBLIC_DEMO_MODE_ENABLED === "true";

  const [currentHostname, setCurrentHostname] = useState<string | null>(null);

  useEffect(() => {
    setCurrentHostname(window.location.hostname.toLowerCase());
  }, []);

  const business = businesses?.[0];
  const branch = business?.branches?.[0];

  function getBusinessHref(path: string) {
    if (!business) return path;

    const targetHostname =
      process.env.NODE_ENV === "development"
        ? `${business.slug}.localhost`
        : `${business.slug}.menomaker.ir`;

    // Same business domain: preserve Next.js client-side navigation.
    if (currentHostname === targetHostname) {
      return path;
    }

    // Different domain: navigate to the selected business.
    return getBusinessUrl(business.slug, path);
  }

  function getPlatformHref(path: string) {
    const platformHostname = new URL(APP_URL).hostname;

    // Already on the platform domain.
    if (currentHostname === platformHostname) {
      return path;
    }

    return `${APP_URL}${path}`;
  }

  async function handleLogout() {
    await logOut();
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 bg-primary-foreground text-primary"
        align={locale === "fa" ? "end" : "start"}
      >
        <DropdownMenuLabel className="flex justify-between items-center">
          {user.phone_number}

          {DEMO_MODE_ENABLED && user.is_demo && (
            <div className="bg-yellow-50 text-yellow-800 border-yellow-400 border rounded-full flex justify-between items-center gap-2 px-1 py-1">
              <Info className="size-4" />
              <p className="text-xs font-normal pe-1">
                {t("demo.capsule")}
              </p>
            </div>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {business && branch ? (
          <DropdownMenuGroup>
            <DropdownMenuItem
              disabled
              asChild
              className="group flex gap-2 py-2"
            >
              <Link
                href={getBusinessHref(
                  `/dashboard/${branch.slug}/insights`
                )}
              >
                <ChartColumn />
                <p>{t("navButtons.0")}</p>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="flex gap-2 py-2">
              <Link
                href={getBusinessHref(
                  `/dashboard/${branch.slug}/liveManagement/all`
                )}
              >
                <Radio />
                <p>{t("navButtons.1")}</p>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="flex gap-2 py-2">
              <Link
                href={getBusinessHref(
                  `/dashboard/${branch.slug}/data/items`
                )}
              >
                <ScrollText />
                <p>{t("navButtons.2")}</p>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="flex gap-2 py-2">
              <Link
                href={getBusinessHref(
                  `/dashboard/${branch.slug}/personnel/all`
                )}
              >
                <Users />
                <p>{t("navButtons.3")}</p>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="flex gap-2 py-2">
              <Link
                href={getBusinessHref(
                  `/dashboard/${branch.slug}/settings`
                )}
              >
                <Settings />
                <p>{t("navButtons.4")}</p>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        ) : (
          <DropdownMenuGroup>
            <DropdownMenuItem asChild className="flex gap-2 py-2">
              <Link href={getPlatformHref("/builder")}>
                <Plus />
                <p>{t("createBusinessButton")}</p>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex gap-2 py-2 focus:bg-red-50 text-red-600 focus:text-red-600"
          >
            <Power className="text-red-600" />
            <p>{t("navButtons.5")}</p>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
