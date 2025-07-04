import { Cpu, Palette, Newspaper, AlertCircle } from 'lucide-react';
import type { IconMap } from '@/lib/types';
import { cn } from '@/lib/utils';

const iconMap: IconMap = {
  cpu: Cpu,
  palette: Palette,
  newspaper: Newspaper,
};

const ChronicleIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = iconMap[name] || AlertCircle;
  return <IconComponent className={cn('h-8 w-8 text-accent', className)} />;
};

export default ChronicleIcon;
