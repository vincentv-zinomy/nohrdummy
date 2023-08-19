import BlogDetailComp from '@/components/blog/BlogDetailsComp';
import AppLayout from '@/components/Layout/LandingPageLayout';
import { blogData, getMarkdownDataForBlog } from '@/lib/blog/blog-data';
import { BlogI } from '@/lib/types/blog';
import Head from 'next/head';


export async function getStaticProps(context: any) {
  const allBlogs = blogData;
  const findBlog = allBlogs.find((blog: BlogI) => blog.slug === context.params.id);
  if (!findBlog) return {
    blog_content: '',
    blog_data: {}
  }

  const blog_content = await getMarkdownDataForBlog(findBlog.file);

  return {
    props: {
      blog_content,
      blog_data: findBlog,
    },
  };
}

export async function getStaticPaths() {

  const posts = blogData;
  const paths = posts.map((post: any) => {
    return {
      params:
      {
        id: post.slug
      }
    }
  })
  return {
    paths,
    fallback: false,
  };
}

type Props = {
  blog_content: string;
  blog_data: BlogI;
}

const BlogDetailsPage = ({ blog_content, blog_data }: Props) => {


  const content = blog_content;
  const data = blog_data
  return (
    <>

      <AppLayout>

        <Head>
          <title>{data.title}</title>
          <meta
            name="description"
            content={data.description}
          />
          <meta
            property="og:title"
            content={data.title} />
          <meta
            property="og:description"
            content={data.description}
          />
          <meta
            name="author"
            content={data.author}
          />
          <meta
            property="article:author"
            content={data.author}
          />
          <meta
            property="og:image"
            content={`/blog/${data.cover_image}`}
            key="ogimage"
          />
        </Head>
        <BlogDetailComp
          blog_content={content}
          author={data.author}
          date={data.published_at}
          title={data.title}
        />
      </AppLayout>
    </>
  );
};

export default BlogDetailsPage;
