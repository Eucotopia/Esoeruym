import { Slider, SliderValue } from '@nextui-org/react'
import { memo, useCallback, useEffect, useState } from 'react'

export type ImageBlockWidthProps = {
  onChange: (value: number) => void
  value: number
}

export const ImageBlockWidth = memo(({ onChange, value }: ImageBlockWidthProps) => {
  const [currentValue, setCurrentValue] = useState(value)

  useEffect(() => {
    setCurrentValue(value)
  }, [value])

  const handleChange = useCallback(
    (value: SliderValue) => {
      onChange(value as number)
    },
    [onChange]
  )

  return (
    <Slider
      aria-label="adjust image size"
      defaultValue={80}
      maxValue={100}
      minValue={25}
      showSteps={true}
      size="sm"
      step={25}
      value={currentValue}
      onChange={(value: SliderValue) => {
        handleChange(value)
      }}
    />
  )
})

ImageBlockWidth.displayName = 'ImageBlockWidth'
