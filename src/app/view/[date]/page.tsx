import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import type { Chronicle } from '@/lib/types';
import ChronicleIcon from '@/components/chronicle-icon';

async function getChronicleData(date: string): Promise<Chronicle | null> {
  const filePath = path.join(process.cwd(), 'public', 'content', `${date}.json`);
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Failed to read or parse ${date}.json:`, error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { date: string } }) {
  const data = await getChronicleData(params.date);
  if (!data) {
    return {
      title: 'Article Not Found',
    };
  }
  return {
    title: `${data.title} | ${params.date}`,
    description: data.headline,
  };
}

export default async function ChroniclePage({ params }: { params: { date: string } }) {
  const data = await getChronicleData(params.date);

  if (!data) {
    notFound();
  }

  return (
    <main className="bg-background min-h-screen text-foreground">
      <div className="max-w-4xl mx-auto p-4 sm:p-8 md:p-12">
        <article className="bg-card p-6 sm:p-10 rounded-xl shadow-lg">
          <header className="text-center mb-12 border-b border-border pb-8">
            <p className="font-body text-base text-muted-foreground mb-4">
              {new Date(params.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'UTC',
              })}
            </p>
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground leading-tight">
              {data.title}
            </h1>
            <p className="font-body text-xl mt-4 text-muted-foreground max-w-2xl mx-auto">
              {data.headline}
            </p>
          </header>

          <div className="space-y-16">
            {data.sections.map((section, index) => (
              <section key={index}>
                <div className="flex items-center mb-6">
                  <ChronicleIcon name={section.icon} className="mr-4 flex-shrink-0" />
                  <h2 className="font-headline text-3xl md:text-4xl font-semibold text-foreground">
                    {section.title}
                  </h2>
                </div>
                <div className="font-body text-lg text-foreground/90 leading-relaxed space-y-6 border-l-2 border-accent/20 ml-4 pl-10">
                  {section.paragraphs.map((p, pIndex) => (
                    <p key={pIndex}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
