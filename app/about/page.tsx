'use client'
import Document from '@/app/[room]/page'
import { v4 as uuid } from 'uuid'
import { useEffect, useState } from 'react'
import { Button, useDisclosure } from '@nextui-org/react'

export default function AboutPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()


  return (
    <>
      <Button onPress={onOpen}>asdf</Button>
      <Document room={"room"} isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  )
}
