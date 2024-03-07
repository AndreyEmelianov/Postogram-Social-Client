import { Container } from "../container"
import { Header } from "../header"

export const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p-4">navbar</div>
      </Container>
    </>
  )
}
