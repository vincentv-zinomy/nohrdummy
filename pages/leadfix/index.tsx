import LandingPageLayout from '@/components/Layout/LandingPageLayout'
import LeadFixLandingPage from '@/components/products/leadfix/index'
import Head from 'next/head'
import React from 'react'

type Props = {}

const index = (props: Props) => {
  return (
    <LandingPageLayout>
      <Head>
        <title>Leadfix</title>
        <meta name="description" content="Your AI Sales assistant with superhuman abilities" />
        <meta property="og:title" content="Leadfix" />
        <meta property="og:description" content="Your AI Sales assistant with superhuman abilities" />
      </Head> 
      <LeadFixLandingPage/>
    </LandingPageLayout>
  )
}

export default index