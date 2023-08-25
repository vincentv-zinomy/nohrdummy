import LandingPageLayout from '@/components/Layout/LandingPageLayout'
import axiosWithoutAuth from '@/lib/axiosAPIwithoutAuth'
import Head from 'next/head'

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
    const getData = await axiosWithoutAuth.get(`/integration-auth/public/fetch-all`);

    return { props: { data: getData.data } };
  } catch (error) {
    console.error(error);
    return { props: { data: null } };
  }
}

const index = ({ data }: Props) => {

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
              {data.map((x: logoDataI) => (
                <div className='w-96 h-16	 cursor-pointer  p-2 border border-white hover:border-slate-100 hover:shadow-md rounded-md flex items-center gap-3 relative' key={x.id}>
                  <div className='h-12 w-12 p-2 rounded-md border overflow-hidden border-slate-100 shrink-0 flex items-center justify-center'>
                    <img src={x.logo_url} alt="" className='h-full rounded-lg' />
                  </div>
                  <div className=' '>
                    <h3 className='text-md font-semibold'>{x.name}</h3>
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