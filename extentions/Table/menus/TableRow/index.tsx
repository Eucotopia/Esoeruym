import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react'
import React, { useCallback } from 'react'
import { Listbox, ListboxItem } from '@nextui-org/react'
import { Icon } from '@iconify/react'

import { isRowGripSelected } from './utils'

import { MenuProps, ShouldShowProps } from '@/components/menus/types'

export const TableRowMenu = React.memo(({ editor, appendTo }: MenuProps): JSX.Element => {
  const shouldShow = useCallback(
    ({ view, state, from }: ShouldShowProps) => {
      if (!state || !from) {
        return false
      }

      return isRowGripSelected({ editor, view, state, from })
    },
    [editor]
  )

  const onAddRowBefore = useCallback(() => {
    editor.chain().focus().addRowBefore().run()
  }, [editor])

  const onAddRowAfter = useCallback(() => {
    editor.chain().focus().addRowAfter().run()
  }, [editor])

  const onDeleteRow = useCallback(() => {
    editor.chain().focus().deleteRow().run()
  }, [editor])

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="tableRowMenu"
      shouldShow={shouldShow}
      tippyOptions={{
        appendTo: () => {
          return appendTo?.current
        },
        placement: 'left',
        offset: [0, 15],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
      }}
      updateDelay={0}
    >
      <Listbox aria-label="Actions" className={'bg-content2 rounded-md'}>
        <ListboxItem
          key="Add row before"
          startContent={<Icon height={18} icon="bi:align-top" width={18} />}
          onPress={onAddRowBefore}
        >
          Add row before
        </ListboxItem>
        <ListboxItem
          key="Add row after"
          startContent={<Icon height={18} icon="bi:align-bottom" width={18} />}
          onPress={onAddRowAfter}
        >
          Add row after
        </ListboxItem>
        <ListboxItem
          key="Delete row"
          className="text-danger"
          color="danger"
          startContent={<Icon icon="mdi:trash" />}
          onPress={onDeleteRow}
        >
          Delete row
        </ListboxItem>
      </Listbox>
    </BaseBubbleMenu>
  )
})

TableRowMenu.displayName = 'TableRowMenu'

export default TableRowMenu
