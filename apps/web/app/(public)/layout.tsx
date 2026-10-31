import { PublicFooter } from "../../components/public-site/PublicFooter";
import { PublicHeader } from "../../components/public-site/PublicHeader";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PublicHeader />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <PublicFooter />
    </>
  );
}