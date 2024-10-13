import {Button, Input, Switch} from '@nextui-org/react'
import React, {useState, useCallback, useMemo} from 'react'
import {Icon} from "@iconify/react";

export type LinkEditorPanelProps = {
    initialUrl?: string
    initialOpenInNewTab?: boolean
    onSetLink: (url: string, openInNewTab?: boolean) => void
}
export const useLinkEditorState = ({onSetLink, initialOpenInNewTab, initialUrl}: LinkEditorPanelProps) => {
    const [url, setUrl] = useState(initialUrl || '')
    
    const [openInNewTab, setOpenInNewTab] = useState(initialOpenInNewTab || false)

    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value)
    }, [])

    const isValidUrl = useMemo(() => /^(\S+):(\/\/)?\S+$/.test(url), [url])

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault()
            if (isValidUrl) {
                onSetLink(url, openInNewTab)
            }
        },
        [url, isValidUrl, openInNewTab, onSetLink],
    )

    return {
        url,
        setUrl,
        openInNewTab,
        setOpenInNewTab,
        onChange,
        handleSubmit,
        isValidUrl,
    }
}
export const LinkEditorPanel = ({onSetLink, initialOpenInNewTab, initialUrl}: LinkEditorPanelProps) => {
    const state = useLinkEditorState({onSetLink, initialOpenInNewTab, initialUrl})
    return (
        <div className={"flex flex-col justify-center items-start shadow-md bg-content1 p-2 rounded-md"}>
            <form onSubmit={state.handleSubmit} className="flex flex-row items-center justify-center mb-2 gap-2">
                <Input
                    placeholder="Enter URL"
                    type={"url"}
                    size={"sm"}
                    radius={"sm"}
                    value={state.url}
                    onChange={state.onChange}
                    startContent={
                        <Icon icon={"lucide:link"} fontSize={30}/>
                    }
                    className={"w-full"}/>
                <Button
                    type={"submit"}
                    disabled={!state.isValidUrl}
                    size={"sm"}
                    radius={"sm"}>
                    Set Link
                </Button>
            </form>
            <Switch
                isSelected={state.openInNewTab}
                onValueChange={state.setOpenInNewTab}
                color="primary">
                Open in new tab
            </Switch>
        </div>
    )
}