import { WebSocketStatus } from '@hocuspocus/provider'
import { Editor } from '@tiptap/react'
import { CheckboxGroup } from '@nextui-org/react'
import React, { memo } from 'react'

import { EditorUser } from '../types'

import { FileFormatPicker } from '@/components/menus/TextMenu/components/FileFormatPicker'

export type EditorHeaderProps = {
  isSidebarOpen?: boolean
  toggleSidebar?: () => void
  editor: Editor
  collabState: WebSocketStatus
  users: EditorUser[]
}

const MemoFileFormatPicker = memo(FileFormatPicker)

export const EditorHeader = ({
  editor,
  collabState,
  users,
  isSidebarOpen,
  toggleSidebar,
}: EditorHeaderProps) => {
  return (
    <>
      <CheckboxGroup aria-label="Text style options" className="gap-1" orientation="horizontal">
        <MemoFileFormatPicker editor={editor} />
      </CheckboxGroup>
    </>
  )
}
