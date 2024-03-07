import { Outlet } from "react-router-dom"

import { Header } from "../header"
import { Navbar } from "../navbar"
import { Container } from "../container"

export const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <Navbar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
        <div>profile</div>
      </Container>
    </>
  )
}
