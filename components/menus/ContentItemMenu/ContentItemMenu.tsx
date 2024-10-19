import DragHandle from '@tiptap-pro/extension-drag-handle-react'
import { Editor } from '@tiptap/react'
import { useEffect, useState } from 'react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { Icon } from '@iconify/react'

import { useData } from './hooks/useData'
import useContentItemActions from './hooks/useContentItemActions'

export type ContentItemMenuProps = {
  editor: Editor
}
const items = [
  {
    key: 'new',
    label: 'New file',
  },
  {
    key: 'copy',
    label: 'Copy link',
  },
  {
    key: 'edit',
    label: 'Edit file',
  },
  {
    key: 'delete',
    label: 'Delete file',
  },
]

export const ContentItemMenu = ({ editor }: ContentItemMenuProps) => {
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
      editor={editor}
      pluginKey="ContentItemMenu"
      tippyOptions={{
        offset: [-2, 4],
        zIndex: 999,
      }}
      onNodeChange={data.handleNodeChange}
    >
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly size={'sm'} variant={'light'}>
            <Icon fontSize={20} icon="lucide:grip-vertical" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            key="clear formatting"
            startContent={<Icon icon="lucide:remove-formatting" />}
            onPress={actions.resetTextFormatting}
          >
            Clear formatting
          </DropdownItem>
          <DropdownItem
            key="copy to clipboard"
            startContent={<Icon icon="lucide:clipboard" />}
            onPress={actions.copyNodeToClipboard}
          >
            Copy to clipboard
          </DropdownItem>
          <DropdownItem
            key="duplicate"
            startContent={<Icon icon="lucide:copy" />}
            onPress={actions.duplicateNode}
          >
            Duplicate
          </DropdownItem>
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            startContent={<Icon icon="lucide:trash-2" />}
            onPress={actions.deleteNode}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </DragHandle>
  )
}
