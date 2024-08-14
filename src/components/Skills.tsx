import React from 'react';
import GButton from './GButton';
const skills = [
  [
    'Here is a little bit about',
    'languages and technologies that',
    'I am currently using.',
  ],
  ['Mastering', 'React.js'],
  ['Nailing', 'Javascript'],
  ['Creating with', 'Nextjs'],
  ['Killing', 'Typescript'],
  ['Loving', 'React Native'],
  ['Using', 'Three.js'],
  ['Adore', 'Framer motion'],
  ['button', 'Check out my GitHub'],
];

function checkWhitespace(str: string) {
  return /\s/.test(str);
}

export default function Skills() {

  return (
    <div
      className='px-8 h-full w-full max-w-5xl mx-auto relative py-[12vh] grid
    grid-cols-2 lg:grid-cols-3 gap-x-12
    lg:gap-x-16 gap-y-16 lg:gap-y-20 z-[2]'
    >
      {skills.map((words, i) => {
        const firstitem =
          i == 0
            ? 'bg-clip-text bg-white-gradient text-transparent'
            : words[1].length > 8 && !checkWhitespace(words[1])
            ? 'text-3xl font-bold md:text-5xl'
            : 'font-medium text-4xl md:font-bold md:text-5xl';

        return (
          <React.Fragment key={`${i}-container`}>
            {words[0] !== 'button' ? (
              <span
                key={`${i}-outer`}
                className='font-medium 
                    flex flex-col bg-clip-text 
                    bg-white-gradient text-transparent
                    overflow-visible'
              >
                <span key={`${i}-adj`} className='text-white opacity-30'>
                  {words[0]}
                </span>
                <span key={`${i}-skill`} className={`${firstitem}`}>
                  {words[1]}
                </span>
                {words.length > 2 && (
                  <span key={`${i}-skill-row2`} className={`${firstitem}`}>
                    {words[2]}
                  </span>
                )}
              </span>
            ) : (
              <GButton
                key={`${i}-gbutton`}
                label={words[1]}
                style={
                  'flex col-span-2 lg:col-span-1 items-end pb-2.5 lg:justify-self-start'
                }
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
