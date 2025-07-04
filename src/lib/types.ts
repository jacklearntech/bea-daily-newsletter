import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

export type Section = {
  category: string;
  icon: string;
  title: string;
  paragraphs: string[];
};

export type Chronicle = {
  title: string;
  headline: string;
  sections: Section[];
};

export type IconMap = {
  [key: string]: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
};
