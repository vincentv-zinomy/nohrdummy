import LandingPageLayout from '@/components/Layout/LandingPageLayout' 
import Callout from '@/components/solutions/nohr/Callout'
import FAQSection from '@/components/solutions/nohr/FAQSection'
import Hero from '@/components/solutions/nohr/Hero'
import Section from '@/components/solutions/nohr/Section'
import Security from '@/components/solutions/nohr/Security'
import WhySection from '@/components/solutions/nohr/WhySection'
import Head from 'next/head'
import React from 'react'


type Props = {}

const leadfix = (props: Props) => {
  return (
    <LandingPageLayout>
        <Head>
            <title>Enterprise</title>
            <meta name="description" content= 'Simplify your high-volume recruitment process with NoHR AI'  />
            <meta property="og:title" content='Enterprise' />
            <meta property="og:description" content='Simplify your high-volume recruitment process with NoHR AI' />
        </Head> 
        <Hero />
        <Section  />
        <WhySection  /> 
        <Security />
        <Callout /> 
        <FAQSection/> 
    </LandingPageLayout>
  )
}

export default leadfix