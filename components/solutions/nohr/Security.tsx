import Image from 'next/image'
import React from 'react'
import securityImg from './assets/security/pana.svg'

 

const Security = ( ) => {
  return (
    <section className='px-5  '>
      <div className='w-full mx-auto flex flex-col flex-col-reverse	 lg:flex-row justify-center items-center py-10 lg:py-14 border-y border-gray-100 md:px-12 '>

        <div className='w-full   text-center flex flex-col gap-10 p-6 '>
          <h3 className='font-semibold text-2xl'>YOUR DATA IS SAFE WITH US</h3>
          <p>Any data that you upload or integrate with our system is encrypted and never shared with any third party busnesses. </p>
          <p>We fully understand that your data is the heart of your business and we guarantee 100% reliability and security of your data when on our servers. </p>
        </div>
        <div className='w-full   flex justify-center'>
          <Image src={securityImg} alt='' className='md:w-3/4' />
        </div>
      </div>
    </section>
  )
}

export default Security