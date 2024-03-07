import type { FC } from "react"
import { Button as NextButton } from "@nextui-org/react"

type ButtonProps = {
  children: React.ReactNode
  icon?: JSX.Element
  className?: string
  type?: "button" | "submit" | "reset"
  fullWidth?: boolean
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined
}

export const Button: FC<ButtonProps> = ({
  children,
  icon,
  className,
  type,
  fullWidth,
  color,
}) => {
  return (
    <NextButton
      size="lg"
      variant="light"
      type={type}
      color={color}
      startContent={icon}
      className={className}
      fullWidth={fullWidth}
    >
      {children}
    </NextButton>
  )
}
