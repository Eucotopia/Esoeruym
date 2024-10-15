import { Group } from './types'

export const GROUPS: Group[] = [
  {
    name: 'ai',
    title: 'AI',
    commands: [
      {
        name: 'aiWriter',
        label: 'AI Writer',
        iconName: 'lucide:stars',
        description: 'Let AI finish your thoughts',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => editor.chain().focus().setAiWriter().run(),
      },
      {
        name: 'aiImage',
        label: 'AI Image',
        iconName: 'lucide:stars',
        description: 'Generate an image from text',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => editor.chain().focus().setAiImage().run(),
      },
    ],
  },
  {
    name: 'format',
    title: 'Format',
    commands: [
      {
        name: 'heading1',
        label: 'Heading 1',
        iconName: 'lucide:heading-1',
        description: 'High priority section title',
        aliases: ['h1'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 1 }).run()
        },
      },
      {
        name: 'heading2',
        label: 'Heading 2',
        iconName: 'lucide:heading-2',
        description: 'Medium priority section title',
        aliases: ['h2'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 2 }).run()
        },
      },
      {
        name: 'heading3',
        label: 'Heading 3',
        iconName: 'lucide:heading-3',
        description: 'Low priority section title',
        aliases: ['h3'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 3 }).run()
        },
      },
      {
        name: 'bulletList',
        label: 'Bullet List',
        iconName: 'lucide:list',
        description: 'Unordered list of items',
        aliases: ['ul'],
        action: editor => {
          editor.chain().focus().toggleBulletList().run()
        },
      },
      {
        name: 'numberedList',
        label: 'Numbered List',
        iconName: 'lucide:list-ordered',
        description: 'Ordered list of items',
        aliases: ['ol'],
        action: editor => {
          editor.chain().focus().toggleOrderedList().run()
        },
      },
      {
        name: 'taskList',
        label: 'Task List',
        iconName: 'lucide:list-todo',
        description: 'Task list with todo items',
        aliases: ['todo'],
        action: editor => {
          editor.chain().focus().toggleTaskList().run()
        },
      },
      {
        name: 'toggleList',
        label: 'Toggle List',
        iconName: 'lucide:list-collapse',
        description: 'Toggles can show and hide content',
        aliases: ['toggle'],
        action: editor => {
          editor.chain().focus().setDetails().run()
        },
      },
      {
        name: 'blockquote',
        label: 'Blockquote',
        iconName: 'lucide:quote',
        description: 'Element for quoting',
        action: editor => {
          editor.chain().focus().setBlockquote().run()
        },
      },
      {
        name: 'codeBlock',
        label: 'Code Block',
        iconName: 'lucide:square-code',
        description: 'Code block with syntax highlighting',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => {
          editor.chain().focus().setCodeBlock().run()
        },
      },
    ],
  },
  {
    name: 'media',
    title: 'Media',
    commands: [
      {
        name: 'youtube',
        label: 'Youtube',
        iconName: 'lucide:youtube',
        description: 'add youtube',
        action: editor => {
          editor.chain().focus().setCodeBlock().run()
        },
      },
    ],
  },
  {
    name: 'insert',
    title: 'Insert',
    commands: [
      {
        name: 'table',
        label: 'Table',
        iconName: 'lucide:table',
        description: 'Insert a table',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => {
          editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run()
        },
      },
      {
        name: 'image',
        label: 'Image',
        iconName: 'lucide:image',
        description: 'Insert an image',
        aliases: ['img'],
        action: editor => {
          editor.chain().focus().setImageUpload().run()
        },
      },
      {
        name: 'columns',
        label: 'Columns',
        iconName: 'lucide:columns-2',
        description: 'Add two column content',
        aliases: ['cols'],
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => {
          editor
            .chain()
            .focus()
            .setColumns()
            .focus(editor.state.selection.head - 1)
            .run()
        },
      },
      {
        name: 'horizontalRule',
        label: 'Horizontal Rule',
        iconName: 'lucide:equal',
        description: 'Insert a horizontal divider',
        aliases: ['hr'],
        action: editor => {
          editor.chain().focus().setHorizontalRule().run()
        },
      },
      {
        name: 'toc',
        label: 'Table of Contents',
        iconName: 'lucide:book-minus',
        aliases: ['outline'],
        description: 'Insert a table of contents',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => {
          editor.chain().focus().insertTableOfContents().run()
        },
      },
    ],
  },
]

export default GROUPS
