import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react'
import React, { useCallback } from 'react'
import { Listbox, ListboxItem } from '@nextui-org/react'
import { Icon } from '@iconify/react'

import { isColumnGripSelected } from './utils'

import { MenuProps, ShouldShowProps } from '@/components/menus/types'

export const TableColumnMenu = React.memo(({ editor, appendTo }: MenuProps): JSX.Element => {
  const shouldShow = useCallback(
    ({ view, state, from }: ShouldShowProps) => {
      if (!state) {
        return false
      }

      return isColumnGripSelected({ editor, view, state, from: from || 0 })
    },
    [editor]
  )

  const onAddColumnBefore = useCallback(() => {
    editor.chain().focus().addColumnBefore().run()
  }, [editor])

  const onAddColumnAfter = useCallback(() => {
    editor.chain().focus().addColumnAfter().run()
  }, [editor])

  const onDeleteColumn = useCallback(() => {
    editor.chain().focus().deleteColumn().run()
  }, [editor])

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="tableColumnMenu"
      shouldShow={shouldShow}
      tippyOptions={{
        appendTo: () => {
          return appendTo?.current
        },
        offset: [0, 15],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
      }}
      updateDelay={0}
    >
      <Listbox aria-label="Actions" className={'bg-content2 rounded-md'}>
        <ListboxItem
          key="Add column before"
          startContent={<Icon height={18} icon="icon-park-solid:align-left" width={18} />}
          onPress={onAddColumnBefore}
        >
          Add column before
        </ListboxItem>
        <ListboxItem
          key="Add column after"
          startContent={<Icon height={18} icon="icon-park-solid:align-right" width={18} />}
          onPress={onAddColumnAfter}
        >
          Add column after
        </ListboxItem>
        <ListboxItem
          key="Delete colum"
          className="text-danger"
          color="danger"
          startContent={<Icon icon="mdi:trash" />}
          onPress={onDeleteColumn}
        >
          Delete colum
        </ListboxItem>
      </Listbox>
    </BaseBubbleMenu>
  )
})

TableColumnMenu.displayName = 'TableColumnMenu'

export default TableColumnMenu
