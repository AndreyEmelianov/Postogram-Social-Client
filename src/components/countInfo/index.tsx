import type { FC } from 'react'

type CountInfoProps = {
  count: number
  title: string
}

export const CountInfo: FC<CountInfoProps> = ({ title, count }) => {
  return (
    <div className="flex flex-col items-center space-x-2 p-4">
      <span className="text-4xl font-semibold">{count}</span>
      <span>{title}</span>
    </div>
  )
}
