import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

export type ResultResponse<T> = {
  code: number
  data: T
  message: string
}
