import React, { Children } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

// SiteMapBlock Component
interface SiteMapBlockProps {
  children: React.ReactNode;
  header: string;
  className?: string;
}

interface SiteMapSubHeadingProps {
  title: string;
  content: { title: string, url: string }[];
}

interface SiteMapContentProps {
  content: { title: string, url: string }[];
}

function SiteMapContent({
  content
}: SiteMapContentProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {content.map((item, index) => (
        <a href={item.url} key={index} className="clickable">
        <Badge variant="secondary">{item.title}</Badge>
      </a>
      ))}
    </ul>
  );
};

function SiteMapSubHeading({
  title,
  content
}: SiteMapSubHeadingProps) {
  return (
    <div className="py-2">
      <div className='flex flex-wrap items-center gap-x-2 pb-2'>
        <h3 className="text-lg font-semibold whitespace-nowrap">{title}</h3>
        <div className='h-0.5 min-w-32 w-full bg-primary'></div>
      </div>
      <SiteMapContent content={content} />
    </div>
  );
};

function SiteMapBlock({
  children,
  header,
  className,
}: SiteMapBlockProps) {
  return (
    <Card className={cn("max-w-[600px]", className)}>
      <CardHeader className='pb-2'>
        <CardTitle className='text-2xl font-semibold'>{header}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}


// Export the main SiteMapBlock component
export { SiteMapBlock, SiteMapSubHeading, SiteMapContent };

