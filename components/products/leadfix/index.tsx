import Image from 'next/image'
import Hero from './components/Home/Hero'
import ProblemStatement from './components/Home/ProblemStatement'
import IntrodSection from './components/Home/Introduction'
import TestimonialSection from './components/Home/TestimonialSection'
import WhySection from './components/Home/WhySection'
import Solution from './components/Home/Solution'
import PricingSection from './components/Home/PricingSection'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPageLayout from '@/components/Layout/LandingPageLayout'

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
