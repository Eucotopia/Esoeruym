import { Editor } from '@tiptap/react'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react'
import React, { useCallback } from 'react'
import { ExportFormat } from '@tiptap-pro/extension-export/dist/tiptap-pro/packages/extension-export/src/export'
import { ExportContext } from '@tiptap-pro/extension-export'

export const FileFormatPicker = ({ editor }: { editor: Editor }) => {
  const createExport = useCallback(
    (format: ExportFormat) => () => {
      editor
        .chain()
        .export({
          format,
          onExport(context: ExportContext) {
            if (context.download) {
              context.download()
            }
          },
        })
        .run()
    },
    [editor]
  )

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Import&Export</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown menu with description" variant="faded">
        <DropdownSection title="Actions">
          <DropdownItem
            key="export to markdown"
            description="Export to Markdown"
            shortcut="⌘N"
            onPress={createExport('md')}
            // startContent={<AddNoteIcon className={iconClasses} />}
          >
            Export to Markdown
          </DropdownItem>
          <DropdownItem
            key="export to ODT"
            description="Export to ODT"
            shortcut="⌘C"
            onPress={createExport('odt')}
            // startContent={<CopyDocumentIcon className={iconClasses} />}
          >
            Export to ODT
          </DropdownItem>
          <DropdownItem
            key="export to GitHub Flavoured Markdown"
            description="Export to GitHub Flavoured Markdown"
            shortcut="⌘⇧E"
            onPress={createExport('gfm')}
            // startContent={<EditDocumentIcon className={iconClasses} />}
          >
            Export to GitHub Flavoured Markdown
          </DropdownItem>
          <DropdownItem
            key="export to Word"
            description="Export to Word"
            shortcut="⌘⇧E"
            onPress={createExport('docx')}
            // startContent={<EditDocumentIcon className={iconClasses} />}
          >
            Export to Word
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
