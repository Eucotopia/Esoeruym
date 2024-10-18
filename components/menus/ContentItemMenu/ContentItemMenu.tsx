import DragHandle from '@tiptap-pro/extension-drag-handle-react'
import { Editor } from '@tiptap/react'
import { useEffect, useState } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'

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
        offset: [-2, 16],
        zIndex: 99,
      }}
      onNodeChange={data.handleNodeChange}
    >
      asdsd
    </DragHandle>
  )
}
