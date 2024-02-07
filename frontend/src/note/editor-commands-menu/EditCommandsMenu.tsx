import { FC } from 'react'
import { Editor } from '@tiptap/react'
import { CommandButton } from './CommandButton'
import { COMMAND_BUTTON_GROUPS } from './commands'
import { CommandButtonGroup } from './CommandButtonGroup'
import { EditCommandsMenuContainer } from './EditCommandsMenuContainer'

type EditorCommandsMenuProps = {
    editor: Editor | null
}

export const EditorCommandsMenu: FC<EditorCommandsMenuProps> = ({ editor }) => {
    if (!editor) {
        return null
    }

    return (
        <EditCommandsMenuContainer>
            {COMMAND_BUTTON_GROUPS.map((group, groupIdx) => (
                <CommandButtonGroup key={groupIdx}>
                    {group.map(({ name, command, icon, disabled }, idx) => {
                        const runCommand = () => {
                            const chainedCommand = editor.chain().focus()
                            command(chainedCommand).run()
                        }

                        return (
                            <CommandButton
                                key={`${name}-${groupIdx}-${idx}`}
                                isActive={editor.isActive(name)}
                                onClick={runCommand}
                                disabled={disabled ? disabled(editor) : false}
                            >
                                {icon}
                            </CommandButton>
                        )
                    })}
                </CommandButtonGroup>
            ))}
        </EditCommandsMenuContainer>
    )
}
