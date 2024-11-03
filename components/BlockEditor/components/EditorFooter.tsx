import { useEditorState } from '@tiptap/react'
import React from 'react'
import { Avatar, AvatarGroup, cn, Tooltip } from '@nextui-org/react'

import { EditorHeaderProps } from '@/components/BlockEditor/components/EditorHeader'
import { getConnectionText } from '@/lib/utils'
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
      <div className="flex items-center gap-2 mr-2">
        <div
          className={cn('w-2 h-2 rounded-full', {
            'bg-yellow-500 dark:bg-yellow-400': collabState === 'connecting',
            'bg-green-500 dark:bg-green-400': collabState === 'connected',
            'bg-red-500 dark:bg-red-400': collabState === 'disconnected',
          })}
        />
        <span className="max-w-[4rem] text-xs text-neutral-500 dark:text-neutral-400 font-semibold">
          {getConnectionText(collabState)}
        </span>
      </div>
      {collabState === 'connected' && (
        <div className="flex flex-row items-center">
          <div className="relative flex flex-row items-center ml-3">
            {users.slice(0, 3).map((user: EditorUser) => (
              <div key={user.clientId} className="-ml-3">
                <AvatarGroup
                  isBordered
                  max={3}
                  renderCount={count => (
                    <p className="text-small text-foreground font-medium ms-2">+{count} others</p>
                  )}
                  total={10}
                >
                  <Tooltip
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
                    <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                  </Tooltip>
                  <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                </AvatarGroup>
              </div>
            ))}
            {users.length > 3 && (
              <div className="-ml-3">
                <div className="flex items-center justify-center w-8 h-8 font-bold text-xs leading-none border border-white dark:border-black bg-[#FFA2A2] rounded-full">
                  +{users.length - 3}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
