import { notFound } from "next/navigation";
import { Button } from "../../../components/design-system/Button";
import { Container } from "../../../components/design-system/Container";
import styles from "./page.module.css";

const placeholderPages: Record<string, { description: string; title: string }> = {
  about: {
    title: "About RAJ Industrial",
    description: "Company information will be added when approved details are available.",
  },
  services: {
    title: "Services",
    description: "Service information will be added when the approved service catalog is available.",
  },
  industries: {
    title: "Industries",
    description: "Industry information will be added when approved company details are available.",
  },
  "how-to-buy": {
    title: "How to Buy",
    description: "Purchasing information will be added when the process is confirmed.",
  },
  contact: {
    title: "Contact RAJ Industrial",
    description: "Contact details will be published when approved information is available.",
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(placeholderPages).map((path) => ({ slug: path.split("/") }));
}

export default async function PublicPlaceholderPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = slug.join("/");
  const page = placeholderPages[path];

  if (!page) notFound();

  return (
    <section
      className={styles.page}
      id={path === "contact" ? "request-a-quote" : undefined}
    >
      <Container className={styles.content} width="content">
        <p className={styles.eyebrow}>RAJ INDUSTRIAL</p>
        <h1 className={styles.title}>{page.title}</h1>
        <p className={styles.description}>{page.description}</p>
        <Button href="/" variant="outline">
          Return to home
        </Button>
      </Container>
    </section>
  );
}