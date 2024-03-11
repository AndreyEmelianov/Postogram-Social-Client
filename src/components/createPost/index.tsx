import { Controller, useForm } from 'react-hook-form'

import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
} from '../../app/services/postApi'
import { ErrorMessage } from '../errorMessage'

import { Button, Textarea } from '@nextui-org/react'
import { IoMdCreate } from 'react-icons/io'

export const CreatePost = () => {
  const [createPost] = useCreatePostMutation()
  const [triggerAllPosts] = useLazyGetAllPostsQuery()

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  const error = errors?.post?.message as string

  const onSubmit = handleSubmit(async data => {
    try {
      await createPost({ content: data.post }).unwrap()
      setValue('post', '')
      await triggerAllPosts().unwrap()
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <form className="flex-grow" onSubmit={onSubmit}>
      <Controller
        name="post"
        control={control}
        defaultValue={''}
        rules={{
          required: 'Обязательное поле',
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="Поделитесь вашими мыслями"
            className="mb-5"
          />
        )}
      />
      {errors && <ErrorMessage error={error} />}
      <Button
        color="success"
        className="flex-end"
        endContent={<IoMdCreate />}
        type="submit"
      >
        Опубликовать пост
      </Button>
    </form>
  )
}
