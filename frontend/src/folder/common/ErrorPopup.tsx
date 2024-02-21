import { FC, useCallback, useEffect, useState } from 'react'
import { useTimeout } from '../../common/hooks/useTimeout'
import CloseIcon from '../../assets/close-line.svg?react'

type ErrorPopupProps = {
    prependMsg: string
    error: Error | null
}

export const ErrorPopup: FC<ErrorPopupProps> = ({ prependMsg, error }) => {
    const [err, setErr] = useState<Error | null>(null)

    const { setTimeout, clearTimeout } = useTimeout()

    const reset = useCallback(() => {
        setErr(null)
        clearTimeout()
    }, [clearTimeout])

    useEffect(() => {
        if (error) {
            reset()
            setErr(error)

            setTimeout(() => {
                setErr(null)
            })
        }
    }, [error, reset, setTimeout])

    if (!err) {
        return null
    }

    return (
        <div
            className="fixed right-4 bottom-10 bg-red-800 text-zinc-100 px-4 py-3 rounded flex items-center"
            role="alert"
        >
            <strong className="font-bold">{prependMsg}</strong>
            <span className="block sm:inline">&nbsp;{error?.message}</span>
            <div
                className="icon-box text-zinc-300 hover:text-zinc-100 cursor-pointer"
                onClick={() => reset()}
            >
                <CloseIcon />
            </div>
        </div>
    )
}
