import { Link } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import { selectCurrent } from '../../features/user/userSlice'
import { User } from '../../components/user'

import { Card, CardBody } from '@nextui-org/react'

export const Followers = () => {
  const currentUser = useAppSelector(selectCurrent)

  if (!currentUser) return null

  return currentUser.followers.length > 0 ? (
    <div className="gap-5 flex flex-col">
      {currentUser.followers.map(user => (
        <Link to={`/users/${user.follower.id}`} key={user.id}>
          <Card>
            <CardBody className="block">
              <User
                name={user.follower.name ?? ''}
                avatarUrl={user.follower.avatarUrl ?? ''}
                description={user.follower.email ?? ''}
              />
            </CardBody>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <h2>У вас пока нет подписчиков</h2>
  )
}
