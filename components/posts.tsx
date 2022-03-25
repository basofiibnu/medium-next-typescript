import Link from 'next/link';
import React from 'react';
import { urlFor } from '../lib/client';
import { Post } from '../typings';

interface Props {
  posts: [Post];
}

const Posts = ({ posts }: Props) => {
  return (
    <div className="sm: grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
      {posts.map((post) => (
        <Link key={post._id} href={`/post/${post.slug.current}`}>
          <div className="group cursor-pointer overflow-hidden rounded-lg border">
            <img
              src={urlFor(post.mainImage).url()}
              alt="content-pic"
              className="h-60 w-full object-cover transition-transform ease-in-out group-hover:scale-105"
            />
            <div className="flex justify-between bg-white p-5">
              <div>
                <p className="text-lg font-bold">{post.title}</p>
                <p className="text-xs">
                  {post.description} by {post.author.name}
                </p>
              </div>
              <img
                className="h-12 w-12 rounded-full"
                src={urlFor(post.author.image).url()!}
                alt="author-pic"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Posts;
