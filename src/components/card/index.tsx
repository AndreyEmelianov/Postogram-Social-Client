import { useState, type FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  useLikePostMutation,
  useUnlikePostMutation,
} from '../../app/services/likesApi'
import {
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from '../../app/services/postApi'
import { useDeleteCommentMutation } from '../../app/services/commentApi'
import { useAppSelector } from '../../app/hooks'
import { selectCurrent } from '../../features/user/userSlice'
import { formatToClientDate } from '../../utils/formatToClientDate'
import { hasErrorField } from '../../utils/hasErrorField'
import { User } from '../user'
import { Typography } from '../typography'
import { ErrorMessage } from '../errorMessage'
import { MetaInfo } from '../metaInfo'

import {
  CardBody,
  CardFooter,
  CardHeader,
  Card as NextCard,
  Spinner,
} from '@nextui-org/react'

import { FcDislike } from 'react-icons/fc'
import { FaRegComment } from 'react-icons/fa'
import { RiDeleteBinLine } from 'react-icons/ri'
import { MdOutlineFavoriteBorder } from 'react-icons/md'

type CardProps = {
  id: string
  name: string
  authorId: string
  avatarUrl: string
  content: string
  commentId?: string
  likesCount?: number
  commentsCount?: number
  createdAt?: Date
  updatedAt?: Date
  cardFor: 'comment' | 'post' | 'current-post'
  likedByUser?: boolean
}

export const Card: FC<CardProps> = ({
  id = '',
  name = '',
  authorId = '',
  avatarUrl = '',
  content = '',
  commentId = '',
  likesCount = 0,
  commentsCount = 0,
  createdAt,
  cardFor = 'post',
  likedByUser = false,
}) => {
  const [error, setError] = useState('')

  const [likePost] = useLikePostMutation()
  const [unlikePost] = useUnlikePostMutation()
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery()
  const [triggerGetPostById] = useLazyGetPostByIdQuery()
  const [deletePost, deletePostStatus] = useDeletePostMutation()
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()

  const currentUser = useAppSelector(selectCurrent)
  const navigate = useNavigate()

  const refetchPosts = async () => {
    switch (cardFor) {
      case 'post':
        await triggerGetAllPosts().unwrap()
        break
      case 'current-post':
        await triggerGetAllPosts().unwrap()
        break
      case 'comment':
        await triggerGetPostById(id).unwrap()
        break
      default:
        throw new Error('Неверный аргумент cardFor')
    }
  }

  const handleDeletePost = async () => {
    try {
      switch (cardFor) {
        case 'post':
          await deletePost(id).unwrap()
          await refetchPosts()
          break
        case 'current-post':
          await deletePost(id).unwrap()
          navigate('/')
          break
        case 'comment':
          await deleteComment(commentId).unwrap()
          await refetchPosts()
          break
        default:
          throw new Error('Неверный аргумент cardFor')
      }
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.error)
      } else {
        setError(error as string)
      }
    }
  }

  const handleLikeClick = async () => {
    try {
      likedByUser
        ? await unlikePost(id).unwrap()
        : await likePost({ postId: id }).unwrap()

      await triggerGetPostById(id).unwrap()
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.error)
      } else {
        setError(error as string)
      }
    }
  }

  return (
    <NextCard className="mb-5">
      <CardHeader className="justify-between items-center bg-transparent">
        <Link to={`/users/${authorId}`}>
          <User
            name={name}
            className="text-small font-semibold leading-none text-default-600"
            avatarUrl={avatarUrl}
            description={createdAt && formatToClientDate(createdAt)}
          />
        </Link>
        {authorId === currentUser?.id && (
          <div className="cursor-pointer" onClick={handleDeletePost}>
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
              <Spinner />
            ) : (
              <RiDeleteBinLine />
            )}
          </div>
        )}
      </CardHeader>
      <CardBody className="px-3 py-2 mb-5">
        <Typography>{content}</Typography>
      </CardBody>
      {cardFor !== 'comment' && (
        <CardFooter className="gap-3">
          <div className="flex gap-5 items-center">
            <div onClick={handleLikeClick}>
              <MetaInfo
                count={likesCount}
                Icon={likedByUser ? FcDislike : MdOutlineFavoriteBorder}
              />
            </div>
            <Link to={`/posts/${id}`}>
              <MetaInfo count={commentsCount} Icon={FaRegComment} />
            </Link>
          </div>
          <ErrorMessage error={error} />
        </CardFooter>
      )}
    </NextCard>
  )
}
