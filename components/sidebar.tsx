import React, { useEffect, useState } from 'react';
import { client } from '../lib/client';

interface Category {
  title: string;
}

const Sidebar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(async (): any => {
    const query = `*[_type == 'category']{
          title
      }`;
    const category = await client.fetch(query);
    setCategories(category);
  }, []);

  return (
    <div>
      <div className="mt-10 mb-5 flex-shrink grow-0 basis-1/3 border-b-[1px] border-gray-300 pb-8">
        <p className="mb-4 text-xs font-bold uppercase">
          DISCOVER MORE OF WHAT MATTERS TO YOU
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category: Category, i) => (
            <div
              key={i}
              className="cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-xs text-gray-500 transition-all duration-150 ease-in-out hover:bg-gray-500 hover:text-gray-200"
            >
              {category.title}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-2 flex cursor-pointer flex-wrap gap-3 text-sm text-gray-400">
        <p className="hover:text-gray-500">Home</p>
        <p className="hover:text-gray-500">About</p>
        <p className="hover:text-gray-500">Contact</p>
        <p className="hover:text-gray-500">Terms</p>
        <p className="hover:text-gray-500">Writer</p>
        <p className="hover:text-gray-500">News</p>
        <p className="hover:text-gray-500">Help</p>
      </div>
      <div className="text-sm text-gray-400">
        <p>@2022 - medium-next - Built for portfolio purpose</p>
      </div>
    </div>
  );
};

export default Sidebar;
