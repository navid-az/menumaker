// src/components/locale-switcher.tsx
'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { setLocaleCookie } from '@/app/actions';
import { Button } from '../ui/button';
import { Globe } from 'lucide-react';

//libraries
import { cn } from '@/lib/utils';

export default function LocaleSwitcher({ className }: { className?: string }) {
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
        <Button className={cn('group size-10 text-royal-green bg-inherit hover:bg-royal-green/8 hover:scale-110 scale-pro transition-all duration-300', className)} size='icon' onClick={toggle} disabled={isPending}>
            <Globe className='transition-all duration-300 scale-pro group-hover:scale-90' />
        </Button>
    );
}