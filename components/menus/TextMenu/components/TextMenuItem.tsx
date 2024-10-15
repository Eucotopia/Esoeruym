'use client'

import { Button, CheckboxProps, cn, Link } from '@nextui-org/react'
import React from 'react'
import { Icon } from '@iconify/react'

export type TagGroupItemProps = Omit<CheckboxProps, 'icon'> & {
  icon?: string
  fontSize?: number
  onClick: () => void
}

const TextMenuItem = React.forwardRef<HTMLLabelElement, TagGroupItemProps>(
  ({ icon, value, isSelected, fontSize = 20, onClick }) => {
    return (
      <Button
        disableRipple
        isIconOnly
        as={Link}
        className={cn({
          'text-primary': isSelected,
        })}
        color={'default'}
        size={'sm'}
        variant={'light'}
        onPress={onClick}
      >
        {icon ? <Icon fontSize={fontSize} icon={icon} /> : value}
      </Button>
    )
  }
)

TextMenuItem.displayName = 'TagGroupItem'

export default TextMenuItem
