//components
import { Bento, BentoHeader, BentoTitle, BentoDescription, BentoBody } from "../BentoBox"

//SVGs
import { Search, MapPin, Plus } from "lucide-react"

export default function BranchBento() {
    return <Bento colSpan={2} mobileRowSpan={2} rowSpan={4} className='group relative overflow-hidden'>
        <BentoHeader>
            <BentoTitle>مدیریت شعبه ها</BentoTitle>
            <BentoDescription>
                مدیریت تمامی شعب از یک داشبورد
            </BentoDescription>
            <BentoBody className='bg-rose-200'>
                <div className='absolute flex flex-col bottom-0 left-0 right-0 translate-y-6/12 mx-auto w-10/12 text-primary rounded-xl bg-zinc-50 border border-zinc-200 group-hover:translate-y-3/12 group-hover:scale-95 group-hover:border-royal-green/50 transition-all duration-300'>
                    <div className="flex h-10 items-center gap-2 border-b group-hover:border-royal-green/50 rounded-t-xl border-b-zinc-200 bg-zinc-50 py-2 px-4 font-normal text-base">
                        <Search className="w-4 h-4 text-zinc-400"></Search>
                        <p className='text-zinc-400 text-xs font-normal'>جستوجو شعبه...</p>
                    </div>
                    <div className='flex flex-col gap-1 p-2'>
                        <div className="flex h-10 items-center gap-2 bg-zinc-50  rounded-lg p-2 font-normal border border-zinc-50 text-base">
                            <MapPin className="w-4 h-4"></MapPin>
                            <p>شعبه تهران - نیاوران</p>
                        </div>
                        <div className="relative h-10 flex items-center justify-between overflow-hidden bg-zinc-50 rounded-lg p-2 font-normal border border-zinc-50 text-base group-hover:delay-100 group-hover:scale-120 group-hover:border-royal-green group-hover:bg-royal-green/95 group-hover:text-white transition-all duration-300">
                            <div className='flex gap-2 items-center'>
                                <MapPin className="w-4 h-4"></MapPin>
                                <p>شعبه تهران - فرمانیه</p></div>
                            <div className='absolute left-2 scale-0 group-hover:scale-100 top-1/2 -translate-y-1/2 transition-all duration-300 delay-150'>
                                <span className="relative flex size-3">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                                    <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
                                </span>
                            </div>
                        </div>
                        <div className="flex h-10 items-center gap-2 bg-zinc-50  rounded-lg p-2 font-normal border border-zinc-50 text-base">
                            <MapPin className="w-4 h-4"></MapPin>
                            <p>شعبه تهران - ونک</p>
                        </div>
                        <div className="flex h-10 items-center gap-2 bg-zinc-50  rounded-lg p-2 font-normal border border-zinc-50 text-base">
                            <MapPin className="w-4 h-4"></MapPin>
                            <p>شعبه تهران - گیشا</p>
                        </div>
                        <div className="flex h-12 justify-center items-center gap-2 rounded-lg p-2 bg-royal-green text-white font-normal border border-zinc-200 text-base">
                            <Plus className="w-5 h-5"></Plus>
                            <p>ایجاد شعبه جدید</p>
                        </div>
                    </div>
                </div>
            </BentoBody>
        </BentoHeader>
    </Bento>
}