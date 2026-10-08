import React from 'react'

//components 
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
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuTrigger,
    ContextMenuLabel,
    ContextMenuSeparator
} from "@/components/ui/context-menu"
import { OrderDataDialog } from './OrderList';
import { CreateTableForm } from './CreateTableForm';

//functions
import { toPersianDigits } from '../../(menu)/[business_slug]/utilities/formatCurrency'

//libraries
import { useLocale } from 'next-intl';

//types
import { type Table } from '@/app/types/api/business'
import { _Translator } from 'next-intl';
import { progressType } from '@/app/hooks/useActiveTimer';
type LiveCardContextContentProps = {
    table: Table,
    t: _Translator<Record<string, any>, "dashboard.liveManagement.liveCard">,
    progressType: progressType,
    businessSlug: string,
    branchSlug: string,
    handleViewQrCode: () => void,
    handleTableDelete: () => void,
    isMockup: boolean,
}

//SVGs
import {
    ScrollText, CircleX, Info, Pen, QrCode, Trash2, Users2,
} from "lucide-react";

export default function LiveCardContextContent({ table, progressType, businessSlug, branchSlug, handleViewQrCode, handleTableDelete, t, isMockup }: LiveCardContextContentProps) {
    const locale = useLocale()

    return (
        <ContextMenuContent
            className="rounded-xl w-44"
        >
            <ContextMenuLabel className="flex justify-between items-center border-b border-primary/5">
                <p className="text-medium">{table.name}</p>

                <div className="flex gap-2 bg-primary text-secondary rounded-full px-2 py-1 items-center">
                    <Users2 className="size-4" />
                    <p className="font-normal">
                        {locale === 'fa' ? toPersianDigits(table.seats) : table.seats}
                    </p>
                </div>
            </ContextMenuLabel>

            <ContextMenuGroup>
                {/* Disabled for not (should only be disabled on `isMockup`) */}
                <ContextMenuItem disabled>
                    <Info />
                    {t('header.dropdown.buttons.tableDetails')}
                </ContextMenuItem>

                <OrderDataDialog table={table}>
                    <ContextMenuItem
                        disabled={!table.order || progressType === "none"}
                        onSelect={(e) => e.preventDefault()}
                    >
                        <ScrollText />
                        {t('header.dropdown.buttons.orderDetails')}
                    </ContextMenuItem>
                </OrderDataDialog>

                <ContextMenuItem onSelect={handleViewQrCode}>
                    <QrCode />
                    {t('header.dropdown.buttons.viewQrCode')}
                </ContextMenuItem>

                {isMockup ? (
                    <ContextMenuItem disabled>
                        <Pen />
                        {t('header.dropdown.buttons.editTable')}
                    </ContextMenuItem>
                ) : (
                    <CreateTableForm
                        businessSlug={businessSlug}
                        branchSlug={branchSlug}
                        defaultValues={table}
                        tableId={table.id}
                        title={t('header.dropdown.buttons.editTable')}
                    >
                        <ContextMenuItem onSelect={(e) => e.preventDefault()}>
                            <Pen />
                            {t('header.dropdown.buttons.editTable')}
                        </ContextMenuItem>
                    </CreateTableForm>
                )}
            </ContextMenuGroup>

            <ContextMenuSeparator />

            <ContextMenuGroup>
                <ContextMenuItem
                    disabled={isMockup || table.is_associated}
                    onSelect={(e) => e.preventDefault()}
                    className="text-red-600 p-0 focus:text-red-600 focus:bg-red-50"
                >
                    <AlertDialog>
                        <AlertDialogTrigger
                            asChild
                            className="w-full h-full flex items-center gap-2 py-1.5 px-2"
                        >
                            <div>
                                <Trash2 className="text-red-600" />
                                {t('header.dropdown.buttons.deleteTable')}
                            </div>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    {t('header.dropdown.deleteConfirmation.title', {
                                        name: table.name,
                                    })}
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
                                    onClick={handleTableDelete}
                                >
                                    {t('header.dropdown.deleteConfirmation.confirm')}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </ContextMenuItem>

                <ContextMenuItem
                    disabled
                    className="text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                    <CircleX className="text-red-600" />
                    {t('header.dropdown.buttons.cancelOrder')}
                </ContextMenuItem>
            </ContextMenuGroup>
        </ContextMenuContent>
    )
}
