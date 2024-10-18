'use client'

import Code from '@tiptap/extension-code'
import Document from '@tiptap/extension-document'
import Link from '@tiptap/extension-link'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import React, { useCallback, useState } from 'react'
import { Export } from '@tiptap-pro/extension-export'

import '@/styles/index.css'

export default function BlogPage() {
  const [isLoading, setIsLoading] = useState(false)
  const createExport = useCallback(format => () => {
    setIsLoading(true)

    editor.chain().export({
      format,
      onExport(context) {
        context.download()
        setIsLoading(false)
      },
    }).run()
  }, [editor])
  const editor = useEditor({
    editable: true,
    extensions: [
      Document,
      Paragraph,
      Code,
      Text,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Export.configure({
        appId: 'your-app-id',
        token: 'your-jwt',
      }),
    ],
    content: `
        <p>
          Wow, this editor has support for links to the whole <a href="https://en.wikipedia.org/wiki/World_Wide_Web">world wide web</a>. We tested a lot of URLs and I think you can add *every URL* you want. Isn’t that cool? Let’s try <a href="https://statamic.com/">another one!</a> Yep, seems to work.
        </p>
        <p>
          By default every link will get a <code>rel="noopener noreferrer nofollow"</code> attribute. It’s configurable though.
        </p>
      `,
  })
  if (!editor) {
    return null
  }

  if (!editor) {
    return null
  }

  return (
    <>
      <EditorContent editor={editor} />
    </>
  )
}
