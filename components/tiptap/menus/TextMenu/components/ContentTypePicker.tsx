import {useMemo} from 'react';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    DropdownSection,
    Button,
    Link,
    cn,
} from "@nextui-org/react";
import {Icon} from '@iconify/react';

export type ContentTypePickerOption = {
    label: string;
    id: string;
    disabled: () => boolean;
    isActive: () => boolean;
    onClick: () => void;
    icon: string;
};

export type ContentTypePickerCategory = {
    label: string;
    id: string;
    children: ContentTypePickerOption[];
};

export type ContentPickerOptions = Array<ContentTypePickerCategory>;

export type ContentTypePickerProps = {
    options: ContentPickerOptions;
};

export const ContentTypePicker = ({options}: ContentTypePickerProps) => {
    const activeItem = useMemo(() => {
        // Find the active item in the nested structure
        return options
            .flatMap(option => option.children)
            .find(option => option.isActive());
    }, [options]);

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    as={Link}
                    variant="light"
                    size={"sm"}
                    color={"default"}
                    isIconOnly
                    className={cn({
                        "text-primary": activeItem?.id !== "paragraph" && activeItem?.id
                    })}
                    disableRipple
                    endContent={<Icon icon={"lucide:chevron-down"} className="w-2 h-2"/>}
                >
                    <Icon icon={activeItem?.icon || 'lucide:pilcrow'} fontSize={20}/>
                </Button>
            </DropdownTrigger>

            <DropdownMenu variant="faded" aria-label="Content Type Picker Menu">
                {options.map(category => (
                    <DropdownSection title={category.label} key={category.id}>
                        {category.children.map(child => (
                            <DropdownItem
                                key={child.id}
                                onPress={child.onClick}
                                classNames={{
                                    base: `data-hover:${child.isActive()}`
                                }}
                                startContent={<Icon icon={child.icon} className="w-4 h-4 mr-1"/>}
                            >
                                {child.label}
                            </DropdownItem>
                        ))}
                    </DropdownSection>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};