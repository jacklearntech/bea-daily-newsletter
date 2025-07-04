import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Feather } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-4 overflow-hidden">
      <div className="relative w-full max-w-5xl flex flex-col items-center justify-center">
        <header className="z-10">
          <div className="inline-flex items-center justify-center bg-primary/10 text-primary p-3 rounded-full mb-6">
            <Feather className="h-8 w-8" />
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-bold text-foreground mb-4">
            Chronicle Quill
          </h1>
          <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Your daily digest, beautifully rendered. Experience news and
            stories with a clean and focused reading interface.
          </p>
        </header>
        <main className="z-10 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="font-headline text-lg">
            <Link href="/view/2025-07-04-simp">
              Read in Simplified Chinese
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" className="font-headline text-lg">
            <Link href="/view/2025-07-04-trad">
              Read in Traditional Chinese
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </main>
        <footer className="z-10 absolute bottom-4 text-muted-foreground text-sm">
          <p>Powered by Next.js and thoughtful design.</p>
        </footer>
      </div>
    </div>
  );
}
