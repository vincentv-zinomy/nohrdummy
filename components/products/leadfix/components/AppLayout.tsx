import React, { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Head from 'next/head'
import NextProgress from 'nextjs-progressbar'


type Props = {
    children:ReactNode
}

function AppLayout({children}: Props) {
  return (
    <>
    <>
      <Head>
        <title>NoHR.ai</title>
      </Head>
      <Navbar/>
        <NextProgress/>
        <main className="pt-[80px]">
            {children}
        </main>
      <Footer />
    </>
    </>
  )
}

export default AppLayout