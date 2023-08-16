import React, { ReactNode, useEffect } from 'react'
import Navbar from '@/components/landing-page/Navbar'
import Footer from '@/components/landing-page/Footer'
import Head from 'next/head'
import NextProgress from 'nextjs-progressbar'
import { usePathname } from 'next/navigation'


type Props = {
  children: ReactNode
}

function LandingPageLayout({ children }: Props) {
  const pathname = usePathname();
  useEffect(() => {
    if (window && window.$crisp && window.$crisp.push) {
      window.$crisp.push(["config", "position:reverse", [false]]);
    }

  }, [])
  return (
    <>
      <>
        <Head>
          <title>Zigment.ai</title>
        </Head>
        <Navbar />
        <NextProgress />
        <main className="pt-[80px]">
          {children}
        </main>
        <Footer />
      </>
    </>
  )
}

export default LandingPageLayout