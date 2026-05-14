import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/portfolio/Hero'
import { Expertise } from '@/components/portfolio/Expertise'
import { DesignSystemWidget } from '@/components/portfolio/DesignSystemWidget'
import { Experience } from '@/components/portfolio/Experience'
import { Work } from '@/components/portfolio/Work'
import { Toolkit } from '@/components/portfolio/Toolkit'
import { GitHubSection } from '@/components/portfolio/GitHubSection'
import { Certifications } from '@/components/portfolio/Certifications'
import { Contact } from '@/components/portfolio/Contact'
import { Footer } from '@/components/portfolio/Footer'


export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <>
      <Hero />
      <Expertise />
      <DesignSystemWidget />
      <Experience />
      <Work />
      <Toolkit />
      <GitHubSection />
      <Certifications />
      <Contact />
      <Footer />
    </>
  )
}