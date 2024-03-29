const colors = [
    'white',
    ...[
        'neutral',
        'red',
        'orange',
        'amber',
        'yellow',
        'lime',
        'green',
        'emerald',
        'teal',
        'cyan',
        'sky',
        'blue',
        'indigo',
        'violet',
        'purple',
        'fuchsia',
        'pink',
        'rose',
    ].map((c) => `${c}-500`),
]

const colorClassNames = colors.reduce(
    (acc, c) => [...acc, `bg-${c}`, `text-${c}`],
    []
)

const widths = [24, 28, 32, 36, 40, 56, 60, 64, 72, 80]

const widthClassNames = widths.map((w) => `w-${w}`)

export const safelist = [...colorClassNames, ...widthClassNames]
