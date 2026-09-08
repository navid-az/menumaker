'use client'

import { startTransition, useEffect, useState } from 'react'

//Used to avoid calling Date inline

export function useDeferredNow(intervalMs = 1_000) {
    const [now, setNow] = useState<number | null>(null)

    useEffect(() => {
        startTransition(() => {
            setNow(Date.now())
        })
        const id = setInterval(() => {
            startTransition(() => {
                setNow(Date.now())
            })
        }, intervalMs)
        return () => clearInterval(id)
    }, [intervalMs])

    return now
}