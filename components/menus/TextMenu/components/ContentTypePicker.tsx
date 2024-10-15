import { useMemo } from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Link,
  cn,
  DropdownSection,
} from '@nextui-org/react'
import { Icon } from '@iconify/react'

export type ContentTypePickerOption = {
  label: string
  id: string
  disabled: () => boolean
  isActive: () => boolean
  onClick: () => void
  icon: string
}

export type ContentTypePickerCategory = {
  label: string
  id: string
  children: ContentTypePickerOption[]
}

export type ContentPickerOptions = Array<ContentTypePickerCategory>

export type ContentTypePickerProps = {
  options: ContentPickerOptions
}

export const ContentTypePicker = ({ options }: ContentTypePickerProps) => {
  const activeItem = useMemo(() => {
    // Find the active item in the nested structure
    return options.flatMap(option => option.children).find(option => option.isActive())
  }, [options])

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          disableRipple
          isIconOnly
          as={Link}
          className={cn({
            'text-primary': activeItem?.id !== 'paragraph' && activeItem?.id,
          })}
          color={'default'}
          endContent={<Icon className="w-2 h-2" icon={'lucide:chevron-down'} />}
          size={'sm'}
          variant="light"
        >
          <Icon fontSize={20} icon={activeItem?.icon || 'lucide:pilcrow'} />
        </Button>
      </DropdownTrigger>

      <DropdownMenu aria-label="Content Type Picker Menu" variant="faded">
        {options.map(category => (
          <DropdownSection key={category.id} title={category.label}>
            {category.children.map(child => (
              <DropdownItem
                key={child.id}
                classNames={{
                  base: `data-hover:${child.isActive()}`,
                }}
                startContent={<Icon className="w-4 h-4 mr-1" icon={child.icon} />}
                onPress={child.onClick}
              >
                {child.label}
              </DropdownItem>
            ))}
          </DropdownSection>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
