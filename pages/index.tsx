import Head from 'next/head';
import Header from '../components/headers';
import Main from '../components/main';
import Posts from '../components/posts';
import { client } from '../lib/client';
import { Post } from '../typings';

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Medium Demo - Typescript</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Main />
      <Posts posts={posts} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == 'post']{
    _id,
    title,
    slug,
    author -> {
    name, image
  },
  description,
  mainImage,
  }`;

  const posts = await client.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
