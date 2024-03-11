import { useParams } from 'react-router-dom'

import { useGetPostByIdQuery } from '../../app/services/postApi'
import { Card } from '../../components/card'
import { GoBack } from '../../components/GoBackButton'
import { CreateComment } from '../../components/createComment'

export const CurrentPost = () => {
  const params = useParams<{ id: string }>()
  const { data } = useGetPostByIdQuery(params.id ?? '')

  if (!data) {
    return <h2>Такого поста не существует</h2>
  }

  const {
    id,
    content,
    author,
    authorId,
    comments,
    likes,
    likedByUser,
    createdAt,
  } = data

  return (
    <>
      <GoBack />
      <Card
        id={id}
        cardFor="current-post"
        avatarUrl={author.avatarUrl ?? ''}
        content={content}
        name={author.name ?? ''}
        authorId={authorId}
        likesCount={likes.length}
        commentsCount={comments.length}
        likedByUser={likedByUser}
        createdAt={createdAt}
      />
      <div className="mt-10">
        <CreateComment />
      </div>
      <div className="mt-10">
        {data.comments
          ? data.comments.map(comment => (
              <Card
                id={id}
                key={comment.id}
                cardFor="comment"
                name={comment.user.name ?? ''}
                avatarUrl={comment.user.avatarUrl ?? ''}
                content={comment.content}
                authorId={comment.userId}
                commentId={comment.id}
              />
            ))
          : null}
      </div>
    </>
  )
}
