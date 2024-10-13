import {Icon} from '@iconify/react'
import {Popover, PopoverContent, PopoverTrigger} from '@nextui-org/react'
import {Link} from "@nextui-org/link";
import {LinkEditorPanel} from '@/components/tiptap/panels/LinkEditorPanel';

export type EditLinkPopoverProps = {
    onSetLink: (link: string, openInNewTab?: boolean) => void
}

export const EditLinkPopover = ({onSetLink}: EditLinkPopoverProps) => {
    return (
        <Popover showArrow={true}>
            <PopoverTrigger>
                <Link className={"text-default-400"}>
                    <Icon icon={"lucide:link"} fontSize={20}/>
                </Link>
            </PopoverTrigger>
            <PopoverContent>
                <LinkEditorPanel onSetLink={onSetLink}/>
            </PopoverContent>
        </Popover>
    )
}