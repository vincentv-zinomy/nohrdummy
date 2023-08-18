import LandingPageLayout from '@/components/Layout/LandingPageLayout'
import NoHRLandingPage from '@/components/products/nohr/index'
import Head from 'next/head'
import React from 'react'

type Props = {}

const index = (props: Props) => {
  return (
    <LandingPageLayout>
      <Head>
        <title>NoHR</title>
        <meta name="description" content="Your AI recruitment assistant with superhuman abilities" />
        <meta property="og:title" content="NoHR" />
        <meta property="og:description" content="Your AI recruitment assistant with superhuman abilities" />
      </Head> 
      <NoHRLandingPage/>
    </LandingPageLayout>
  )
}

export default index