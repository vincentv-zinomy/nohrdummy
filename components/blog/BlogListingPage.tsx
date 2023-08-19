import { BlogI } from '@/lib/types/blog'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  data: any[]
}

function BlogListingPage({ data }: Props) {


  return (
    <section className="px-5 ">
      <div className="max-w-5xl mx-auto flex flex-col-reverse lg:flex-row items-center py-10 lg:py-14">
        <div className="flex flex-wrap gap-10 justify-between">
          {data.map((blogPost, index) => {
            const cover = blogPost.cover_image
            const author = 'Dikshant Dave'
            return (
              <div
                key={blogPost.id}
                className={`w-full ${index === 0 ? "lg:w-full lg:h-64 md:w-[45%] " : "md:w-[45%] "
                  } rounded-lg   relative`}
              >
                <Link
                  href={`/blog/${blogPost.slug}`}
                >
                  <div className={`${index === 0 && "lg:flex gap-4"}`}>
                    <img
                      src={`/blog/${cover}`}
                      alt="cover"
                      className={`w-full ${index === 0 ? " h-48 lg:h-64" : "h-48"} object-cover rounded-lg`}
                    />
                    <div className="p-2 w-full">
                      <h2 className="text-2xl font-bold mb-2 hover:text-brand-green">
                        {blogPost.title}
                      </h2>
                      <p className="text-brand-dark-100">
                        {blogPost.description}
                      </p>
                      <div className={` mt-2 `}>
                        <p className="font-semibold">{author}</p>
                        <p className="text-brand-lightgray text-sm">
                          {blogPost.published_at}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  )
}

export default BlogListingPage