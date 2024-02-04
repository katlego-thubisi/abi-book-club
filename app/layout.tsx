import "./globals.css";

export const metadata = {
  title: "Abi's Book Club",
  description: "A Next.js 13 Blog Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex flex-row">
          <section className="main-container">
            <div className="w-full max-w-4xl">{children}</div>
          </section>
        </main>
      </body>
    </html>
  );
}
