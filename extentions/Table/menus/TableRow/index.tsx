import {BubbleMenu as BaseBubbleMenu} from "@tiptap/react";
import React, {useCallback} from "react";
import {Listbox, ListboxItem} from "@nextui-org/react";
import {isRowGripSelected} from './utils'
import {MenuProps, ShouldShowProps} from '@/components/tiptap/menus/types'
import {Icon} from "@iconify/react";

export const TableRowMenu = React.memo(
    ({editor, appendTo}: MenuProps): JSX.Element => {
        const shouldShow = useCallback(
            ({view, state, from}: ShouldShowProps) => {
                if (!state || !from) {
                    return false;
                }

                return isRowGripSelected({editor, view, state, from});
            },
            [editor],
        );

        const onAddRowBefore = useCallback(() => {
            editor.chain().focus().addRowBefore().run();
        }, [editor]);

        const onAddRowAfter = useCallback(() => {
            editor.chain().focus().addRowAfter().run();
        }, [editor]);

        const onDeleteRow = useCallback(() => {
            editor.chain().focus().deleteRow().run();
        }, [editor]);

        return (
            <BaseBubbleMenu
                editor={editor}
                pluginKey="tableRowMenu"
                updateDelay={0}
                tippyOptions={{
                    appendTo: () => {
                        return appendTo?.current;
                    },
                    placement: "left",
                    offset: [0, 15],
                    popperOptions: {
                        modifiers: [{name: "flip", enabled: false}],
                    },
                }}
                shouldShow={shouldShow}
            >
                <Listbox aria-label="Actions" className={"bg-content2 rounded-md"}>
                    <ListboxItem
                        key="Add row before"
                        startContent={
                            <Icon icon="bi:align-top" width={18} height={18}></Icon>
                        }
                        onPress={onAddRowBefore}>
                        >
                        Add row before
                    </ListboxItem>
                    <ListboxItem
                        key="Add row after"
                        startContent={
                            <Icon icon="bi:align-bottom" width={18} height={18}></Icon>
                        }
                        onPress={onAddRowAfter}
                    >
                        Add row after
                    </ListboxItem>
                    <ListboxItem
                        key="Delete row"
                        onPress={onDeleteRow}
                        className="text-danger"
                        startContent={<Icon icon="mdi:trash"></Icon>}
                        color="danger"
                    >
                        Delete row
                    </ListboxItem>
                </Listbox>
            </BaseBubbleMenu>
        );
    },
);

TableRowMenu.displayName = "TableRowMenu";

export default TableRowMenu;
