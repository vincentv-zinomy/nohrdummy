import BlogListingPage from '@/components/blog/BlogListingPage';
import AppLayout from '@/components/Layout/LandingPageLayout'

import axios from 'axios';
import { BlogI } from '@/lib/types/blog';
import Head from 'next/head';
import React from 'react'
import axiosAPIWithAuth from '@/lib/axiosAPIWithAuth';
import axiosWithoutAuth from '@/lib/axiosAPIwithoutAuth';
import { blogData } from '@/lib/blog/blog-data'


type Props = {
  data: BlogI[]
}

export async function getServerSideProps() {
  try {
    // const getData = await axiosWithoutAuth('/cms/blog/all');
    const getData = blogData;

    return { props: { data: getData } };
  } catch (error) {
    console.error(error);
    return { props: { data: null } };
  }
}



function index({ data }: Props) {
  return (
    <AppLayout>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Blogs, Articles, and Tips by NoHR.ai" />
        <meta property="og:title" content="Blogs, Articles, and Tips by NoHR.ai" />
        <meta property="og:description" content="Best blogs, tips, tricks, articles for all your HR needs." />
      </Head>
      <BlogListingPage data={data} />
    </AppLayout>
  )
}

export default index