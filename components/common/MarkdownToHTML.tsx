import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import ReactMarkdown from 'react-markdown'

type Props = {
    content:any
}

const MarkdownToHTML = ({content}: Props) => {

    const renderers = {
        a: ({ node, children, href, ...props }: any) => { 
          return <Link href={href}> {children} </Link>
      
        },
        image: ({ src, alt }:any) => (
          <Image src={src} alt={alt} className="w-full h-full" />
        ),
      };

  return (
    <div className='max-w-5xl mx-auto   items-center py-10  
          lg:py-14 
          [&_img]:md:w-10/12
          [&_img]:w-full
          [&_img]:mx-auto
          [&_img]:pb-4
          [&_p]:my-2
          [&_ul]:list-disc	
          [&_h1]:font-bold
          [&_h1]:md:text-3xl
          [&_h1]:text-2xl
          [&_h2]:font-semibold
          [&_h2]:md:text-2xl
          [&_h2]:text-xl
          [&_h2]:mt-5
          [&_ul]:pl-10
          [&_li]:p-1
          [&_table]:border
          [&_table]:border-black
          [&_table]:p-2
          [&_table]:py-4
          [&_table]:my-5
          [&_table]:mx-auto
          [&_tr]:border
          [&_tr]:border-black
          [&_tr]:p-2
          [&_td]:border
          [&_td]:border-black
          [&_td]:p-2
          [&_td]:text-center
          [&_th]:border
          [&_th]:border-black
          [&_th]:p-2
          font-mont 
        '>
        
        <ReactMarkdown 
          children={content} 
          components={renderers}   
        />
      </div>
  )
}

export default MarkdownToHTML