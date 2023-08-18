import React from 'react'
import Hero from './Hero'
import ProblemStatement from './ProblemStatement'
import IntrodSection from './IntrodSection'
import TestimonialSection from './TestimonialSection'
import WhySection from './WhySection'
import Solution from './Solution'
import Pricing from './Pricing'
import FAQSection from './FAQSection'
 
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