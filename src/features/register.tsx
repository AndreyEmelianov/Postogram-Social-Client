import { useState, type FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Input } from '../components/input'
import { useRegisterMutation } from '../app/services/userApi'
import { hasErrorField } from '../utils/hasErrorField'
import { ErrorMessage } from '../components/errorMessage'
import { Button, Link } from '@nextui-org/react'

type RegisterType = {
  email: string
  password: string
  name: string
}
type RegisterPropsType = {
  setSelected: (value: string) => void
}

export const Register: FC<RegisterPropsType> = ({ setSelected }) => {
  const [error, setError] = useState('')

  const [register, { isLoading }] = useRegisterMutation()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  })

  const onSubmitForm = async (data: RegisterType) => {
    try {
      await register(data).unwrap()
      setSelected('login')
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.error)
      }
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmitForm)}>
      <Input
        name="name"
        type="text"
        label="Имя"
        required="Поле обязательно"
        control={control}
      />
      <Input
        name="email"
        type="email"
        label="Email"
        required="Поле обязательно"
        control={control}
      />
      <Input
        name="password"
        type="password"
        label="Пароль"
        required="Поле обязательно"
        control={control}
      />
      <ErrorMessage error={error} />
      <p className="text-center text-small">
        Уже есть аккаунт?{' '}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected('login')}
        >
          Войти
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Зарегистрироваться
        </Button>
      </div>
    </form>
  )
}
