'use client'

import { TiptapCollabProvider } from '@hocuspocus/provider'
import 'iframe-resizer/js/iframeResizer.contentWindow'
import { useSearchParams } from 'next/navigation'
import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Doc as YDoc } from 'yjs'
import { Button, useDisclosure } from '@nextui-org/react'

import { BlockEditor } from '@/components/BlockEditor'

export default function DocsPage() {
  const [provider, setProvider] = useState<TiptapCollabProvider | null>(null)
  const [collabToken, setCollabToken] = useState<string | null | undefined>("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzA1MjcxODYsIm5iZiI6MTczMDUyNzE4NiwiZXhwIjoxNzMwNjEzNTg2LCJpc3MiOiJodHRwczovL2Nsb3VkLnRpcHRhcC5kZXYiLCJhdWQiOiI3bWUzb2c2OSJ9.YfzgIb6NAXqMAZH3I-XrHGcexCOnzq3tFa8eR2qunNM")
  const [aiToken, setAiToken] = useState<string | null | undefined>()
  const searchParams = useSearchParams()

  const hasCollab = parseInt(searchParams?.get('noCollab') as string) !== 1 && collabToken !== null

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const room = '123123'

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      try {
        const response = await fetch('/api/collaboration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(
            'No collaboration token provided, please set TIPTAP_COLLAB_SECRET in your environment'
          )
        }
        const data = await response.json()

        const { token } = data

        // set state when the data received
        setCollabToken(token)
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message)
        }
        setCollabToken(null)

        return
      }
    }

    dataFetch()
  }, [])

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      try {
        const response = await fetch('/api/ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('No AI token provided, please set TIPTAP_AI_SECRET in your environment')
        }
        const data = await response.json()

        const { token } = data

        // set state when the data received
        setAiToken(token)
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message)
        }
        setAiToken(null)

        return
      }
    }

    dataFetch()
  }, [])

  const ydoc = useMemo(() => new YDoc(), [])

  useLayoutEffect(() => {
    if (hasCollab && collabToken) {
      console.log('collab token', collabToken)
      setProvider(
        new TiptapCollabProvider({
          name: `${process.env.NEXT_PUBLIC_COLLAB_DOC_PREFIX}${room}`,
          appId: process.env.NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID ?? '',
          token: collabToken,
          document: ydoc,
        })
      )
    }
  }, [setProvider, collabToken, ydoc, room, hasCollab])

  if ((hasCollab && !provider) || aiToken === undefined || collabToken === undefined) return

  return (
    <>
      <Button onPress={onOpen}>asdf</Button>
      <BlockEditor
        aiToken={aiToken ?? undefined}
        hasCollab={hasCollab}
        isOpen={isOpen}
        provider={provider}
        room={room}
        ydoc={ydoc}
        onOpenChange={onOpenChange}
      />
    </>
  )
}
