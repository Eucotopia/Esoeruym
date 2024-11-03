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

export const ContentItemMenu = ({ editor }: ContentItemMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const data = useData()
  const actions = useContentItemActions(editor, data.currentNode, data.currentNodePos)

  const items = [
    {
      key: 'clear formatting',
      label: 'Clear formatting',
      icon: 'lucide:remove-formatting',
      onPress: actions.resetTextFormatting,
    },
    {
      key: 'copy to clipboard',
      label: 'Copy to clipboard',
      icon: 'lucide:clipboard',
      onPress: actions.copyNodeToClipboard,
    },
    {
      key: 'duplicate',
      label: 'Duplicate',
      icon: 'lucide:copy',
      onPress: actions.duplicateNode,
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: 'lucide:trash-2',
      onPress: actions.deleteNode,
    },
  ]

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
        <DropdownMenu aria-label="Static Actions" items={items}>
          {item => (
            <DropdownItem
              key={item.key}
              color={item.key === 'delete' ? 'danger' : 'default'}
              startContent={<Icon icon={item.icon} />}
              onPress={item.onPress}
            >
              {item.label}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </DragHandle>
  )
}
