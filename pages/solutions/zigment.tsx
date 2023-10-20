/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import LandingPageLayout from '@/components/Layout/LandingPageLayout'
import ChatBotFeaturesSection from '@/components/solutions/zigment/ChatBotFeaturesSection'
import ComparisionSection from '@/components/solutions/zigment/ComparisionSection'
import EmphasisSection from '@/components/solutions/zigment/EmphasisSection'
import Features from '@/components/solutions/zigment/Features'
import Hero from '@/components/solutions/zigment/Hero'
import HowWorksSections from '@/components/solutions/zigment/HowWorksSections'
import IntegrationsSections from '@/components/solutions/zigment/IntegrationsSections'
import { ChevronRightIcon, StarIcon } from '@heroicons/react/20/solid'

export default function zigment() {
  return (
    <LandingPageLayout>
        <Hero/>
        <Features/>
        <EmphasisSection/>
        <ComparisionSection/>
        <HowWorksSections/>
        <IntegrationsSections/>
        <ChatBotFeaturesSection/>
    </LandingPageLayout>
  )
}
