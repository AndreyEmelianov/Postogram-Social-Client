import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { BASE_URL } from '../../constants'
import { selectCurrent } from '../../features/user/userSlice'

import { Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import { MdAlternateEmail } from 'react-icons/md'

export const Profile = () => {
  const currentUser = useAppSelector(selectCurrent)

  if (!currentUser) return null

  const { name, email, avatarUrl, id } = currentUser

  return (
    <Card className="py-4 w-[302px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <Image
          className="object-cover rounded-xl"
          alt="card-profile"
          src={`${BASE_URL}${avatarUrl}`}
          width={370}
        />
      </CardHeader>
      <CardBody>
        <Link to={`/users/${id}`}>
          <h4 className="font-bold text-large mb-2">{name}</h4>
        </Link>
        <p className="text-default-500 flex items-center gap-2">
          <MdAlternateEmail />
          {email}
        </p>
      </CardBody>
    </Card>
  )
}
