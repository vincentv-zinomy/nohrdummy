import Image from 'next/image'
import Hero from './Hero'
import ProblemStatement from './ProblemStatement'
import IntrodSection from './Introduction'
import TestimonialSection from './TestimonialSection'
import WhySection from './WhySection'
import Solution from './Solution'
import PricingSection from './PricingSection'  

export default function LandingPage() {
    return (
        <> 
        <main className="relative  ">
            <Hero />
            <ProblemStatement />
            <IntrodSection />
            <TestimonialSection />
            <WhySection />
            <Solution />
            <PricingSection />
        </main> 
        </>
    )
}
