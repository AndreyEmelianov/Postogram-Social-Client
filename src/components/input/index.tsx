import type { FC } from "react"
import { useController, type Control } from "react-hook-form"

import { Input as NextInput } from "@nextui-org/react"

type InputPropsType = {
  name: string
  label: string
  control: Control<any>
  required?: string
  endContent: JSX.Element
  type?: string
  placeholder?: string
}

export const Input: FC<InputPropsType> = ({
  type,
  name,
  label,
  control,
  required = "",
  endContent,
  placeholder = "",
}) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: {
      required,
    },
  })

  return (
    <NextInput
      id={name}
      type={type}
      label={label}
      name={field.name}
      value={field.value}
      isInvalid={invalid}
      onBlur={field.onBlur}
      onChange={field.onChange}
      errorMessage={`${errors[name]?.message ?? ""}`}
      placeholder={placeholder}
    />
  )
}
