"use client";

import { useTransition } from "react";

//components
import { Button } from '@/components/ui/button'
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

//types
import { Table } from '@/app/types/api/business'
import { progressType } from '@/app/hooks/useActiveTimer'

//libraries
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";

//functions
import { cn } from '@/lib/utils'
import { handleOrderAction } from '../utils/handleOrderAction'

//actions
import { resolveServiceRequest } from '@/app/actions/menu/service-request';

export default function LiveCardActions({
    table,
    progressType,
    onPaymentCompleted,
}: {
    table: Table;
    progressType: progressType;
    onPaymentCompleted: (tableCode: string) => void;
}) {
    const t = useTranslations("dashboard.liveManagement.liveCard.actions");
    const [isResolving, startResolving] = useTransition();

    const activeCall = table.active_call;

    const actionKey = {
        call: "answerCall",
        pendingOrder: "orderAccepted",
        acceptedOrder: "orderReady",
        canceledOrder: "orderCanceled",
        readyOrder: "orderServed",
        servedOrder: "paymentCompleted",
        session: "sessionCompleted",
        none: "default",
    }[progressType];

    const actionLabel = t(actionKey);

    function handleResolveServiceRequest() {
        if (!activeCall || isResolving) return;

        startResolving(async () => {
            const result = await resolveServiceRequest(activeCall.id);

            if (!result.success) {
                console.error(result.error);
            }
        });
    }

    if (!table.order && progressType !== 'call') {
        return null;
    }

    return (
        <div className="absolute rtl:flex-row-reverse mx-auto bottom-0 w-full flex gap-2 -mb-16 transition-all duration-300 p-2 group-hover:mb-0">
            {progressType === 'call' ? (
                <Button
                    disabled={isResolving}
                    onClick={handleResolveServiceRequest}
                    className="flex-1 rounded-full bg-blue-100 text-blue-900 transition-all duration-300 hover:bg-blue-600 hover:text-blue-50"
                >
                    {isResolving ? t("resolving") : t("resolve")}
                </Button>
            )

                : table.order?.status !== 'cancelled' && (
                    <>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    className={cn(
                                        "flex-1 rounded-full bg-red-100 text-red-900 transition-all duration-300 hover:bg-red-500 hover:text-red-50",
                                        progressType !== "pendingOrder" && "-ml-33.5",
                                    )}
                                >
                                    {t("orderCanceled")}
                                </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        {t("orderCancellation.title")}
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {t("orderCancellation.description")}
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter className="mt-8">
                                    <AlertDialogCancel>
                                        {t("orderCancellation.cancel")}
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        className="hover:bg-red-600 transition-all duration-300"
                                        onClick={() =>
                                            handleOrderAction(
                                                table,
                                                progressType,
                                                "rejected",
                                                onPaymentCompleted,
                                            )
                                        }
                                    >
                                        {t("orderCancellation.confirm")}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <Button
                            onClick={() =>
                                handleOrderAction(
                                    table,
                                    progressType,
                                    "accepted",
                                    onPaymentCompleted,
                                )
                            }
                            className="flex-2 rounded-full bg-green-100 text-green-900 transition-all duration-300 hover:bg-green-600 hover:text-green-50"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={actionKey}
                                    initial={{
                                        opacity: 0,
                                        filter: "blur(8px)",
                                    }}
                                    animate={{
                                        opacity: 1,
                                        filter: "blur(0px)",
                                    }}
                                    exit={{
                                        opacity: 0,
                                        filter: "blur(8px)",
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeOut",
                                    }}
                                >
                                    {actionLabel}
                                </motion.span>
                            </AnimatePresence>
                        </Button>
                    </>
                )}
        </div>
    );
}