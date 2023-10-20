import LandingPageLayout from '@/components/Layout/LandingPageLayout'
import CTA2 from '@/components/solutions/coaches/CTA2'
import ChatBotFeaturesSection from '@/components/solutions/coaches/ChatBotFeaturesSection'
import ComparisionSection from '@/components/solutions/coaches/ComparisionSection'
import EmphasisSection from '@/components/solutions/coaches/EmphasisSection'
import Features from '@/components/solutions/coaches/Features'
import Hero from '@/components/solutions/coaches/Hero'
import HowWorksSections from '@/components/solutions/coaches/HowWorksSections'
import IntegrationsSections from '@/components/solutions/coaches/IntegrationsSections'
import TestimonialSection from '@/components/solutions/coaches/TestimonialSection'
import React from 'react'

type Props = {}

const coaches = (props: Props) => {
  return (
    <LandingPageLayout>
        <Hero/>
        <Features/>
        <EmphasisSection/>
        <TestimonialSection/>       
        <ComparisionSection/>
        <HowWorksSections/>
        <IntegrationsSections/>
        <ChatBotFeaturesSection/>
    </LandingPageLayout>
  )
}

export default coaches