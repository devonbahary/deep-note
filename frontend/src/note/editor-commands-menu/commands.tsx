import { ReactNode } from 'react'
import { ChainedCommands, Editor } from '@tiptap/react'
import BoldIcon from '../../assets/bold.svg?react'
import BlockquoteIcon from '../../assets/double-quotes-l.svg?react'
import BulletListIcon from '../../assets/list-unordered.svg?react'
import CodeBlockIcon from '../../assets/code-block.svg?react'
import CodeIcon from '../../assets/code.svg?react'
import H1Icon from '../../assets/h-1.svg?react'
import H2Icon from '../../assets/h-2.svg?react'
import H3Icon from '../../assets/h-3.svg?react'
import H4Icon from '../../assets/h-4.svg?react'
import H5Icon from '../../assets/h-5.svg?react'
import H6Icon from '../../assets/h-6.svg?react'
import ItalicIcon from '../../assets/italic.svg?react'
import OrderedListIcon from '../../assets/list-ordered.svg?react'
import RedoIcon from '../../assets/arrow-go-forward.svg?react'
import StrikeIcon from '../../assets/strikethrough.svg?react'
import UnderlineIcon from '../../assets/underline.svg?react'
import UndoIcon from '../../assets/arrow-go-back.svg?react'

type CommandButtonGroup = CommandProps[]

type CommandProps = {
    name: string
    icon: ReactNode
    command: (chain: ChainedCommands) => ChainedCommands
    isActiveAttributes?: object
    disabled?: (editor: Editor) => boolean
}

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

const HEADING_LEVELS: HeadingLevel[] = [1, 2, 3, 4, 5, 6]

const HEADING_LEVEL_TO_ICON_MAP: Record<HeadingLevel, ReactNode> = {
    1: <H1Icon />,
    2: <H2Icon />,
    3: <H3Icon />,
    4: <H4Icon />,
    5: <H5Icon />,
    6: <H6Icon />,
}

export const COMMAND_BUTTON_GROUPS: CommandButtonGroup[] = [
    [
        {
            name: 'bold',
            icon: <BoldIcon />,
            command: (chain) => chain.toggleBold(),
        },
        {
            name: 'italic',
            icon: <ItalicIcon />,
            command: (chain) => chain.toggleItalic(),
        },
        {
            name: 'underline',
            icon: <UnderlineIcon />,
            command: (chain) => chain.toggleUnderline(),
        },
        {
            name: 'strike',
            icon: <StrikeIcon />,
            command: (chain) => chain.toggleStrike(),
        },
        {
            name: 'blockquote',
            icon: <BlockquoteIcon />,
            command: (chain) => chain.toggleBlockquote(),
        },
        {
            name: 'code',
            icon: <CodeIcon />,
            command: (chain) => chain.toggleCode(),
        },
        {
            name: 'codeBlock',
            icon: <CodeBlockIcon />,
            command: (chain) => chain.toggleCodeBlock(),
        },
    ],
    HEADING_LEVELS.map((level) => ({
        name: 'heading',
        icon: HEADING_LEVEL_TO_ICON_MAP[level],
        command: (chain) => chain.toggleHeading({ level }),
        isActiveAttributes: { level },
    })),
    [
        {
            name: 'orderedList',
            icon: <OrderedListIcon />,
            command: (chain) => chain.toggleOrderedList(),
        },
        {
            name: 'bulletList',
            icon: <BulletListIcon />,
            command: (chain) => chain.toggleBulletList(),
        },
        {
            name: 'undo',
            icon: <UndoIcon />,
            command: (chain) => chain.undo(),
            disabled: (editor) => !editor.can().undo(),
        },
        {
            name: 'redo',
            icon: <RedoIcon />,
            command: (chain) => chain.redo(),
            disabled: (editor) => !editor.can().redo(),
        },
    ],
]
