import { useEditorState } from '@tiptap/react'
import React from 'react'
import { Avatar, AvatarGroup, Tooltip } from '@nextui-org/react'

import { EditorHeaderProps } from '@/components/BlockEditor/components/EditorHeader'
import { getCollabStateColor } from '@/lib/utils'
import { EditorUser } from '@/components/BlockEditor/types'

export const EditorFooter: React.FC<EditorHeaderProps> = ({ editor, collabState, users }) => {
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
    <div className="flex justify-between items-center w-full">
      <div className="flex flex-col justify-center pr-4 mr-4 text-right dark:border-neutral-800">
        <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
          {words} {words === 1 ? 'word' : 'words'}
        </div>
        <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
          {characters} {characters === 1 ? 'character' : 'characters'}
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="relative flex flex-row items-center ml-3">
          <AvatarGroup isBordered max={5} size="sm" total={users.length}>
            {users.slice(0, 3).map((user: EditorUser) => (
              <Tooltip
                key={user.clientId}
                closeDelay={0}
                content={user.name}
                delay={0}
                motionProps={{
                  variants: {
                    exit: {
                      opacity: 0,
                      transition: {
                        duration: 0.1,
                        ease: 'easeIn',
                      },
                    },
                    enter: {
                      opacity: 1,
                      transition: {
                        duration: 0.15,
                        ease: 'easeOut',
                      },
                    },
                  },
                }}
              >
                <Avatar
                  isBordered
                  color={getCollabStateColor(collabState)}
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                />
              </Tooltip>
            ))}
          </AvatarGroup>
        </div>
      </div>
    </div>
  )
}
