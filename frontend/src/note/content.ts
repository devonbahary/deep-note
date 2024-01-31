// TODO: delete me
export const content = {
    type: 'doc',
    content: [
        {
            type: 'heading',
            attrs: {
                level: 1,
            },
            content: [
                {
                    type: 'text',
                    text: 'h1',
                },
            ],
        },
        {
            type: 'paragraph',
        },
        {
            type: 'heading',
            attrs: {
                level: 2,
            },
            content: [
                {
                    type: 'text',
                    text: 'h2',
                },
            ],
        },
        {
            type: 'paragraph',
        },
        {
            type: 'heading',
            attrs: {
                level: 3,
            },
            content: [
                {
                    type: 'text',
                    text: 'h3',
                },
            ],
        },
        {
            type: 'paragraph',
        },
        {
            type: 'heading',
            attrs: {
                level: 4,
            },
            content: [
                {
                    type: 'text',
                    text: 'h4',
                },
            ],
        },
        {
            type: 'paragraph',
        },
        {
            type: 'heading',
            attrs: {
                level: 5,
            },
            content: [
                {
                    type: 'text',
                    text: 'h5',
                },
            ],
        },
        {
            type: 'paragraph',
        },
        {
            type: 'heading',
            attrs: {
                level: 6,
            },
            content: [
                {
                    type: 'text',
                    text: 'h6',
                },
            ],
        },
        {
            type: 'paragraph',
        },
        {
            type: 'paragraph',
            content: [
                {
                    type: 'text',
                    marks: [
                        {
                            type: 'bold',
                        },
                    ],
                    text: 'bold ',
                },
                {
                    type: 'text',
                    marks: [
                        {
                            type: 'italic',
                        },
                    ],
                    text: 'italic ',
                },
                {
                    type: 'text',
                    marks: [
                        {
                            type: 'underline',
                        },
                    ],
                    text: 'underline',
                },
                {
                    type: 'text',
                    text: ' ',
                },
                {
                    type: 'text',
                    marks: [
                        {
                            type: 'strike',
                        },
                    ],
                    text: 'strikethrough',
                },
            ],
        },
        {
            type: 'paragraph',
        },
        {
            type: 'blockquote',
            content: [
                {
                    type: 'paragraph',
                    content: [
                        {
                            type: 'text',
                            text: 'I am a quote',
                        },
                    ],
                },
            ],
        },
        {
            type: 'paragraph',
        },
        {
            type: 'paragraph',
            content: [
                {
                    type: 'text',
                    text: 'I am ',
                },
                {
                    type: 'text',
                    marks: [
                        {
                            type: 'code',
                        },
                    ],
                    text: 'inline code',
                },
            ],
        },
        {
            type: 'paragraph',
        },
        {
            type: 'codeBlock',
            attrs: {
                language: null,
            },
            content: [
                {
                    type: 'text',
                    text: 'and I am a code block\nwith two lines',
                },
            ],
        },
        {
            type: 'paragraph',
        },
        {
            type: 'orderedList',
            attrs: {
                start: 1,
            },
            content: [
                {
                    type: 'listItem',
                    content: [
                        {
                            type: 'paragraph',
                            content: [
                                {
                                    type: 'text',
                                    text: 'item one',
                                },
                            ],
                        },
                    ],
                },
                {
                    type: 'listItem',
                    content: [
                        {
                            type: 'paragraph',
                            content: [
                                {
                                    type: 'text',
                                    text: 'item two',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            type: 'paragraph',
        },
        {
            type: 'bulletList',
            content: [
                {
                    type: 'listItem',
                    content: [
                        {
                            type: 'paragraph',
                            content: [
                                {
                                    type: 'text',
                                    text: 'item',
                                },
                            ],
                        },
                    ],
                },
                {
                    type: 'listItem',
                    content: [
                        {
                            type: 'paragraph',
                            content: [
                                {
                                    type: 'text',
                                    text: 'item',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}
