//components
import Link from "next/link"
import { Button } from "../ui/button"

//SVGs
import { ArrowLeft } from "lucide-react"

//configs
import { APP_URL } from "@/lib/config"

//types
interface GoBackBtnProps {
    path?: string;
    primaryColor?: string;
    secondaryColor?: string;
}

export default function GoBackBtn({
    path = APP_URL,
    primaryColor = "#0f2c30",
    secondaryColor = "#edfdff",
}: GoBackBtnProps) {
    return (
        <Button
            size="sm"
            asChild
            className="group scale-pro h-8 w-12 rounded-full transition-all duration-300 hover:scale-110"
            style={{
                backgroundColor: primaryColor,
                color: secondaryColor,
            }}
        >
            <Link href={path}>
                <ArrowLeft className="size-5 transition-all duration-300 group-hover:scale-90" />
            </Link>
        </Button>
    );
}