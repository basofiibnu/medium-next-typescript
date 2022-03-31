import React from 'react';

const Main = () => {
  return (
    <div className="border-y border-black bg-yellow-400">
      <div className="mx-auto max-w-7xl ">
        <div className="flex items-center justify-between py-10 lg:py-0">
          <div className="space-y-5 px-10">
            <h1 className="max-w-xl font-serif text-6xl">
              <span className="underline decoration-black decoration-4">
                Medium
              </span>{' '}
              is a place to write, read, and connect
            </h1>
            <h2>
              It's easy and free to post your thinking on any topic
              and connect with millions of readers
            </h2>
          </div>

          <img
            src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
            alt="main-logo"
            className="hidden h-32 md:inline-flex lg:h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
