import React, { useState } from 'react'

interface experience {
  title: string
  company: string
  endTime: string
  tools: string[] | []
}

const experienceArr = [
  {
    title: 'Frontend Developer',
    company: 'Webnexs',
    endTime: 'Current',
    tools: ['React', 'React Native', 'Nextjs', 'Vitest', 'Cypress', 'Typescript']
  },
  {
    title: 'Software Engineer',
    company: 'Altaroad',
    endTime: '05/23',
    tools: ['Python', 'Streamlit', 'AWS', 'ElasticSearch']
  },
  {
    title: "Masters' in Computer Science",
    company: 'EPITA',
    endTime: '2021 - 6/2022',
    tools: ["Algorithms", "Dev Patterns"]
  },
  {
    title: 'Software Eng. (React Native)',
    company: 'Coreful Tech',
    endtime: '06/21',
    tools: ['React', 'React Native', 'Javascript']
  },
  {
    title: 'Software Eng. (React Native)',
    company: 'Calibraint Tech',
    endTime: '09/20',
    tools: ['React', 'React Native', 'javascript']
  }
]

function ExperienceCard({ experience }: { experience: experience }) {
  const [expand, setExpand] = useState(false)
  return (
    <a
      href="https://huggingface.co"
      target="_blank"
      className="p-[1.5px] overflow-hidden z-1 rounded-[0.80rem]
     animate-gradient__rotate
      relative w-[90vw] lg:w-[40vw]">
      <div className="p-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl border h-[18vh] lg:h-[25vh]
      border-white border-opacity-10 cursor-pointer group relative overflow-hidden z-1">
        <div className="px-3 py-2">
          <div>
            <p className="text-base text-gray-300 group-hover:text-opacity-100 transition-all duration-200 text-opacity-95 font-medium">{experience.title}</p>
            <p className="font-bold bg-clip-text text-transparent bg-white-gradient text-3xl">{experience.company}</p>
          </div>
          <hr className="border-white opacity-10 my-1" />
          {
            experience.tools.map((item, index) =>  {
              return <span key={index} className='bg-clip-text text-transparent bg-white-gradient'>{item} {index == experience.tools.length -1 ? '' : ' . '}</span>
            })
          }
          {/* <div className="flex items-center justify-start gap-3"></div> */}
        </div>
      </div>
    </a>
  )
}

function ExperienceCards() {
  return (
    <div className="grid grid-cols-1 place-items-start gap-5 lg:grid-cols-2 relative justify-items-center">
      {experienceArr.map((experience, i) => {
        return <ExperienceCard key={i} experience={experience} />
      })}
    </div>

    // <div classNameName='w-full h-full'>
    //   {Array()
    //     .fill(1, 0, 5)
    //     .map(() => (
    //       <ExperienceCard />
    //     ))}
    // </div>
  )
}

export default ExperienceCards
