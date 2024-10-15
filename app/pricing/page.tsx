'use client'
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react'

export default function PricingPage() {
  return (
    <Popover placement="right">
      <PopoverTrigger>
        <div>adsf</div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">Popover Content</div>
          <div className="text-tiny">This is the popover content</div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
