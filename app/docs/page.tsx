'use client'
import {useBlockEditor} from "@/components/tiptap/hooks/useBlockEditor";
import {EditorContent} from "@tiptap/react";
import {BlockEditor} from "@/components/tiptap/BlockEditor";

export default function DocsPage() {
  const {editor, characterCount} = useBlockEditor()

  if (!editor) {
    return null
  }

  return (
    <BlockEditor editor={editor}/>
  );
}
