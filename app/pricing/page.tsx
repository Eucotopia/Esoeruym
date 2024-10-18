'use client'

import React from 'react'
import { ScrollShadow } from '@nextui-org/react'
import { Content } from '@/app/pricing/content'

export default function PricingPage() {
  return (
    <ScrollShadow className="w-[300px] max-h-[200px]">
      <Content />
    </ScrollShadow>
  )
}
