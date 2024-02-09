import SadIcon from '../assets/emotion-sad-line.svg?react'
import { FC } from 'react'

// TODO: consolidate with AsyncErrorElement

type ErrorElementProps = {
    error: Error
}

const getErrDetails = (errMessage?: string): string => {
    if (errMessage === '404') {
        return '404 - Not found'
    }

    if (errMessage === '500') {
        return '500 - Internal server error'
    }

    return errMessage || ''
}

export const ErrorElement: FC<ErrorElementProps> = ({ error }) => {
    console.log(error)
    const msg = getErrDetails(error.message)

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
