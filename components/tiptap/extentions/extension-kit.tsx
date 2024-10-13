'use client'

import {isChangeOrigin} from '@tiptap/extension-collaboration'
import {
//    BlockquoteFigure,
    CharacterCount,
    CodeBlock,
    Color,
    Details,
    DetailsContent,
    DetailsSummary,
    Document,
    Dropcursor,
    Emoji,
//    Figcaption,
    FileHandler,
    Focus,
    SmilieReplacer,
    FontFamily,
//    FontSize,
    Heading,
    Highlight,
    HorizontalRule,
//    ImageBlock,
    Link,
    Placeholder,
    Selection,
    SlashCommand,
    StarterKit,
    Subscript,
    Superscript,
//    Table,
    TableOfContents,
//    TableCell,
//    TableHeader,
//    TableRow,
    TextAlign,
    TextStyle,
//    TrailingNode,
    Typography,
    Underline,
    emojiSuggestion,
//    Columns,
//    Column,
    TaskItem,
    TaskList,
    UniqueID,
} from '.'

export const ExtensionKit = () => [
    Document,
    TaskList,
    TaskItem.configure({
        nested: true,
    }),
    Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
    }),
    Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
    }),
    Selection,
    HorizontalRule,
    UniqueID.configure({
        types: ['paragraph', 'heading', 'blockquote', 'codeBlock', 'table'],
        filterTransaction: transaction => !isChangeOrigin(transaction),
    }),
    StarterKit.configure({
        document: false,
        dropcursor: false,
        heading: false,
        horizontalRule: false,
        blockquote: false,
        history: false,
        codeBlock: false,
    }),
    Emoji.configure({
        enableEmoticons: true,
        suggestion: emojiSuggestion,
    }),
    Details.configure({
        persist: true,
        HTMLAttributes: {
            class: 'details',
        },
    }),
    DetailsContent,
    SmilieReplacer,
    DetailsSummary,
    TextStyle,
    FontFamily,
    Color,
    Highlight.configure({multicolor: true}),
    Underline,
    CodeBlock,
    CharacterCount.configure({limit: 50000}),
    TableOfContents,
    TextAlign.extend({
        addKeyboardShortcuts() {
            return {}
        },
    }).configure({
        types: ['heading', 'paragraph'],
    }),
    Subscript,
    Superscript,
    Typography,
    Placeholder.configure({
        includeChildren: true,
        showOnlyCurrent: false,
        placeholder: () => '',
    }),
    Focus,
    SlashCommand,
    Dropcursor.configure({
        width: 2,
        class: 'ProseMirror-dropcursor border-black',
    }),
]

export default ExtensionKit