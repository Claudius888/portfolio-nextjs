import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function ContentSection({
  isLoadingGist,
  isGistError,
  gistContent,
  gistErrorMessage,
}: {
  isLoadingGist: boolean;
  isGistError: boolean;
  gistContent: string;
  gistErrorMessage?: string | null;
}) {
  return (
    <>
      {/* --- Gist Content Area --- */}
      {/* Use isLoadingGist from useQuery */}
      {isLoadingGist && (
        <div className='flex items-center justify-center h-full'>
          <p className='text-gray-500 animate-pulse'>Loading Gist...</p>
        </div>
      )}
      {/* Use isGistError and the extracted gistErrorMessage */}
      {isGistError && (
        <div className='p-4 bg-red-100 border border-red-300 text-red-700 rounded'>
          <p>
            <strong>Error loading Gist:</strong>
          </p>
          <p className='text-sm'>
            {gistErrorMessage || 'An unknown error occurred'}
          </p>
        </div>
      )}
      {/* Check for successful load and if gistContent has value */}
      {!isLoadingGist && !isGistError && gistContent && (
        <article className='prose prose-sm sm:prose lg:prose-lg xl:prose-base max-w-none'>
          {/* Render gistContent (data from useQuery) */}
          <ReactMarkdown>{gistContent}</ReactMarkdown>
        </article>
      )}
      {/* Handle case where fetch succeeded but content was null/empty */}
      {!isLoadingGist && !isGistError && !gistContent && (
        <p className='text-gray-500'>
          Gist content not found or is empty for this item.
        </p>
      )}
      {/* --- End Gist Content Area --- */}
    </>
  );
}
