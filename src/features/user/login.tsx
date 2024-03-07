import { useState, type FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Input } from '../../components/input'
import {
  useLazyCurrentQuery,
  useLoginMutation,
} from '../../app/services/userApi'
import { hasErrorField } from '../../utils/hasErrorField'
import { ErrorMessage } from '../../components/errorMessage'
import { Button, Link } from '@nextui-org/react'

type LoginType = {
  email: string
  password: string
}

type LoginProps = {
  setSelected: (value: string) => void
}

export const Login: FC<LoginProps> = ({ setSelected }) => {
  const [error, setError] = useState('')

  const [login, { isLoading }] = useLoginMutation()
  const [triggerCurrentQuery] = useLazyCurrentQuery()
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginType>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmitForm = async (data: LoginType) => {
    try {
      await login(data).unwrap()
      await triggerCurrentQuery()
      navigate('/')
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.error)
      }
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmitForm)}>
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
        Нет аккаунта?{' '}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected('sign-up')}
        >
          Зарегистрируйтесь
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Войти
        </Button>
      </div>
    </form>
  )
}
