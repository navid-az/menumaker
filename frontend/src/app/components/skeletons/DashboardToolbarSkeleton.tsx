//components
import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardToolbarSkeleton() {
    return (
        <div className="sticky backdrop-blur-xl bg-sad-blue/60 border border-royal-green/20 top-0 z-40 flex h-max w-full items-center justify-between gap-2 rounded-full p-2">
            <Skeleton className='flex h-11 w-4/12 items-center justify-between rounded-full bg-soft-blue'></Skeleton>
            <div className="flex items-center gap-2">
                <Skeleton className='size-10 rounded-full bg-soft-blue'></Skeleton>
                <Skeleton className='h-10 w-24 rounded-full bg-soft-blue'></Skeleton>
            </div>
        </div>
    )
}
