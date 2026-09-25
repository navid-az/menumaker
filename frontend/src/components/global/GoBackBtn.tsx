//components
import Link from "next/link"
import { Button } from "../ui/button"

//SVGs
import { ArrowLeft } from "lucide-react"

export default function GoBackBtn({ path = "/" }: { path?: string }) {
    return (
        <Button
            size="sm"
            className="group scale-pro h-8 w-12 rounded-full transition-all duration-300 bg-royal-green text-soft-blue hover:scale-110 scale-pro"
            asChild
        >
            <Link href={path}>
                <ArrowLeft className="size-5 transition-all duration-300 scale-pro group-hover:scale-90"></ArrowLeft>
            </Link>
        </Button>
    )
}
