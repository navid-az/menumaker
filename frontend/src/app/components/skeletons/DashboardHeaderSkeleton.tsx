//components
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardHeaderSkeleton() {
    return (
        <div className="flex w-full gap-2 justify-between bg-primary p-2 md:px-4 md:py-4">
            <div className="flex gap-2 flex-1 min-w-0">
                <Skeleton className='h-10 w-72 bg-zinc-700'></Skeleton>
            </div>
            <div className="flex gap-2 flex-none">
                <Skeleton className='size-10 bg-zinc-700'></Skeleton>
                <Skeleton className='size-10 bg-zinc-700'></Skeleton>
            </div>
        </div>
    )
}
