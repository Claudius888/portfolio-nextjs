import { cn } from '@/lib/utils';
import React from 'react'

export default function GButton({ label, style, textStyle }: { label: string; style?: string, textStyle ?:string }) {
  return (
    <div className={`text-center flex justify-center ${style}`} style={{}}>
      <div className="max-w-max relative z-2 group">
        <button
          className="bg-text-gradient-1 py-3 px-8 
          text-black cursor-pointer text-base 
        inline-block rounded-full font-medium 
        transition-all 
        duration-200 hover:-translate-y-1">
          <span className={cn("z-1 relative block", textStyle)}>{label}</span>
        </button>
        <div className="bg-black bg-opacity-40 transition-all duration-200 opacity-0 group-hover:opacity-100 w-2/3 h-[8px] absolute -bottom-1 left-1/2 -z-1 -translate-x-1/2 blur-md"></div>
      </div>
    </div>
  )
}
