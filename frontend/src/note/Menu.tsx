import { FC, ReactElement } from 'react'
import { Editor } from '@tiptap/react'
import ArrowGoBackIcon from '../assets/arrow-go-back.svg?react'
import ArrowGoForwardIcon from '../assets/arrow-go-forward.svg?react'
import BoldIcon from '../assets/bold.svg?react'
import BlockQuoteIcon from '../assets/block-quote.svg?react'
import CodeIcon from '../assets/code.svg?react'
import CodeBlockIcon from '../assets/code-block.svg?react'
import H1Icon from '../assets/h-1.svg?react'
import H2Icon from '../assets/h-2.svg?react'
import H3Icon from '../assets/h-3.svg?react'
import H4Icon from '../assets/h-4.svg?react'
import H5Icon from '../assets/h-5.svg?react'
import H6Icon from '../assets/h-6.svg?react'
import ItalicIcon from '../assets/italic.svg?react'
import OrderedListIcon from '../assets/list-ordered.svg?react'
import StrikeIcon from '../assets/strikethrough.svg?react'
import UnderlineIcon from '../assets/underline.svg?react'
import UnorderedListIcon from '../assets/list-unordered.svg?react'
import { MenuButton } from './MenuButton'

type MenuProps = {
    editor: Editor | null
}

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

const HEADING_LEVELS: HeadingLevel[] = [1, 2, 3, 4, 5, 6]

const HEADING_LEVEL_TO_ICON_MAP: Record<HeadingLevel, ReactElement> = {
    1: <H1Icon />,
    2: <H2Icon />,
    3: <H3Icon />,
    4: <H4Icon />,
    5: <H5Icon />,
    6: <H6Icon />,
}

export const Menu: FC<MenuProps> = ({ editor }) => {
    if (!editor) {
        return null
    }

    return (
        <div className="flex flex-row gap-2 px-4 py-4 bg-zinc-900">
            <MenuButton
                isActive={editor.isActive('bold')}
                onClick={() => editor.chain().focus().toggleBold().run()}
            >
                <BoldIcon />
            </MenuButton>
            <MenuButton
                isActive={editor.isActive('italic')}
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                <ItalicIcon />
            </MenuButton>
            <MenuButton
                isActive={editor.isActive('underline')}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
                <UnderlineIcon />
            </MenuButton>
            <MenuButton
                isActive={editor.isActive('strike')}
                onClick={() => editor.chain().focus().toggleStrike().run()}
            >
                <StrikeIcon />
            </MenuButton>
            <MenuButton
                isActive={editor.isActive('code')}
                onClick={() => editor.chain().focus().toggleCode().run()}
            >
                <CodeIcon />
            </MenuButton>
            <MenuButton
                isActive={editor.isActive('codeBlock')}
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
                <CodeBlockIcon />
            </MenuButton>
            {HEADING_LEVELS.map((level) => {
                return (
                    <MenuButton
                        key={level}
                        isActive={editor.isActive('heading', { level })}
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level })
                                .run()
                        }
                    >
                        {HEADING_LEVEL_TO_ICON_MAP[level]}
                    </MenuButton>
                )
            })}
            <MenuButton
                isActive={editor.isActive('blockquote')}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
                <BlockQuoteIcon />
            </MenuButton>
            <MenuButton
                isActive={editor.isActive('orderedList')}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <OrderedListIcon />
            </MenuButton>
            <MenuButton
                isActive={editor.isActive('bulletList')}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
                <UnorderedListIcon />
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
            >
                <ArrowGoBackIcon />
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
            >
                <ArrowGoForwardIcon />
            </MenuButton>
        </div>
    )
}
