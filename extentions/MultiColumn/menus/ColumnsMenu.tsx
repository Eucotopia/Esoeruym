import { BubbleMenu as BaseBubbleMenu, useEditorState } from '@tiptap/react'
import { useCallback } from 'react'
import { sticky } from 'tippy.js'
import { v4 as uuid } from 'uuid'

import { ColumnLayout } from '../Columns'

import { MenuProps } from '@/components/menus/types'
import { getRenderContainer } from '@/lib/utils'

export const ColumnsMenu = ({ editor, appendTo }: MenuProps) => {
  const getReferenceClientRect = useCallback(() => {
    const renderContainer = getRenderContainer(editor, 'columns')
    const rect = renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0)

    return rect
  }, [editor])

  const shouldShow = useCallback(() => {
    const isColumns = editor.isActive('columns')

    return isColumns
  }, [editor])

  const onColumnLeft = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.SidebarLeft).run()
  }, [editor])

  const onColumnRight = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.SidebarRight).run()
  }, [editor])

  const onColumnTwo = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.TwoColumn).run()
  }, [editor])
  const { isColumnLeft, isColumnRight, isColumnTwo } = useEditorState({
    editor,
    selector: ctx => {
      return {
        isColumnLeft: ctx.editor.isActive('columns', {
          layout: ColumnLayout.SidebarLeft,
        }),
        isColumnRight: ctx.editor.isActive('columns', {
          layout: ColumnLayout.SidebarRight,
        }),
        isColumnTwo: ctx.editor.isActive('columns', {
          layout: ColumnLayout.TwoColumn,
        }),
      }
    },
  })

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`columnsMenu-${uuid()}`}
      shouldShow={shouldShow}
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
        getReferenceClientRect,
        appendTo: () => appendTo?.current,
        plugins: [sticky],
        sticky: 'popper',
      }}
      updateDelay={0}
    >
      nnnnn
      {/*<Toolbar.Wrapper>*/}
      {/*  <Toolbar.Button active={isColumnLeft} tooltip="Sidebar left" onClick={onColumnLeft}>*/}
      {/*    <Icon name="PanelLeft" />*/}
      {/*  </Toolbar.Button>*/}
      {/*  <Toolbar.Button active={isColumnTwo} tooltip="Two columns" onClick={onColumnTwo}>*/}
      {/*    <Icon name="Columns2" />*/}
      {/*  </Toolbar.Button>*/}
      {/*  <Toolbar.Button active={isColumnRight} tooltip="Sidebar right" onClick={onColumnRight}>*/}
      {/*    <Icon name="PanelRight" />*/}
      {/*  </Toolbar.Button>*/}
      {/*</Toolbar.Wrapper>*/}
    </BaseBubbleMenu>
  )
}

export default ColumnsMenu
