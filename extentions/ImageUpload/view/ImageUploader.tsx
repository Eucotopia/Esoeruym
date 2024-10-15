import { ChangeEvent, useCallback } from 'react'
import { Spinner, cn } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { Button } from '@nextui-org/button'

import { useDropZone, useFileUpload, useUploader } from './hooks'

export const ImageUploader = ({ onUpload }: { onUpload: (url: string) => void }) => {
  const { loading, uploadFile } = useUploader({ onUpload })
  const { handleUploadClick, ref } = useFileUpload()
  const { draggedInside, onDrop, onDragEnter, onDragLeave } = useDropZone({
    uploader: uploadFile,
  })

  const onFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => (e.target.files ? uploadFile(e.target.files[0]) : null),
    [uploadFile]
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 rounded-lg min-h-[10rem] bg-opacity-80">
        <Spinner className="text-neutral-500" />
      </div>
    )
  }

  const wrapperClass = cn(
    'flex flex-col items-center justify-center px-8 py-10 rounded-lg bg-opacity-80',
    draggedInside && 'bg-neutral-100'
  )

  return (
    <div
      className={wrapperClass}
      contentEditable={false}
      onDragLeave={onDragLeave}
      onDragOver={onDragEnter}
      onDrop={onDrop}
    >
      <Icon className="w-12 h-12 mb-4 text-black dark:text-white opacity-20" icon="lucide:image" />
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-sm font-medium text-center text-neutral-400 dark:text-neutral-500">
          {draggedInside ? 'Drop image here' : 'Drag and drop or'}
        </div>
        <div>
          <Button
            disabled={draggedInside}
            size={'sm'}
            startContent={<Icon icon="lucide:upload" />}
            variant="solid"
            onClick={handleUploadClick}
          >
            Upload an image
          </Button>
        </div>
      </div>
      <input
        ref={ref}
        accept=".jpg,.jpeg,.png,.webp,.gif"
        className="w-0 h-0 overflow-hidden opacity-0"
        type="file"
        onChange={onFileChange}
      />
    </div>
  )
}

export default ImageUploader
