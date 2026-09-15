// src/components/locale-switcher.tsx
'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { setLocaleCookie } from '@/app/actions';
import { Button } from '../ui/button';
import { Globe, Languages } from 'lucide-react';

export default function LocaleSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    function toggle() {
        const next = locale === 'fa' ? 'en' : 'fa';
        startTransition(async () => {
            await setLocaleCookie(next);
            router.refresh(); // re-runs the proxy/middleware with the new cookie
        });
    }

    return (
        <Button className='bg-royal-green text-soft-blue transition-all duration-300' size='icon' onClick={toggle} disabled={isPending}>
            {locale === 'fa' ? <Globe /> : <Globe />}
        </Button>
    );
}