'use client'

import { useState } from "react";

//components
import {
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSeparator
} from "@/components/ui/context-menu"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogAction,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { CreateTableForm } from "./CreateTableForm";
import { OrderDataDialog } from "./OrderList";

//functions
import { toPersianDigits } from "../../(menu)/[business_slug]/utilities/formatCurrency";

//actions 
import { endTableSession } from "@/app/actions/dashboard/live-management";
import { deleteTable } from "@/app/actions";

//SVGs
import { Info, Users2, Trash2, CircleX, Pen, QrCode, ScrollText } from "lucide-react";

//libraries
import { useLocale } from "next-intl";

//types
import { type Table } from "@/app/types/api/business";
import { type progressType } from "@/app/hooks/useActiveTimer";
type LiveCardMenuItemsProps = {
    mode: "dropdown" | "context";
    table: Table;
    progressType: progressType;
    businessSlug: string;
    branchSlug: string;
    handleViewQrCode: () => void;
    t: (key: string, values?: Record<string, string>) => string;
    isMockup?: boolean;
};

export default function LiveCardMenuContent({
    mode,
    table,
    progressType,
    businessSlug,
    branchSlug,
    handleViewQrCode,
    t,
    isMockup = false,
}: LiveCardMenuItemsProps) {
    const MenuContent = mode === 'dropdown' ? DropdownMenuContent : ContextMenuContent

    const MenuItem =
        mode === "dropdown" ? DropdownMenuItem : ContextMenuItem;

    const MenuGroup =
        mode === "dropdown" ? DropdownMenuGroup : ContextMenuGroup;

    const MenuSeparator =
        mode === "dropdown"
            ? DropdownMenuSeparator
            : ContextMenuSeparator;

    const MenuLabel =
        mode === "dropdown"
            ? DropdownMenuLabel
            : ContextMenuLabel;

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [isEnding, setIsEnding] = useState(false);

    const locale = useLocale()

    async function handleEndSession() {
        if (!table.active_session) return
        setIsEnding(true);

        try {
            const result = await endTableSession(table.active_session?.code);

            if (!result.success) {
                toast.error(t("header.dropdown.confirmEndSession.error"));
                return;
            }

            toast.success(t("header.dropdown.confirmEndSession.success"));
            setConfirmOpen(false);
        } finally {
            setIsEnding(false);
        }
    }

    async function handleTableDelete() {
        const res = await deleteTable(businessSlug, branchSlug, table.id);

        if (res.success) {
            toast.success(t("header.toasts.deleteSuccess"));
        } else {
            toast.error(res.error);
        }
    }

    return (
        <MenuContent align={locale === 'fa' ? 'start' : "end"} className="rounded-xl w-44">
            <MenuGroup>
                <MenuLabel className="flex justify-between items-center border-b border-primary/5">
                    <p className="text-medium">{table.name}</p>
                    <div className="flex gap-2 bg-primary text-secondary rounded-full px-2 py-1 items-center">
                        <Users2 className="size-4"></Users2>
                        <p className="font-normal">{locale === 'fa' ? toPersianDigits(table.seats) : table.seats}</p>
                    </div>
                </MenuLabel>
                <MenuGroup>
                    {/* Disabled for not (should only be disabled on `isMockup`) */}
                    <MenuItem disabled>
                        <Info></Info>
                        {t('header.dropdown.buttons.tableDetails')}
                    </MenuItem>
                    <OrderDataDialog table={table}>
                        <MenuItem
                            disabled={!table.order || progressType === "none"}
                            onSelect={(e) => e.preventDefault()}
                        >
                            <ScrollText></ScrollText>
                            {t('header.dropdown.buttons.orderDetails')}
                        </MenuItem>
                    </OrderDataDialog>

                    <MenuItem onClick={handleViewQrCode}>
                        <QrCode></QrCode>
                        {t('header.dropdown.buttons.viewQrCode')}
                    </MenuItem>
                    {isMockup ? (
                        <MenuItem disabled>
                            <Pen></Pen>
                            {t('header.dropdown.buttons.editTable')}
                        </MenuItem>
                    ) : (
                        <CreateTableForm
                            businessSlug={businessSlug}
                            branchSlug={branchSlug}
                            defaultValues={table}
                            tableId={table.id}
                            title={t('header.dropdown.buttons.editTable')}
                        >
                            <MenuItem onSelect={(e) => e.preventDefault()}>
                                <Pen></Pen>
                                {t('header.dropdown.buttons.editTable')}
                            </MenuItem>
                        </CreateTableForm>
                    )}
                </MenuGroup>
            </MenuGroup>

            <MenuSeparator />

            <MenuGroup>
                <MenuItem
                    disabled={isMockup || table.is_associated}
                    onClick={(e) => e.preventDefault()}
                    className="text-red-600 p-0 focus:text-red-600 focus:bg-red-50"
                >
                    <AlertDialog>
                        <AlertDialogTrigger
                            asChild
                            className="w-full h-full flex items-center gap-2 py-1.5 px-2"
                        >
                            <div>
                                <Trash2 className="text-red-600 "></Trash2>
                                {t('header.dropdown.buttons.deleteTable')}
                            </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    {t('header.dropdown.deleteConfirmation.title', { name: table.name })}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    {t('header.dropdown.deleteConfirmation.description')}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="mt-8">
                                <AlertDialogCancel>
                                    {t('header.dropdown.deleteConfirmation.cancel')}
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    className="hover:bg-red-600 transition-all duration-300"
                                    onClick={(e) => {
                                        handleTableDelete();
                                    }}
                                >
                                    {t('header.dropdown.deleteConfirmation.confirm')}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </MenuItem>
                <MenuItem
                    disabled={isMockup || !table.active_session}
                    onSelect={(event) => {
                        event.preventDefault();
                        setConfirmOpen(true);
                    }}
                    className="text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                    <CircleX className="text-red-600" />
                    {t("header.dropdown.buttons.endSession")}
                </MenuItem>
                <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                {t("header.dropdown.confirmEndSession.title")}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                {t("header.dropdown.confirmEndSession.description")}
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={isEnding}>
                                {t("header.dropdown.confirmEndSession.cancel")}
                            </AlertDialogCancel>

                            <AlertDialogAction
                                disabled={isEnding}
                                className="bg-red-600 hover:bg-red-700"
                                onClick={(event) => {
                                    event.preventDefault();
                                    void handleEndSession();
                                }}
                            >
                                {isEnding
                                    ? t("header.dropdown.confirmEndSession.ending")
                                    : t("header.dropdown.confirmEndSession.confirm")}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </MenuGroup>
        </MenuContent>
    );
}