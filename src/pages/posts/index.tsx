import { useGetAllPostsQuery } from '../../app/services/postApi'
import { Card } from '../../components/card'
import { CreatePost } from '../../components/createPost'

export const Posts = () => {
  const { data } = useGetAllPostsQuery()

  return (
    <>
      <div className="mb-10 w-full">
        <CreatePost />
      </div>
      {data && data.length > 0
        ? data.map(
            ({
              id,
              comments,
              content,
              author,
              authorId,
              likes,
              likedByUser,
              createdAt,
            }) => (
              <Card
                id={id}
                key={id}
                avatarUrl={author.avatarUrl ?? ''}
                content={content}
                name={author.name ?? ''}
                likedByUser={likedByUser}
                likesCount={likes.length}
                commentsCount={comments.length}
                authorId={authorId}
                createdAt={createdAt}
                cardFor="post"
              />
            ),
          )
        : null}
    </>
  )
}
