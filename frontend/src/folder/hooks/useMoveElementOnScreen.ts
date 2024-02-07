import { MutableRefObject, useEffect, useRef } from 'react'

export const useMoveElementOnScreen =
    (): MutableRefObject<HTMLDivElement | null> => {
        const ref = useRef<HTMLDivElement | null>(null)

        useEffect(() => {
            if (ref.current) {
                const { bottom, top } = ref.current.getBoundingClientRect()

                if (top < 0) {
                    ref.current.style.transform = `translate(0, ${-top}px)`
                }

                if (bottom > window.innerHeight) {
                    ref.current.style.transform = `translate(0, ${window.innerHeight - bottom}px)`
                }
            }
        }, [ref])

        return ref
    }
