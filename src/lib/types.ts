import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

export type Article = {
  id: number;
  title: string;
  link: string;
  source_name: string;
  publish_date: string;
  snippet: string;
};

export type Content = {
  category_name: string;
  articles: Article[];
};

export type Chronicle = {
  date: string;
  positive: number;
  negative: number;
  health: string;
  bea_pick: string;
  bank_keyword: string;
  ai_ask: string;
  ai_answer: string;
  contents: Content[];
};

export type IconMap = {
  [key: string]: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
};
