import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50 dark:bg-gray-900">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-6xl">
          Chronicle Quill
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Your daily digest, beautifully rendered.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>BEA Client</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button asChild>
              <Link href="/bea/view/2025-07-04-simp">
                View Chronicle (Simplified)
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/bea/view/2025-07-04-trad">
                 View Chronicle (Traditional)
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Demo Client</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button asChild>
              <Link href="/demo/view/2025-07-04-simp">
                View Chronicle (Simplified)
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/demo/view/2025-07-04-trad">
                 View Chronicle (Traditional)
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
