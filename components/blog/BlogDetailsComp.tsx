
import Image from 'next/image';
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import MarkdownToHTML from '../common/MarkdownToHTML';



type Props = {
  blog_content: string;
  author: string;
  title: string;
  date: string;
}






const BlogDetailComp = ({ blog_content, author, date, title }: Props) => {


  const renderers = {
    a: ({ node, children, href, ...props }: any) => { 
      return <Link href={href}><a>{children}</a></Link>

    },
    image: ({ src, alt }:any) => (
      <Image src={src} alt={alt} className="w-full h-full" />
    ),
  };

  
  if (!blog_content) return null


  return (
    <section className="px-5 ">

      <div className='max-w-5xl mx-auto   items-center py-10  
          lg:py-14  
          [&_p]:my-2 	
          [&_h1]:font-bold
          [&_h1]:md:text-3xl
          [&_h1]:text-2xl
          [&_h2]:font-semibold
          [&_h2]:md:text-2xl
          [&_h2]:text-xl
          [&_h2]:mt-5 
          font-mont 
        '>
        <h1 className='pb-5 '>{title}</h1>
        <div className='w-full pb-5'>
          <p>{author}</p>
          <p className=' text-slate-600 text-sm '>
            {date}
          </p>
        </div>
        <MarkdownToHTML content={blog_content}/> 
      </div>
    </section>
  )
}

export default BlogDetailComp



