import { FC, useRef, useState } from 'react'

type TextInputProps = {
    defaultValue: string
    onSubmit: (name: string) => void
    placeholder: string
}

export const TextInput: FC<TextInputProps> = ({
    defaultValue,
    onSubmit,
    placeholder,
}) => {
    const [text, setText] = useState(defaultValue)
    const ref = useRef<HTMLInputElement | null>(null)

    const submit = () => {
        onSubmit(text)
        ref.current?.blur()
    }

    return (
        <input
            autoFocus
            className="bg-inherit w-full"
            type="text"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
                if (
                    e.key === 'Enter' ||
                    e.key === 'Tab' ||
                    e.key === 'Escape'
                ) {
                    submit()
                }
            }}
            onBlur={() => submit()}
            placeholder={placeholder}
            ref={ref}
            value={text}
        />
    )
}
