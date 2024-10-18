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
      <Listbox aria-label="Actions" className={'bg-content1 rounded-md'}>
        <ListboxItem
          key="Add row before"
          startContent={<Icon fontSize={18} icon="lucide:align-vertical-distribute-start" />}
          onPress={onAddRowBefore}
        >
          Add row before
        </ListboxItem>
        <ListboxItem
          key="Add row after"
          startContent={<Icon fontSize={18} icon="lucide:align-vertical-distribute-end" />}
          onPress={onAddRowAfter}
        >
          Add row after
        </ListboxItem>
        <ListboxItem
          key="Delete row"
          className="text-danger"
          color="danger"
          startContent={<Icon fontSize={18} icon="lucide:trash-2" />}
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
