import { Link } from '@nextui-org/link'
import { Divider } from '@nextui-org/divider'
import { Button } from '@nextui-org/react'
import { Icon } from '@iconify/react'

export type LinkPreviewPanelProps = {
  url: string
  onEdit: () => void
  onClear: () => void
}

export const LinkPreviewPanel = ({ onClear, onEdit, url }: LinkPreviewPanelProps) => {
  return (
    <div className={'flex bg-content1 rounded-md shadow-md items-center gap-2 p-2'}>
      <Link
        className="text-sm underline text-foreground  overflow-x-hidden max-w-60"
        href={url}
        rel={'noopener noreferrer'}
        target={'_blank'}
      >
        {url}
      </Link>
      <div className="flex h-5 items-center self-center  text-small">
        <Divider orientation="vertical" />
      </div>
      <Button isIconOnly size={'sm'} variant={'light'} onPress={onEdit}>
        <Icon fontSize={30} icon={'lucide:pencil'} />
      </Button>
      <Button isIconOnly size={'sm'} variant={'light'} onPress={onClear}>
        <Icon fontSize={30} icon={'lucide:pencil'} />
      </Button>
    </div>
  )
}
