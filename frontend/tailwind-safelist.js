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

export const safelist = colors.reduce(
    (acc, c) => [...acc, `bg-${c}`, `text-${c}`],
    []
)
