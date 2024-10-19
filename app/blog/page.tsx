'use client'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Export } from '@tiptap-pro/extension-export'
import React, { useCallback, useEffect, useState } from 'react'
import { TiptapCollabProvider } from '@hocuspocus/provider'

import * as Y from 'yjs'
import Collaboration from '@tiptap/extension-collaboration'
const doc = new Y.Doc()
export default function BlogPage() {
  const [isLoading, setIsLoading] = useState(false)
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write something...',
      }),
      Collaboration.configure({
        document: doc,
      }),
      Export.configure({
        appId: 'ok08z0e9',
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MjkzMTAxODIsImV4cCI6MTc2MDg0NjE4MiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.isC64t4pTGtaoOLkRF2S0TuDr-Z3JWgvaIEzIiC7Z3Y',
      }),
    ],
  })
  const createExport = useCallback(
    format => () => {
      setIsLoading(true)

      editor
        .chain()
        .export({
          format,
          onExport(context) {
            context.download()
            setIsLoading(false)
          },
        })
        .run()
    },
    [editor],
  )

  // Connect to your Collaboration server
  useEffect(() => {
    const provider = new TiptapCollabProvider({
      name: 'document.name', // Unique document identifier for syncing. This is your document name.
      appId: 'ok08z0e9',
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MjkzMTAxODIsImV4cCI6MTc2MDg0NjE4MiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.isC64t4pTGtaoOLkRF2S0TuDr-Z3JWgvaIEzIiC7Z3Y',
      document: doc,
      // The onSynced callback ensures initial content is set only once using editor.setContent(), preventing repetitive content loading on editor syncs.
      onSynced() {
        if (!doc.getMap('config').get('initialContentLoaded') && editor) {
          doc.getMap('config').set('initialContentLoaded', true)

          editor.commands.setContent(`
          <p>This is a radically reduced version of Tiptap. It has support for a document, with paragraphs and text. That’s it. It’s probably too much for real minimalists though.</p>
          <p>The paragraph extension is not really required, but you need at least one node. Sure, that node can be something different.</p>
          `)
        }
      },
    })
  }, [])
  if (!editor) {
    return null
  }
  return (
    <>
      <div className="control-group">
        <div className="button-group">
          <button disabled={editor.isEmpty} onClick={createExport('docx')}>Export to Word</button>
          <button disabled={editor.isEmpty} onClick={createExport('odt')}>Export to ODT</button>
          <button disabled={editor.isEmpty} onClick={createExport('md')}>Export to Markdown</button>
          <button disabled={editor.isEmpty} onClick={createExport('gfm')}>Export to GitHub Flavoured Markdown</button>
        </div>
        {isLoading && <div className="hint purple-spinner">Processing...</div>}
      </div>
      <EditorContent editor={editor} />
    </>
  )
}
