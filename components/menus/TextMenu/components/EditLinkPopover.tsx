import {Icon} from '@iconify/react'
import {Button, Popover, PopoverContent, PopoverTrigger} from '@nextui-org/react'
import {Link} from "@nextui-org/link";
import {LinkEditorPanel} from '@/components/panels/LinkEditorPanel';

export type EditLinkPopoverProps = {
    onSetLink: (link: string, openInNewTab?: boolean) => void
}

export const EditLinkPopover = ({onSetLink}: EditLinkPopoverProps) => {
    return (
        <Popover showArrow={true}>
            <PopoverTrigger>
                <Button
                    as={Link}
                    variant={"light"}
                    size={"sm"}
                    color={"default"}
                    isIconOnly
                    disableRipple
                >
                    <Icon icon={"lucide:link"} fontSize={20}/>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <LinkEditorPanel onSetLink={onSetLink}/>
            </PopoverContent>
        </Popover>
    )
}