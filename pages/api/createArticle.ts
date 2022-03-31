// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import sanityClient from '@sanity/client';

const config = {
  token: process.env.NEXT_PUBLIC_SANITY_PROJECT_TOKEN,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
};

const client = sanityClient(config);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { title, description, _category, _author, content } =
    JSON.parse(req.body);

  try {
    const create = await client.create({
      _type: 'posts',
      title,
      slug: {
        _type: 'slug',
        current: title.toLowerCase().replace(/\s/g, '-'),
      },
      description,
      categories: [
        {
          _key: Math.random().toString(16).slice(2, 10),
          _type: 'reference',
          _ref: _category,
        },
      ],
      author: {
        _type: 'reference',
        _ref: _author,
      },
      body: content,
      publishedAt: new Date().toISOString(),
    });

    return res
      .status(200)
      .json({ message: 'success', data: create._id });
  } catch (error) {
    return res.status(500).json({ message: 'error', data: error });
  }
}
