'use client';

import Image, { StaticImageData } from 'next/image';
import { BentoGrid, BentoGridItem } from './BentoGrid';
import HeadlessEcommerce from '../../public/headless-ecommerce.jpg';
import SMBEcommerce from '../../public/smb-ecommerce.jpg';
import B2BEcommerce from '../../public/b2b-ecommerce.jpg';
import Altaroad from '../../public/altaroad.jpg';

export function Projects() {
  return (
    <div className='mt-[20vh]'>
      <p className='text-center text-2xl font-black text-white-gradient uppercase mb-4'>
        Projects
      </p>
      <BentoGrid className='max-w-4xl mx-auto mt-[5vh]'>
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            link={item.link}
            //   icon={item.icon}
            className={
              i === 0 || i === 3 ? 'md:col-span-2 relative overflow-clip' : ''
            }
            innerClassname={
              i === 0 || i === 3
                ? 'md:absolute bg-black md:top-1/2 md:left-0 w-full md:h-[50%] md:pt-3 md:pl-3 text-lg'
                : ''
            }
          />
        ))}
      </BentoGrid>
    </div>
  );
}

const HeaderImage = ({
  src,
  alt,
}: {
  src: StaticImageData;
  alt: string;
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      placeholder='blur'
      sizes='(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw'
      style={{ width: '100%', height: 'auto' }}
    />
  );
};

const items = [
  {
    title: 'Headless Ecommerce',
    description:
      'Worked on the frontend of the webapp along with setting Contentful CMS for better maintainablity',
    header: (
      <HeaderImage src={HeadlessEcommerce} alt={'Headless Ecommerce'}/>
    ),
    link: new URL('https://www.webnexs.com/headless-ecommerce.php'),
  },
  {
    title: 'Custom B2B Admin Dashboard',
    description:
      'Developed UI for Warehouse management, Order management flows, Product search and filtering flow',
    header: (
      <HeaderImage src={B2BEcommerce} alt={'Custom B2B Admin Dashboard'} />
    ),
    link: new URL('https://www.webnexs.com/b2b-ecommerce-development.php'),
  },
  {
    title: 'Engineering in Data Team',
    description:
      'Worked on data management with ElasticSearch, AWS, deployment in Remote Python Servers for onsite sensors, Docker',
    header: (
      <HeaderImage src={Altaroad} alt={'Altaroad company'}/>
    ),
    link: new URL('https://www.altaroad.com/en/'),
  },
  {
    title: 'ECommerce MVP',
    description:
      'Working on enhancing existing Ecommerce infrastructure with MVP made with Nextjs, React and TypeScript',
    header: <HeaderImage src={SMBEcommerce} alt={'ECommerce MVP'} />,
    link: new URL(
      'https://www.webnexs.com/smb-ecommerce-website-development.php'
    ),
  },
];
