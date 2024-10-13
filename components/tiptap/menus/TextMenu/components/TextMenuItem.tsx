"use client";

import {CheckboxProps, VisuallyHidden} from "@nextui-org/react";

import React from "react";
import {useCheckbox} from "@nextui-org/react";
import {Chip} from "@nextui-org/chip";
import {Icon} from "@iconify/react";
import {cn} from "@nextui-org/theme";


export type TagGroupItemProps = Omit<CheckboxProps, "icon"> & {
    icon?: string;
    fontSize?: number
};

const TextMenuItem = React.forwardRef<HTMLLabelElement, TagGroupItemProps>(
    ({icon, value, isSelected, fontSize = 30, size = "lg", ...props}, ref) => {

        const {isFocusVisible, getBaseProps, getLabelProps, getInputProps} =
            useCheckbox({
                ...props,
            });

        return (
            <label {...getBaseProps()} ref={ref}>
                <VisuallyHidden>
                    <input {...getInputProps()} />
                </VisuallyHidden>
                <Chip
                    classNames={{
                        base: cn("p-0", {
                            "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background": isFocusVisible,
                            "bg-primary": isSelected,
                        }),
                        content: cn("!text-small text-default-400 p-0", {
                            "text-primary-foreground": isSelected,
                        }),
                    }}
                    radius="sm"
                    size={size}
                    variant={"light"}
                    {...getLabelProps()}
                >
                    {
                        icon ? (
                            <Icon
                                className={cn("text-default-400 pointer-events-none", {
                                    "text-primary-foreground": isSelected,
                                })}
                                icon={icon}
                                fontSize={fontSize}
                            />
                        ) : value
                    }
                </Chip>
            </label>
        );
    },
);

TextMenuItem.displayName = "TagGroupItem";

export default TextMenuItem;
