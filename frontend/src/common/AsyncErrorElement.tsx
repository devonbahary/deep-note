import { useAsyncError } from 'react-router-dom'
import SadIcon from '../assets/emotion-sad-line.svg?react'

const getErrDetails = (errMessage?: string): string => {
    if (errMessage === '404') {
        return '404 - Not found'
    }

    if (errMessage === '500') {
        return '500 - Internal server error'
    }

    return errMessage || ''
}

export const AsyncErrorElement = () => {
    const asyncErr = useAsyncError()

    const msg = getErrDetails((asyncErr as Error)?.message)

    return (
        <div className="bg-zinc-900 w-full h-full text-zinc-300 flex items-center justify-center">
            <div className="text-center flex flex-col gap-2">
                <div className="flex justify-center">
                    <div className="w-24 h-24">
                        <SadIcon />
                    </div>
                </div>
                <h3>Something went wrong</h3>
                <div className="text-zinc-500">{msg}</div>
            </div>
        </div>
    )
}
