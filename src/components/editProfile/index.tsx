import { useContext, type FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'

import type { User } from '../../app/types'
import { ThemeContext } from '../themeProvider'
import { useUpdateUserMutation } from '../../app/services/userApi'
import { Input } from '../input'
import { ErrorMessage } from '../errorMessage'
import { hasErrorField } from '../../utils/hasErrorField'

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@nextui-org/react'
import { MdOutlineEmail } from 'react-icons/md'

type EditProfileProps = {
  isOpen: boolean
  onClose: () => void
  user?: User
}

export const EditProfile: FC<EditProfileProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  const [error, setError] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const { theme } = useContext(ThemeContext)
  const { id } = useParams<{ id: string }>()

  const [updateUser, { isLoading }] = useUpdateUserMutation()

  const { handleSubmit, control } = useForm<User>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: user?.email,
      name: user?.name,
      dateOfBirth: user?.dateOfBirth,
      bio: user?.bio,
      location: user?.location,
    },
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setSelectedFile(event.target.files[0])
    }
  }

  const onSubmit = async (data: User) => {
    if (id) {
      try {
        const formData = new FormData()
        data.name && formData.append('name', data.name)
        data.email &&
          data.email !== user?.email &&
          formData.append('email', data.email)
        data.dateOfBirth &&
          formData.append(
            'dateOfBirth',
            new Date(data.dateOfBirth).toISOString(),
          )
        data.bio && formData.append('bio', data.bio)
        data.location && formData.append('location', data.location)
        selectedFile && formData.append('avatar', selectedFile)

        await updateUser({ userData: formData, id }).unwrap()
        onClose()
      } catch (err) {
        if (hasErrorField(err)) {
          setError(err.data.error)
        }
      }
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`${theme} text-foreground`}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Редактирование профиля
            </ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  control={control}
                  name="email"
                  type="email"
                  label="Email"
                  endContent={<MdOutlineEmail />}
                />
                <Input control={control} name="name" type="text" label="Имя" />
                <input
                  type="file"
                  name="avatarUrl"
                  placeholder="Выбрать файл"
                  onChange={handleFileChange}
                />
                <Input
                  control={control}
                  name="dateOfBirth"
                  type="date"
                  label="Дата рождения"
                  placeholder="Дата рождения"
                />
                <Controller
                  name="bio"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="Расскажите о себе"
                    />
                  )}
                />
                <Input
                  control={control}
                  name="location"
                  type="text"
                  label="Местоположение"
                />
                <ErrorMessage error={error} />
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Сохранить изменения
                  </Button>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Закрыть
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
