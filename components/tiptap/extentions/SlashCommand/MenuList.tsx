import React, {useCallback, useEffect, useRef, useState} from 'react'

import {Command, MenuListProps} from './types'
import {ListboxWrapper} from "@/components/tiptap/extentions/EmojiSuggestion/components/EmojiList";
import {Listbox, ListboxItem} from '@nextui-org/listbox';
import {ListboxSection} from "@nextui-org/react";
import {Icon} from '@iconify/react';

export const MenuList = React.forwardRef((props: MenuListProps, ref) => {
    const scrollContainer = useRef<HTMLDivElement>(null)
    const activeItem = useRef<HTMLButtonElement>(null)
    const [selectedGroupIndex, setSelectedGroupIndex] = useState(0)
    const [selectedCommandIndex, setSelectedCommandIndex] = useState(0)

    // Anytime the groups change, i.e. the user types to narrow it down, we want to
    // reset the current selection to the first menu item
    useEffect(() => {
        setSelectedGroupIndex(0)
        setSelectedCommandIndex(0)
    }, [props.items])

    const selectItem = useCallback(
        (groupIndex: number, commandIndex: number) => {
            const command = props.items[groupIndex].commands[commandIndex]
            props.command(command)
        },
        [props],
    )

    React.useImperativeHandle(ref, () => ({

        onKeyDown: ({event}: { event: React.KeyboardEvent }) => {
            if (event.key === 'ArrowDown') {
                if (!props.items.length) {
                    return false
                }

                const commands = props.items[selectedGroupIndex].commands

                let newCommandIndex = selectedCommandIndex + 1
                let newGroupIndex = selectedGroupIndex

                if (commands.length - 1 < newCommandIndex) {
                    newCommandIndex = 0
                    newGroupIndex = selectedGroupIndex + 1
                }

                if (props.items.length - 1 < newGroupIndex) {
                    newGroupIndex = 0
                }

                setSelectedCommandIndex(newCommandIndex)
                setSelectedGroupIndex(newGroupIndex)

                return true
            }

            if (event.key === 'ArrowUp') {
                if (!props.items.length) {
                    return false
                }

                let newCommandIndex = selectedCommandIndex - 1
                let newGroupIndex = selectedGroupIndex

                if (newCommandIndex < 0) {
                    newGroupIndex = selectedGroupIndex - 1
                    newCommandIndex = props.items[newGroupIndex]?.commands.length - 1 || 0
                }

                if (newGroupIndex < 0) {
                    newGroupIndex = props.items.length - 1
                    newCommandIndex = props.items[newGroupIndex].commands.length - 1
                }

                setSelectedCommandIndex(newCommandIndex)
                setSelectedGroupIndex(newGroupIndex)

                return true
            }

            if (event.key === 'Enter') {
                if (!props.items.length || selectedGroupIndex === -1 || selectedCommandIndex === -1) {
                    return false
                }

                selectItem(selectedGroupIndex, selectedCommandIndex)

                return true
            }

            return false
        },
    }))

    useEffect(() => {
        const seletedItem = scrollContainer.current?.querySelector('[itemRef="true"]')

        if (seletedItem) {
            seletedItem.scrollIntoView({block: 'nearest', behavior: 'smooth'})
        }

    }, [selectedCommandIndex, selectedGroupIndex])

    const createCommandClickHandler = useCallback(
        (groupIndex: number, commandIndex: number) => {
            return () => {
                selectItem(groupIndex, commandIndex)
            }
        },
        [selectItem],
    )

    if (!props.items.length) {
        return null
    }

    return (
        <ListboxWrapper>
            <Listbox
                ref={scrollContainer}
                aria-label={"Select Slash Commands"}
                classNames={{
                    base: "max-w-xs data-[hover=true]:bg-default-100/80",
                    list: "max-h-[300px] overflow-scroll",
                }}
                items={props.items}
                variant="flat"
            >
                {
                    props.items.map((group, groupIndex) => (
                        <ListboxSection title={group.title} showDivider key={group.title}>
                            {
                                group.commands.map((command: Command, commandIndex: number) => (
                                    <ListboxItem
                                        textValue={command.name}
                                        key={command.name}
                                        classNames={{
                                            base: `${groupIndex == selectedGroupIndex && commandIndex == selectedCommandIndex ? 'bg-default-100/80' : ''}`
                                        }}
                                        startContent={
                                            <Icon icon={command.iconName}/>
                                        }
                                        onPress={createCommandClickHandler(groupIndex, commandIndex)}
                                        itemRef={groupIndex == selectedGroupIndex && commandIndex == selectedCommandIndex ? "true" : undefined}
                                    >
                                        {command.label}
                                    </ListboxItem>
                                ))
                            }
                        </ListboxSection>
                    ))
                }
            </Listbox>
        </ListboxWrapper>
    )
})

MenuList.displayName = 'MenuList'

export default MenuList
