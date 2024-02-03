import { FC, ReactNode } from 'react'

export const Header: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="bg-zinc-950 text-zinc-100 h-12 items-center flex flex-none shadow-lg gap-2 p-2">
            {children}
        </div>
    )
}
