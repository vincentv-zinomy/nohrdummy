
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React, { FunctionComponent } from 'react'

type Props = {
  src: string
}



const Logo: FunctionComponent<any> = ({ src }: Props) => {
  return (
    <Link href={'/'} className='inline-block h-full overflow-y-hidden flex items-center'>
      <Image
        src={src}
        width={50}
        height={50}
        alt="Logo"
        style={{
          objectFit: 'cover',
          width: '160px',
          display: 'inline-block'
        }}
      />
    </Link>
  )
}

export default Logo