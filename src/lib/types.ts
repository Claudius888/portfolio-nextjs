import { HTMLProps } from "react";

export type classnameProp = HTMLProps<HTMLElement>['className']

export interface experienceProp {
    title: string;
    company: string;
    endTime: string;
    tools: string[] | [];
  }
