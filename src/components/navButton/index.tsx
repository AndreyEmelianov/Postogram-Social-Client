import type { FC } from "react"
import { Link } from "react-router-dom"

import { Button } from "../button"

type NavButtonType = {
  children: React.ReactNode
  icon: JSX.Element
  href: string
}

export const NavButton: FC<NavButtonType> = ({ children, icon, href }) => {
  return (
    <Button className="flex justify-start text-xl" icon={icon}>
      <Link to={href}>{children}</Link>
    </Button>
  )
}
