import {BubbleMenu, Editor} from '@tiptap/react'
import {useTextmenuStates} from './hooks/useTextmenuStates'
import {useTextmenuCommands} from "@/components/tiptap/menus/TextMenu/hooks/useTextmenuCommands";
import {useTextmenuContentTypes} from './hooks/useTextmenuContentTypes';
import {CheckboxGroup} from '@nextui-org/react';
import TextMenuItem from './components/TextMenuItem';
import {memo} from 'react'
import {EditLinkPopover} from './components/EditLinkPopover'

const MemoButton = memo(TextMenuItem)

export type TextMenuProps = {
    editor: Editor
}

export const TextMenu = ({editor}: TextMenuProps) => {
    const commands = useTextmenuCommands(editor)
    const states = useTextmenuStates(editor)
    const blockOptions = useTextmenuContentTypes(editor)
    return (
        < BubbleMenu
            tippyOptions={
                {
                    popperOptions: {
                        placement: 'top-start',
                        modifiers:
                            [
                                {
                                    name: 'preventOverflow',
                                    options: {
                                        boundary: 'viewport',
                                        padding: 8,
                                    },
                                },
                                {
                                    name: 'flip',
                                    options: {
                                        fallbackPlacements: ['bottom-start', 'top-end', 'bottom-end'],
                                    },
                                },
                            ],
                    }
                    ,
                    maxWidth: 'calc(100vw - 16px)',
                }
            }
            editor={editor}
            pluginKey="textMenu"
            shouldShow={states.shouldShow}
            updateDelay={100}
        >
            <CheckboxGroup aria-label="Text style options" className="gap-1" orientation="horizontal">
                <MemoButton icon="lucide:bold" value="Bold"
                            isSelected={states.isBold}
                            onClick={commands.onBold}
                />
                <MemoButton icon="lucide:italic" value="Italic"
                            isSelected={states.isItalic}
                            onClick={commands.onItalic}
                />
                <MemoButton icon="lucide:underline" value="Underline"
                            isSelected={states.isUnderline}
                            onClick={commands.onUnderline}
                            fontSize={30}
                />
                <MemoButton icon="lucide:strikethrough" value="Strike"
                            isSelected={states.isStrike}
                            onClick={commands.onStrike}
                />
                <MemoButton icon="lucide:code" value="Code"
                            isSelected={states.isCode}
                            onClick={commands.onCode}
                />
                <MemoButton icon="lucide:square-code" value="CodeBlock"
                            onClick={commands.onCodeBlock}
                />
                {/*TODO bug 未解决*/}
                <EditLinkPopover onSetLink={commands.onLink}/>
            </CheckboxGroup>

        </BubbleMenu>
    )
}