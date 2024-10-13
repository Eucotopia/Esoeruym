import DragHandle from '@tiptap-pro/extension-drag-handle-react'
import {Editor} from '@tiptap/react'
import {useEffect, useState} from 'react'
import {useData} from './hooks/useData'
import useContentItemActions from './hooks/useContentItemActions'
import {Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from '@nextui-org/react'
import {Icon} from '@iconify/react'

export type ContentItemMenuProps = {
    editor: Editor
}
const items = [
    {
        key: "new",
        label: "New file",
    },
    {
        key: "copy",
        label: "Copy link",
    },
    {
        key: "edit",
        label: "Edit file",
    },
    {
        key: "delete",
        label: "Delete file",
    }
];
export const ContentItemMenu = ({editor}: ContentItemMenuProps) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const data = useData()
    const actions = useContentItemActions(editor, data.currentNode, data.currentNodePos)

    useEffect(() => {
        if (menuOpen) {
            editor.commands.setMeta('lockDragHandle', true)
        } else {
            editor.commands.setMeta('lockDragHandle', false)
        }
    }, [editor, menuOpen])

    return (
        <DragHandle
            pluginKey="ContentItemMenu"
            editor={editor}
            onNodeChange={data.handleNodeChange}
            tippyOptions={{
                offset: [-2, 16],
                zIndex: 99,
            }}
        >
            <Dropdown
                type={'listbox'}
                onOpenChange={(isOpen) => {
                    setMenuOpen(isOpen)
                    editor.commands.setMeta('lockDragHandle', isOpen)
                }}
            >
                <DropdownTrigger
                    onMouseDown={
                        (e) => {
                            e.stopPropagation()
                        }
                    }
                >
                    adsf
                    {/*<Icon icon="lucide:grip-vertical" fontSize={40}/>*/}
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions" items={items}>
                    {(item) => (
                        <DropdownItem
                            key={item.key}
                            color={item.key === "delete" ? "danger" : "default"}
                            className={item.key === "delete" ? "text-danger" : ""}
                        >
                            {item.label}
                        </DropdownItem>
                    )}
                </DropdownMenu>
            </Dropdown>
        </DragHandle>
    )
}