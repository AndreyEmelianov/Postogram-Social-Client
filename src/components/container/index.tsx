import type { FC } from "react"

type Props = {
  children: React.ReactElement[] | React.ReactElement
}

export const Container: FC<Props> = ({ children }) => {
  return <div className="flex max-w-screen-xl mx-auto mt-10">{children}</div>
}
