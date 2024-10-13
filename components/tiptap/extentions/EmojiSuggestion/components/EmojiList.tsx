import React, {ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useState} from 'react'

import {EmojiListProps} from '../types'
import {SuggestionKeyDownProps} from '@tiptap/suggestion'
import {Listbox, ListboxItem, ScrollShadow} from '@nextui-org/react'
import {Image} from "@nextui-org/image";

export const ListboxWrapper = ({children}: { children: React.ReactNode }) => (
  <ScrollShadow
    hideScrollBar
    orientation="horizontal"
    className="max-w-[360px] max-h-[300px] rounded-small border-default-200 dark:border-default-100 border-small">
    {children}
  </ScrollShadow>
)


const EmojiList = forwardRef(
  (props: EmojiListProps, ref: ForwardedRef<{ onKeyDown: (evt: SuggestionKeyDownProps) => boolean }>) => {
    const [selectedIndex, setSelectedIndex] = useState(0)

    useEffect(() => setSelectedIndex(0), [props.items])

    const selectItem = useCallback(
      (index: number) => {
        const item = props.items[index]

        if (item) {
          props.command({name: item.name})
        }
      },
      [props],
    )

    useImperativeHandle(ref, () => {
      const scrollIntoView = (index: number) => {
        const item = props.items[index]

        if (item) {
          const node = document.querySelector(`[data-emoji-name="${item.name}"]`)

          if (node) {
            node.scrollIntoView({block: 'nearest'})
          }
        }
      }

      const upHandler = () => {
        const newIndex = (selectedIndex + props.items.length - 1) % props.items.length
        setSelectedIndex(newIndex)
        scrollIntoView(newIndex)
      }

      const downHandler = () => {
        const newIndex = (selectedIndex + 1) % props.items.length
        setSelectedIndex(newIndex)
        scrollIntoView(newIndex)
      }

      const enterHandler = () => {
        selectItem(selectedIndex)
      }

      return {
        onKeyDown: ({event}) => {
          if (event.key === 'ArrowUp') {
            upHandler()
            return true
          }

          if (event.key === 'ArrowDown') {
            downHandler()
            return true
          }

          if (event.key === 'Enter') {
            enterHandler()
            return true
          }

          return false
        },
      }
    }, [props, selectedIndex, selectItem])

    const createClickHandler = useCallback((index: number) => () => selectItem(index), [selectItem])

    if (!props.items || !props.items.length) {
      return null
    }

    return (
      <ListboxWrapper>
        <Listbox
          aria-label="select emoji"
          items={props.items}
          classNames={{
            base: "max-w-xs data-[hover=true]:bg-default-100/80",
            list: "max-h-[300px] overflow-scroll",
          }}
          variant="flat"
        >
          {props.items.map((item, index) => (
            <ListboxItem
              data-emoji-name={item.name}
              classNames={{
                base: `${index == selectedIndex ? 'bg-default-100/80' : ''}`
              }}
              aria-label={item.name}
              key={item.name}
              onPress={createClickHandler(index)}
              textValue={item.name}
              startContent={
                <>
                  {item.fallbackImage ? (
                    <Image src={item.fallbackImage} height={20} width={20} alt={"emoji"}/>
                  ) : (
                    item.emoji
                  )}{' '}
                </>
              }
            >
              :{item.name}:
            </ListboxItem>
          ))}
        </Listbox>
      </ListboxWrapper>
    )
  },
)

EmojiList.displayName = 'EmojiList'

export default EmojiList
