import { Hero } from "../components/Hero"
import { ListsHome } from "../components/ListsHome"
import { SlideHome } from "../components/SlideHome"


const Home = () => {
  return(
    <main>
      <Hero />
      <SlideHome/>
      <ListsHome />
    </main>
  )
}

export { Home }