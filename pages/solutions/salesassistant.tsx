import LandingPageLayout from '@/components/Layout/LandingPageLayout'
import BotFeatureSection from '@/components/solutions/salesasistant/BotFeatureSection'
import ChatBotFeaturesSection from '@/components/solutions/salesasistant/ChatBotFeaturesSection'
import ComparisionSection from '@/components/solutions/salesasistant/ComparisionSection'
import EmphasisSection from '@/components/solutions/salesasistant/EmphasisSection'
import Features from '@/components/solutions/salesasistant/Features'
import Hero from '@/components/solutions/salesasistant/Hero'
import HowWorksSections from '@/components/solutions/salesasistant/HowWorksSections'
import IntegrationsSections from '@/components/solutions/salesasistant/IntegrationsSections'
import TestimonialSection from '@/components/solutions/salesasistant/TestimonialSection'
import React from 'react'

type Props = {}

const salesassistant = (props: Props) => {
  return (
    <LandingPageLayout>
        <Hero/>
        <Features/>
        <TestimonialSection/>       
        <ComparisionSection/>
        <HowWorksSections/>
        <IntegrationsSections/>
        <ChatBotFeaturesSection/>
    </LandingPageLayout>
  )
}

export default salesassistant