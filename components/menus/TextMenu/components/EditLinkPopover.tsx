import { Icon } from '@iconify/react'
import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { Link } from '@nextui-org/link'

import { LinkEditorPanel } from '@/components/panels/LinkEditorPanel'

export type EditLinkPopoverProps = {
  onSetLink: (link: string, openInNewTab?: boolean) => void
}

export const EditLinkPopover = ({ onSetLink }: EditLinkPopoverProps) => {
  return (
    <Popover showArrow={true}>
      <PopoverTrigger>
        <Button disableRipple isIconOnly as={Link} color={'default'} size={'sm'} variant={'light'}>
          <Icon fontSize={20} icon={'lucide:link'} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <LinkEditorPanel onSetLink={onSetLink} />
      </PopoverContent>
    </Popover>
  )
}
