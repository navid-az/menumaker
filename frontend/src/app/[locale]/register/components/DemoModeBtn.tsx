//components
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

//functions
import { createDemoUser } from '@/app/actions/auth/register';
import { createAuthCookies } from '@/app/actions/auth/register';

//types 
import { _Translator } from "next-intl";

export default function DemoModeBtn({ t }: { t: _Translator<Record<string, any>, "register"> }) {

    async function startDemo() {
        const result = await createDemoUser();
        if (result.success) {
            const { access, refresh } = result.tokens;
            createAuthCookies(access, refresh);
            toast.success(t('demoMode.loginSuccess'));
        } else {
            toast.error(t('demoMode.error'));
        }
    }
    return (
        <div className="group flex flex-col gap-4 w-full p-4 rounded-md hover:border-royal-green bg-white border-2 border-sad-blue transition-all duration-300 has-[button:hover]:border-royal-green">
            <div className="flex gap-1 flex-col">
                <div className="flex justify-between items-center">
                    <p className="font-medium">{t('demoMode.title')}</p>
                    <span className="px-4 py-1.5 rounded-full bg-yellow-200 text-yellow-950 w-max text-sm font-normal">
                        <p>{t('demoMode.badge')}</p>
                    </span>
                </div>

                <p className=" font-normal text-sm text-royal-green/90 w-5/6">
                    {t('demoMode.description')}
                </p>
            </div>
            <Button
                className="bg-gray-100 h-14 text-base text-gray-700 border border-gray-300 font-normal hover:bg-royal-green hover:text-soft-blue hover:border-royal-green transition-all duration-300"
                size="lg"
                type="button"
                onClick={startDemo}
            >
                {t('demoMode.submitButton')}
            </Button>
        </div>
    );
}




