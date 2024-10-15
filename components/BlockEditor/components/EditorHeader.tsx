import { WebSocketStatus } from '@hocuspocus/provider'
import { Editor } from '@tiptap/react'
import { useEditorState } from '@tiptap/react'

import { EditorUser } from '../types'

import { EditorInfo } from './EditorInfo'

export type EditorHeaderProps = {
  isSidebarOpen?: boolean
  toggleSidebar?: () => void
  editor: Editor
  collabState: WebSocketStatus
  users: EditorUser[]
}

export const EditorHeader = ({
  editor,
  collabState,
  users,
  isSidebarOpen,
  toggleSidebar,
}: EditorHeaderProps) => {
  const { characters, words } = useEditorState({
    editor,
    selector: (ctx): { characters: number; words: number } => {
      const { characters, words } = ctx.editor?.storage.characterCount || {
        characters: () => 0,
        words: () => 0,
      }

      return { characters: characters(), words: words() }
    },
  })

  return (
    <div className="flex flex-row items-center justify-between flex-none py-2 pl-6 pr-3 text-black bg-white border-b border-neutral-200 dark:bg-black dark:text-white dark:border-neutral-800">
      <div className="flex flex-row gap-x-1.5 items-center">
        <div className="flex items-center gap-x-1.5">
          {/*<Toolbar.Button*/}
          {/*  tooltip={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}*/}
          {/*  onClick={toggleSidebar}*/}
          {/*  active={isSidebarOpen}*/}
          {/*  className={isSidebarOpen ? 'bg-transparent' : ''}*/}
          {/*>*/}
          {/*  <Icon name={isSidebarOpen ? 'PanelLeftClose' : 'PanelLeft'} />*/}
          {/*</Toolbar.Button>*/}
        </div>
      </div>
      <EditorInfo characters={characters} collabState={collabState} users={users} words={words} />
    </div>
  )
}
