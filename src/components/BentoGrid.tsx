import { cn } from '@/lib/utils';
import Link from 'next/link';
import { URL } from 'url';

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ',
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  innerClassname,
  link,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  innerClassname?: string;
  link: URL
}) => {
  return (
    <>
    <Link
    href={link}
    target='_blank'
      className={cn(
        'row-span-1 rounded-xl mx-4 md:mx-0 group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-black border-white/[0.2] border justify-between flex flex-col space-y-4',
        className
      )}
    >
      {/* <div className='flex relative'> */}
      {/* </div> */}
      {header}
      <div className={cn('z-10', innerClassname)}>
        <div
          className={'group-hover/bento:translate-x-2 transition duration-200'}
        >
          {icon}
          <div className='font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2'>
            {title}
          </div>
          <div className='font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300'>
            {description}
          </div>
        </div>
      </div>
    </Link>
    </>
  );
};
