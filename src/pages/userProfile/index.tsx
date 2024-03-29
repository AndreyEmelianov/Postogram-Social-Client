import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { resetUser, selectCurrent } from '../../features/user/userSlice'
import {
  useGetUserByIdQuery,
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from '../../app/services/userApi'
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from '../../app/services/followApi'
import { GoBack } from '../../components/GoBackButton'
import { BASE_URL } from '../../constants'
import { ProfileInfo } from '../../components/profileInfo'
import { formatToClientDate } from '../../utils/formatToClientDate'
import { CountInfo } from '../../components/countInfo'
import { EditProfile } from '../../components/editProfile'

import { Button, Card, Image, useDisclosure } from '@nextui-org/react'
import {
  MdOutlinePersonAddAlt1,
  MdOutlinePersonAddDisabled,
} from 'react-icons/md'
import { CiEdit } from 'react-icons/ci'

export const UserProfile = () => {
  const { id } = useParams<{ id: string }>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const currentUser = useAppSelector(selectCurrent)
  const dispatch = useAppDispatch()

  const { data } = useGetUserByIdQuery(id ?? '')
  const [followUser] = useFollowUserMutation()
  const [unfollowUser] = useUnfollowUserMutation()
  const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery()
  const [triggerCurrentQuery] = useLazyCurrentQuery()

  useEffect(() => {
    dispatch(resetUser())
  }, [dispatch])

  if (!data) return null

  const handleFollow = async () => {
    try {
      if (id) {
        data.isFollowing
          ? await unfollowUser(id).unwrap()
          : await followUser({ followingId: id }).unwrap()

        await triggerGetUserByIdQuery(id)
        await triggerCurrentQuery()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleClose = async () => {
    try {
      if (id) {
        await triggerGetUserByIdQuery(id)
        await triggerCurrentQuery()
        onClose()
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <GoBack />
      <div className="flex items-start gap-4">
        <Card className="flex items-center flex-col text-center space-y-4 p-5 flex-2">
          <Image
            className="border-4 border-white"
            src={`${BASE_URL}${data?.avatarUrl}`}
            alt={data?.name}
            width={200}
            height={200}
          />
          <div className="flex flex-col text-2xl font-bold gap-4 items-center">
            {data.name}
            {currentUser && currentUser.id !== id ? (
              <Button
                color={data.isFollowing ? 'default' : 'primary'}
                variant="flat"
                className="gap-2"
                onClick={handleFollow}
                endContent={
                  data.isFollowing ? (
                    <MdOutlinePersonAddDisabled />
                  ) : (
                    <MdOutlinePersonAddAlt1 />
                  )
                }
              >
                {data.isFollowing ? 'Отписаться' : 'Подписаться'}
              </Button>
            ) : (
              <Button endContent={<CiEdit />} onClick={() => onOpen()}>
                Редактировать
              </Button>
            )}
          </div>
        </Card>
        <Card className="flex flex-col space-y-4 p-5 flex-1">
          <ProfileInfo title="Почта" info={data.email} />
          <ProfileInfo title="Местоположение" info={data.location} />
          <ProfileInfo
            title="Дата рождения"
            info={formatToClientDate(data.dateOfBirth)}
          />
          <ProfileInfo title="Обо мне" info={data.bio} />

          <div className="flex gap-2">
            <CountInfo count={data.followers.length} title="Подписчики" />
            <CountInfo count={data.following.length} title="Подписки" />
          </div>
        </Card>
      </div>
      <EditProfile isOpen={isOpen} onClose={handleClose} user={data} />
    </>
  )
}
