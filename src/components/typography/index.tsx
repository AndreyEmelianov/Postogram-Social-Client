import type { FC } from 'react'

type TypographyProps = {
  children: string
  size?: string
}

export const Typography: FC<TypographyProps> = ({
  children,
  size = 'text-xl',
}) => {
  return <p className={`${size}`}>{children}</p>
}
