import { SVGProps } from 'react'

function ExchangeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={33}
      height={30}
      fill="none"
      {...props}
    >
      <g fill="#2E80D9">
        <path d="M30 17.71c0 2.8-1.68 3-2 3H3.41l5.29-5.29L7.29 14l-7 7a1 1 0 0 0 0 1.41l7 7L8.7 28l-5.29-5.29H28c1.38 0 4-1 4-5v-3h-2v3Z" />
        <path d="M2 11.71c0-2.8 1.68-3 2-3h24.59L23.3 14l1.41 1.41 7-7a1 1 0 0 0 0-1.41l-7-7-1.42 1.42 5.3 5.29H4c-1.38 0-4 1-4 5v3h2v-3Z" />
      </g>
    </svg>
  )
}
export default ExchangeIcon
