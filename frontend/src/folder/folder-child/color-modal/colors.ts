// keep this in sync with tailwind-safelist.js because dynamic classes won't
// be bundled with Tailwind
export const colors = [
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
