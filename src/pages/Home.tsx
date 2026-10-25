import { About } from '../sections/About'
import { Awards } from '../sections/Awards'
import { Blog } from '../sections/Blog'
import { Certifications } from '../sections/Certifications'
import { Contact } from '../sections/Contact'
import { Education } from '../sections/Education'
import { Hero } from '../sections/Hero'
import { Journey } from '../sections/Journey'
import { Projects } from '../sections/Projects'
import { Research } from '../sections/Research'
import { Resume } from '../sections/Resume'
import { Skills } from '../sections/Skills'
import { Volunteer } from '../sections/Volunteer'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Journey />
      <Education />
      <Projects />
      <Skills />
      <Research />
      <Awards />
      <Certifications />
      <Volunteer />
      <Blog />
      <Resume />
      <Contact />
    </>
  )
}
