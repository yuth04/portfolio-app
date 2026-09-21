import "@/app/globals.css";
import Footer from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ThemeProvider } from "@/components/providers/theme.provider";
import { ScrollProgress } from "@/components/ScrollProgress";

export const metadata = {
  title: "Portfolio",
  description: "Personal Web Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <Navbar />
          {/* Dynamic page content */}
          {/* <ScrollProgress /> */}
          <SmoothScrollProvider>
            <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8">
              {children}
            </main>
          </SmoothScrollProvider>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
