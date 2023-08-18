import React from 'react'
import Hero from './components/Hero'  
import Pricing from './components/Pricing'
import FAQSection from './components/FAQSection'
import ProblemStatement from './components/ProblemStatement'
import IntrodSection from './components/IntrodSection'
import TestimonialSection from './components/TestimonialSection'
import WhySection from './components/WhySection'
import Solution from './components/Solution'
type Props = {}

const index = (props: Props) => {
  return (
    <main className="relative">
        <Hero />
        <ProblemStatement />
        <IntrodSection />
        <TestimonialSection />
        <WhySection />
        <Solution />
        <Pricing />
        <FAQSection />
    </main> 
  )
}

export default index