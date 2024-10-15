import { Button, Input, Switch } from '@nextui-org/react'
import React, { useState, useCallback, useMemo } from 'react'
import { Icon } from '@iconify/react'

export type LinkEditorPanelProps = {
  initialUrl?: string
  initialOpenInNewTab?: boolean
  onSetLink: (url: string, openInNewTab?: boolean) => void
}
export const useLinkEditorState = ({
  onSetLink,
  initialOpenInNewTab,
  initialUrl,
}: LinkEditorPanelProps) => {
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
    [url, isValidUrl, openInNewTab, onSetLink]
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
export const LinkEditorPanel = ({
  onSetLink,
  initialOpenInNewTab,
  initialUrl,
}: LinkEditorPanelProps) => {
  const state = useLinkEditorState({ onSetLink, initialOpenInNewTab, initialUrl })

  return (
    <div
      className={'flex flex-col justify-center items-start shadow-md bg-content1 p-2 rounded-md'}
    >
      <form
        className="flex flex-row items-center justify-center mb-2 gap-2"
        onSubmit={state.handleSubmit}
      >
        <Input
          className={'w-full'}
          placeholder="Enter URL"
          radius={'sm'}
          size={'sm'}
          startContent={<Icon fontSize={30} icon={'lucide:link'} />}
          type={'url'}
          value={state.url}
          onChange={state.onChange}
        />
        <Button disabled={!state.isValidUrl} radius={'sm'} size={'sm'} type={'submit'}>
          Set Link
        </Button>
      </form>
      <Switch color="primary" isSelected={state.openInNewTab} onValueChange={state.setOpenInNewTab}>
        Open in new tab
      </Switch>
    </div>
  )
}
