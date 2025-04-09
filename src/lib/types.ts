import { HTMLProps } from 'react';

export type classnameProp = HTMLProps<HTMLElement>['className'];

export interface experienceProp {
  title: string;
  company: string;
  endTime: string;
  tools: string[] | [];
}

export type AnimationsObj = {
  id: string;
  title: string;
  videoUrl: string;
  tags?: string[];
  componentsUsed?: string[];
  description?: string;
  codeSnippetUrl?: string;
  isSmall?: Boolean;
  gistId?: string;
};

export type cardClick = (
  animation: AnimationsObj,
  cardElement: HTMLDivElement
) => void;

export const localStorageKey = 'initial-animation';
