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
        appId: '7me3og69',
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzA1MjY4OTEsIm5iZiI6MTczMDUyNjg5MSwiZXhwIjoxNzMwNjEzMjkxLCJpc3MiOiJodHRwczovL2Nsb3VkLnRpcHRhcC5kZXYiLCJhdWQiOiI3bWUzb2c2OSJ9.X2DQAhQQZ835OVQB4KEClIyiE5B5Dz14yUfo2TTXY38',
      }),
    ],
  })
  // Connect to your Collaboration server
  useEffect(() => {
    const provider = new TiptapCollabProvider({
      name: 'liwei', // Unique document identifier for syncing. This is your document name.
      appId: '7me3og69',
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzA1MjY4OTEsIm5iZiI6MTczMDUyNjg5MSwiZXhwIjoxNzMwNjEzMjkxLCJpc3MiOiJodHRwczovL2Nsb3VkLnRpcHRhcC5kZXYiLCJhdWQiOiI3bWUzb2c2OSJ9.X2DQAhQQZ835OVQB4KEClIyiE5B5Dz14yUfo2TTXY38',
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
      <EditorContent editor={editor} />
    </>
  )
}
