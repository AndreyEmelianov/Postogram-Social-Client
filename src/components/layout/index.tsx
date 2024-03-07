import { Container } from "../container"
import { Header } from "../header"
import { Navbar } from "../navbar"

export const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <Navbar />
        </div>
      </Container>
    </>
  )
}
