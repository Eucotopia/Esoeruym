import React, { useRef } from 'react'
import * as Y from 'yjs'
import { TiptapCollabProvider } from '@hocuspocus/provider'
import { Modal, ModalBody, ModalContent } from '@nextui-org/react'
import { ModalFooter, ModalHeader } from '@nextui-org/modal'
import { EditorContent } from '@tiptap/react'

import { EditorHeader } from './components/EditorHeader'

import { useBlockEditor } from '@/hooks/useBlockEditor'
import '@/styles/index.css'

import { useSidebar } from '@/hooks/useSidebar'
import { EditorFooter } from '@/components/BlockEditor/components/EditorFooter'
import { ContentItemMenu, LinkMenu, TextMenu } from '@/components/menus'
import { ColumnsMenu } from '@/extentions/MultiColumn/menus'
import { TableColumnMenu, TableRowMenu } from '@/extentions/Table/menus'
import ImageBlockMenu from '@/extentions/ImageBlock/components/ImageBlockMenu'

interface EditArticleProps {
  aiToken?: string
  ydoc: Y.Doc
  provider?: TiptapCollabProvider | null | undefined
  isOpen: boolean
  onOpenChange: () => void
  hasCollab?: boolean
  room?: string
}

export const BlockEditor: React.FC<EditArticleProps> = ({
  aiToken,
  ydoc,
  provider,
  isOpen,
  onOpenChange,
}) => {
  const menuContainerRef = useRef(null)

  const leftSidebar = useSidebar()
  const { editor, users, collabState } = useBlockEditor({ aiToken, ydoc, provider })

  if (!editor || !users) {
    return null
  }

  return (
    <>
      <Modal
        ref={menuContainerRef}
        hideCloseButton
        backdrop={'blur'}
        classNames={{
          body: '',
          base: '',
          header: '',
          footer: '',
        }}
        isOpen={isOpen}
        scrollBehavior={'inside'}
        size={'5xl'}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 ">
                <EditorHeader
                  collabState={collabState}
                  editor={editor}
                  isSidebarOpen={leftSidebar.isOpen}
                  toggleSidebar={leftSidebar.toggle}
                  users={users}
                />
              </ModalHeader>
              <ModalBody>
                <EditorContent
                  className=" overflow-y-auto scrollbar-hide min-h-96"
                  editor={editor}
                />
                <ContentItemMenu editor={editor} />
                <LinkMenu appendTo={menuContainerRef} editor={editor} />
                <TextMenu editor={editor} />
                <ColumnsMenu appendTo={menuContainerRef} editor={editor} />
                <TableRowMenu appendTo={menuContainerRef} editor={editor} />
                <TableColumnMenu appendTo={menuContainerRef} editor={editor} />
                <ImageBlockMenu appendTo={menuContainerRef} editor={editor} />
              </ModalBody>
              <ModalFooter>
                <EditorFooter collabState={collabState} editor={editor} users={users} />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default BlockEditor
