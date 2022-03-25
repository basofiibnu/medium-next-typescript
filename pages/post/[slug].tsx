import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';
import PortableText from 'react-portable-text';
import Header from '../../components/headers';
import { client, urlFor } from '../../lib/client';
import { Post } from '../../typings';

interface Props {
  post: Post;
}

const PostDetail = ({ post }: Props) => {
  console.log(post);
  return (
    <div>
      <Head>
        <title>Medium - {post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header />
        <img
          src={urlFor(post.mainImage).url()}
          alt="cover-pic"
          className="h-60 w-full object-cover"
        />
        <article className="mx-auto max-w-4xl p-5">
          <h1 className="mt-6 mb-3 text-3xl">{post.title}</h1>
          <h2 className="mb-2 text-xl font-light text-gray-500">
            {post.description}
          </h2>

          <div className="flex items-center space-x-2">
            <img
              src={urlFor(post.author.image).url()}
              className="h-10 w-10 rounded-full"
              alt="author-pic"
            />
            <p className="text-sm font-extralight">
              Blog post by{' '}
              <span className="font-medium text-green-600">
                {post.author.name}
              </span>{' '}
              - Published at{' '}
              {new Date(post._createdAt).toLocaleString()}
            </p>
          </div>
          <div className="mt-5">
            <PortableText
              className=""
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
              content={post.body}
              serializers={{
                h1: (props: any) => (
                  <h1
                    className="my-5 text-2xl font-bold"
                    {...props}
                  />
                ),
                h2: (props: any) => (
                  <h2 className="my-5 text-xl font-bold" {...props} />
                ),
                li: ({ children }: any) => (
                  <li className="ml-4 list-disc">{children}</li>
                ),
                normal: (props: any) => (
                  <p className="my-3" {...props} />
                ),
                link: ({ href, children }: any) => (
                  <a
                    href={href}
                    className="text-blue-500 hover:underline"
                  >
                    {children}
                  </a>
                ),
              }}
            />
          </div>
        </article>
      </div>
    </div>
  );
};

export default PostDetail;

export const getStaticPaths = async () => {
  const query = `*[_type == 'post']{
        _id,
        slug {
          current
        }
      }`;

  const posts = await client.fetch(query);
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == 'post' && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author -> {
        image,
        name
      },
      description,
      mainImage,
        slug,
      body,
      }`;

  const post = await client.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    // revalidate: 60,
  };
};
