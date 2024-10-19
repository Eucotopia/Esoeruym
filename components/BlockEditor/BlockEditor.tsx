import { EditorContent } from '@tiptap/react'
import React, { useRef } from 'react'
import * as Y from 'yjs'
import { TiptapCollabProvider } from '@hocuspocus/provider'

import { TextMenu } from '../menus/TextMenu'

import { EditorHeader } from './components/EditorHeader'

import { ContentItemMenu } from '@/components/menus'
import { LinkMenu } from '@/components/menus'
import { useBlockEditor } from '@/hooks/useBlockEditor'
import '@/styles/index.css'

import { Sidebar } from '@/components/Sidebar'
import ImageBlockMenu from '@/extentions/ImageBlock/components/ImageBlockMenu'
import { ColumnsMenu } from '@/extentions/MultiColumn/menus'
import { TableColumnMenu, TableRowMenu } from '@/extentions/Table/menus'
import { useSidebar } from '@/hooks/useSidebar'

export const BlockEditor = ({
  aiToken,
  ydoc,
  provider,
}: {
  aiToken?: string
  hasCollab: boolean
  ydoc: Y.Doc
  provider?: TiptapCollabProvider | null | undefined
}) => {
  const menuContainerRef = useRef(null)

  const leftSidebar = useSidebar()
  const { editor, users, collabState } = useBlockEditor({ aiToken, ydoc, provider })

  if (!editor || !users) {
    return null
  }

  return (
    <div ref={menuContainerRef} className="flex h-full">
      <Sidebar editor={editor} isOpen={leftSidebar.isOpen} onClose={leftSidebar.close} />
      <div className="relative flex flex-col flex-1 h-full overflow-hidden">
        <EditorHeader
          collabState={collabState}
          editor={editor}
          isSidebarOpen={leftSidebar.isOpen}
          toggleSidebar={leftSidebar.toggle}
          users={users}
        />
        <EditorContent className="flex-1 overflow-y-auto px-2" editor={editor} />
        <ContentItemMenu editor={editor} />
        <LinkMenu appendTo={menuContainerRef} editor={editor} />
        <TextMenu editor={editor} />
        <ColumnsMenu appendTo={menuContainerRef} editor={editor} />
        <TableRowMenu appendTo={menuContainerRef} editor={editor} />
        <TableColumnMenu appendTo={menuContainerRef} editor={editor} />
        <ImageBlockMenu appendTo={menuContainerRef} editor={editor} />
      </div>
    </div>
  )
}

export default BlockEditor
