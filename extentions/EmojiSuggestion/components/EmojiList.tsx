import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { SuggestionKeyDownProps } from '@tiptap/suggestion'
import { Listbox, ListboxItem, ScrollShadow } from '@nextui-org/react'
import { Image } from '@nextui-org/image'

import { EmojiListProps } from '../types'

const EmojiList = forwardRef(
  (
    props: EmojiListProps,
    ref: ForwardedRef<{ onKeyDown: (evt: SuggestionKeyDownProps) => boolean }>,
  ) => {
    const [selectedIndex, setSelectedIndex] = useState(0)

    useEffect(() => setSelectedIndex(0), [props.items])

    const selectItem = useCallback(
      (index: number) => {
        const item = props.items[index]

        if (item) {
          props.command({ name: item.name })
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
            node.scrollIntoView({ block: 'nearest' })
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
        onKeyDown: ({ event }) => {
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
      <Listbox
        aria-label="select emoji"
        classNames={{
          base: 'max-w-[300px] bg-content1 overflow-scroll ',
          list: 'max-h-[300px] overflow-y-auto',
        }}
        items={props.items}
        variant="flat"
      >
        {props.items.map((item, index) => (
          <ListboxItem
            key={item.name}
            aria-label={item.name}
            classNames={{
              base: `${index == selectedIndex ? 'bg-content3' : ''}`,
            }}
            data-emoji-name={item.name}
            startContent={
              <>
                {item.fallbackImage ? (
                  <Image alt={'emoji'} height={20} src={item.fallbackImage} width={20} />
                ) : (
                  item.emoji
                )}{' '}
                {selectItem}
              </>
            }
            textValue={item.name}
            onPress={createClickHandler(index)}
          >
            :{item.name}:
          </ListboxItem>
        ))}
      </Listbox>
    )
  },
)

EmojiList.displayName = 'EmojiList'

export default EmojiList
