import LandingPageLayout from '@/components/Layout/LandingPageLayout'
import AppLayout from '@/components/products/leadfix/components/AppLayout'
import axios from 'axios'
import Head from 'next/head'
import React from 'react'

type Props = {
  data: logoDataI[]
}

export interface logoDataI {
  id: string;
  name: string;
  logo_url: string;
  description: string;
}

export async function getServerSideProps() {
  try {
    const getData = await axios.get('https://api.zigment.ai/integration-auth/public/fetch-all');  
     
    return { props: {data: getData.data} };
  } catch (error) {
    console.error(error);
    return { props: { data: null } };
  }
}

const index = ({data}: Props) => {
 
  return (
    <LandingPageLayout>
      <Head>
        <title>Integrations</title>
        <meta name="description" content="Connect with third-party tools that you're already using" />
        <meta property="og:title" content="Integrations" />
        <meta property="og:description" content="Connect with third-party tools that you're already using" />
      </Head> 
      <section className="px-5 bg-white">
        <div className="max-w-5xl md:px-5 mx-auto flex flex-col-reverse lg:flex-row items-center justify-between py-10 lg:py-14">
          <div className='flex gap-10 justify-between '>
            <div className=''>
              <h3 className='font-semibold text-lg'>Categories</h3>
            </div>
            <div className='flex flex-wrap gap-4'>
              {data.map((x:logoDataI)=>(
                <div className='w-96 h-20	 cursor-pointer  p-2 border border-white hover:border-slate-100 hover:shadow-md rounded-md flex  gap-2 relative' key={x.id}>
                  <div className='h-10 w-10 rounded-md border overflow-hidden border-slate-100 shrink-0'>
                    <img src="" alt="" className='h-full w-full rounded-md   object-cover' />
                  </div>
                  <div className='left-[60px] top-1 absolute'>
                    <h3 className='text-lg font-semibold'>{x.name}</h3>
                    <p className='text-md'>{x.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </LandingPageLayout>
  )
}

export default index