import { FC, ReactNode } from 'react'

export const Header: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="bg-zinc-950 text-zinc-100 h-12 items-center flex shadow-sm shadow-zinc-950 gap-2 p-2 relative">
            {children}
        </div>
    )
}
