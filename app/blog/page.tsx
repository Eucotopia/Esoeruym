'use client'

import Code from '@tiptap/extension-code'
import Document from '@tiptap/extension-document'
import Link from '@tiptap/extension-link'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import React, { useCallback } from 'react'
import '@/components/tiptap/styles/index.css'

export default function BlogPage() {
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

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()

      return
    }
    console.log('adsfasdf')
    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <>
      <div className="control-group">
        <div className="button-group">
          <button className={editor.isActive('link') ? 'is-active' : ''} onClick={setLink}>
            Set link
          </button>
          <button
            disabled={!editor.isActive('link')}
            onClick={() => editor.chain().focus().unsetLink().run()}
          >
            Unset link
          </button>
        </div>
      </div>
      <EditorContent editor={editor} />
    </>
  )
}
