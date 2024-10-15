import { useCallback } from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Button,
  Link,
  cn,
} from '@nextui-org/react'
import { Icon } from '@iconify/react'

const FONT_FAMILY_GROUPS = [
  {
    label: 'Sans Serif',
    options: [
      { label: 'Inter', value: '' },
      { label: 'Arial', value: 'Arial' },
      { label: 'Helvetica', value: 'Helvetica' },
    ],
  },
  {
    label: 'Serif',
    options: [
      { label: 'Times New Roman', value: 'Times' },
      { label: 'Garamond', value: 'Garamond' },
      { label: 'Georgia', value: 'Georgia' },
    ],
  },
  {
    label: 'Monospace',
    options: [
      { label: 'Courier', value: 'Courier' },
      { label: 'Courier New', value: 'Courier New' },
    ],
  },
]

const FONT_FAMILIES = FONT_FAMILY_GROUPS.flatMap(group => group.options)

export type FontFamilyPickerProps = {
  onChange: (value: string) => void // eslint-disable-line no-unused-vars
  value: string
}

export const FontFamilyPicker = ({ onChange, value }: FontFamilyPickerProps) => {
  const currentValue = FONT_FAMILIES.find(font => font.value === value)
  const currentFontLabel = currentValue?.label.split(' ')[0] || 'Inter'

  const selectFont = useCallback((font: string) => () => onChange(font), [onChange])

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          disableRipple
          isIconOnly
          as={Link}
          className={cn({
            'text-primary': currentValue?.value !== 'Inter' && currentValue?.value,
          })}
          color={'default'}
          endContent={<Icon className="w-2 h-2" icon={'lucide:chevron-down'} />}
          size={'sm'}
          variant="light"
        >
          <span style={{ fontFamily: currentValue?.value || 'Inter' }}>{currentFontLabel}</span>
        </Button>
      </DropdownTrigger>

      <DropdownMenu aria-label="Font Family Picker Menu">
        {FONT_FAMILY_GROUPS.map(group => (
          <DropdownSection key={group.label} title={group.label}>
            {group.options.map(font => (
              <DropdownItem
                key={`${font.label}_${font.value}`}
                data-selected={value === font.value} // Automatically applies selected styles
                onPress={selectFont(font.value)}
              >
                <span style={{ fontFamily: font.value }}>{font.label}</span>
              </DropdownItem>
            ))}
          </DropdownSection>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
