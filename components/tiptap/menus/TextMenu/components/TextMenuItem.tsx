"use client";

import {Button, CheckboxProps, cn, Link} from "@nextui-org/react";

import React from "react";
import {Icon} from "@iconify/react";


export type TagGroupItemProps = Omit<CheckboxProps, "icon"> & {
    icon?: string;
    fontSize?: number
    onClick: () => void
};

const TextMenuItem = React.forwardRef<HTMLLabelElement, TagGroupItemProps>(
    ({icon, value, isSelected, fontSize = 20, onClick}) => {
        return (
            <Button
                onPress={onClick}
                as={Link}
                variant={"light"}
                className={cn({
                    "text-primary": isSelected
                })}
                size={"sm"}
                color={"default"}
                isIconOnly
                disableRipple
            >
                {
                    icon ? (
                        <Icon
                            icon={icon}
                            fontSize={fontSize}
                        />
                    ) : value
                }
            </Button>
        );
    },
);

TextMenuItem.displayName = "TagGroupItem";

export default TextMenuItem;
