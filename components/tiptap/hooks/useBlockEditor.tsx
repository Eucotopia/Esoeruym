'use client'
import {useEditor} from '@tiptap/react'
import ExtensionKit from '../extentions/extension-kit'
import {useEffect} from 'react'
import '../styles/index.css'

export const useBlockEditor = () => {
    const editor = useEditor({
        autofocus: true,
        extensions: [
            ...ExtensionKit()
        ],
        content: "Hello NextUI!Hello NextUI!Hello NextUI!Hello NextUI!Hello NextUI!Hello NextUI!",
        immediatelyRender: false
    }, [])

    useEffect(() => {
        if (!editor) {
            return undefined
        }
    }, [])

    const characterCount = editor?.storage.characterCount || {characters: () => 0, words: () => 0}

    return {editor, characterCount}
}