//types
import { type progressType } from "@/app/hooks/useActiveTimer";
import { type Table } from "@/app/types/api/business";
import { type UpdateOrder } from "@/app/types/payloads/menu";

//functions & actions
import { createPayment, updateOrder } from "@/app/actions/dashboard/live-management";

//components
import { toast } from "sonner";


// Update the status of order based on progressType
// Create a new payment instance if order is served
export async function handleOrderAction(table: Table, progressType: progressType, orderStatus: "accepted" | "rejected",
    onPaymentCompleted: (tableCode: string) => void, onOrderRejection?: (tableCode: string) => void) {
    if (!table.order?.id) return;

    let data: Partial<UpdateOrder> = {};

    if (progressType === "pendingOrder") {
        if (orderStatus === 'accepted') {
            data = {
                status: "accepted",
            }
        } else {
            data = {
                status: "cancelled",
            }
        }
    } else if (progressType === 'acceptedOrder') {
        data = {
            status: "ready",
        };
    } else if (progressType === 'canceledOrder') {
        data = {
            status: "cancelled",
        }
    }
    else if (progressType === "readyOrder") {
        data = {
            status: "served",
        };
    }

    else if (progressType === "servedOrder") {
        if (!table.active_session) return

        const data = {
            amount: table.order.total_price,
            method: "cash",
        };

        const res = await createPayment(
            table.active_session?.code,
            data
        );

        if (res.success && res.paymentData?.status === "successful") {
            onPaymentCompleted(table.code);
        }
    }

    if (Object.keys(data).length === 0) {
        console.warn("No changes to send");
        return;
    }

    const res = await updateOrder(table.order.id, data);

    if (onOrderRejection && orderStatus === 'rejected' && res.success && res.orderData?.status === 'cancelled') {
        onOrderRejection(table.code)
    }

    if (!res.success) {
        toast.error("خطایی در انجام عملیات رخ داد، لطفا مجددا امتحان کنید");
    }
}