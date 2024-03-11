import type { FC } from 'react'

import { BASE_URL } from '../../constants'

import { User as NextUser } from '@nextui-org/react'

type UserProps = {
  name: string
  avatarUrl: string
  description?: string
  className?: string
}

export const User: FC<UserProps> = ({
  name = '',
  avatarUrl = '',
  description = '',
  className = '',
}) => {
  return (
    <NextUser
      name={name}
      className={className}
      description={description}
      avatarProps={{
        src: `${BASE_URL}${avatarUrl}`,
      }}
    />
  )
}
