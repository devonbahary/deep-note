import { useState } from 'react'

const TIMEOUT = 5000

export const useTimeout = (timeout = TIMEOUT) => {
    const [timeoutRef, setTimeoutRef] = useState<number | null>(null)

    const reset = () => {
        if (timeoutRef) {
            clearTimeout(timeoutRef)
            setTimeoutRef(null)
        }
    }

    const set = (callback: () => void) => {
        if (timeoutRef) {
            clearTimeout(timeoutRef)
        }

        const ref = setTimeout(callback, timeout)
        setTimeoutRef(ref)
    }

    return {
        setTimeout: set,
        clearTimeout: reset,
    }
}
