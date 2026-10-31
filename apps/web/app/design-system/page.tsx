import type { Metadata } from "next";
import { Badge } from "../../components/design-system/Badge";
import { Button } from "../../components/design-system/Button";
import { Card } from "../../components/design-system/Card";
import { Container } from "../../components/design-system/Container";
import { FormField } from "../../components/design-system/FormField";
import { SectionHeading } from "../../components/design-system/SectionHeading";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Design System | RAJ Industrial",
  description: "Color, typography, and reusable interface components for RAJ Industrial.",
};

const colorTokens = [
  { name: "Navy", role: "Primary", value: "#142B46", color: "navy" },
  { name: "Amber", role: "Accent", value: "#E3A43B", color: "amber" },
  { name: "Page", role: "Background", value: "#F4F6F8", color: "page" },
  { name: "White", role: "Surface", value: "#FFFFFF", color: "white" },
  { name: "Ink", role: "Main text", value: "#17212F", color: "ink" },
  { name: "Slate", role: "Muted text", value: "#64748B", color: "slate" },
  { name: "Border", role: "Divider", value: "#D7DFE8", color: "border" },
];

export default function DesignSystemPage() {
  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <Container className={styles.topbarContent} width="wide">
          <a aria-label="RAJ Industrial design system" className={styles.wordmark} href="/">
            <span className={styles.wordmarkMark}>R</span>
            <span>
              RAJ <strong>INDUSTRIAL</strong>
            </span>
          </a>
          <p className={styles.topbarLabel}>INTERFACE FOUNDATIONS / 02</p>
        </Container>
      </header>

      <section aria-labelledby="page-title" className={styles.intro}>
        <Container className={styles.introGrid} width="wide">
          <div className={styles.introCopy}>
            <p className={styles.kicker}>RAJ INDUSTRIAL · DESIGN SYSTEM</p>
            <h1 className={styles.pageTitle} id="page-title">
              Clarity in every <span>detail.</span>
            </h1>
            <p className={styles.introText}>
              A shared visual language for industrial manufacturing and hardware supply.
            </p>
          </div>
          <div aria-hidden="true" className={styles.colorStudy}>
            <div className={styles.colorStudyNavy}>
              <span>RAJ</span>
              <span>142B46</span>
            </div>
            <div className={styles.colorStudyAmber}>
              <span>INDUSTRIAL</span>
              <span>E3A43B</span>
            </div>
            <div className={styles.colorStudyRule} />
          </div>
        </Container>
      </section>

      <Container className={styles.content} width="wide">
        <section aria-labelledby="colors-title" className={styles.section}>
          <SectionHeading
            description="A restrained palette built around a dependable navy, a precise amber accent, and clear neutral surfaces."
            eyebrow="01 / COLOR"
            id="colors-title"
            title="Color system"
          />
          <ul aria-label="Color tokens" className={styles.colorGrid}>
            {colorTokens.map((token) => (
              <li className={styles.colorItem} key={token.name}>
                <div
                  aria-label={`${token.name}, ${token.value}`}
                  className={`${styles.swatch} ${styles[`swatch${token.color}`]}`}
                  role="img"
                />
                <div className={styles.colorMeta}>
                  <span className={styles.colorName}>{token.name}</span>
                  <span className={styles.colorRole}>{token.role}</span>
                  <code className={styles.colorValue}>{token.value}</code>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="type-title" className={styles.section}>
          <SectionHeading
            description="Outfit adds structure to headings; Inter keeps labels and reading text direct and familiar."
            eyebrow="02 / TYPOGRAPHY"
            id="type-title"
            title="Type hierarchy"
          />
          <Card className={styles.typeCard}>
            <div className={styles.typeRow}>
              <p className={styles.typeLabel}>Display / Outfit Semibold</p>
              <p className={styles.typeDisplay}>Precision for the work ahead.</p>
            </div>
            <div className={styles.typeRow}>
              <p className={styles.typeLabel}>Section / Outfit Medium</p>
              <p className={styles.typeSection}>Designed for clear decisions.</p>
            </div>
            <div className={styles.typeRow}>
              <p className={styles.typeLabel}>Body / Inter Regular</p>
              <p className={styles.typeBody}>
                Readable supporting copy for specifications, services, and customer
                communication.
              </p>
            </div>
            <div className={styles.typeRow}>
              <p className={styles.typeLabel}>Label / Inter Semibold</p>
              <p className={styles.typeMeta}>COMPONENT LABEL · 12 PX</p>
            </div>
          </Card>
        </section>

        <section aria-labelledby="buttons-title" className={styles.section}>
          <SectionHeading
            description="Consistent action hierarchy with clear focus, disabled, and loading feedback."
            eyebrow="03 / ACTIONS"
            id="buttons-title"
            title="Buttons"
          />
          <div className={styles.buttonGrid}>
            <Card className={styles.stateCard}>
              <p className={styles.exampleLabel}>Primary</p>
              <Button variant="primary">Primary action</Button>
            </Card>
            <Card className={styles.stateCard}>
              <p className={styles.exampleLabel}>Secondary</p>
              <Button variant="secondary">Secondary action</Button>
            </Card>
            <Card className={styles.stateCard}>
              <p className={styles.exampleLabel}>Outline</p>
              <Button variant="outline">Outline action</Button>
            </Card>
            <Card className={styles.stateCard}>
              <p className={styles.exampleLabel}>Disabled</p>
              <Button disabled variant="primary">
                Unavailable
              </Button>
            </Card>
            <Card className={styles.stateCard}>
              <p className={styles.exampleLabel}>Loading</p>
              <Button loading variant="primary">
                Please wait
              </Button>
            </Card>
          </div>
        </section>

        <section aria-labelledby="surfaces-title" className={styles.section}>
          <SectionHeading
            description="Compact status labels and understated cards create structure without visual noise."
            eyebrow="04 / SURFACES"
            id="surfaces-title"
            title="Cards and badges"
          />
          <div className={styles.surfaceGrid}>
            <Card className={styles.surfaceCard}>
              <div className={styles.surfaceCardHeader}>
                <p className={styles.exampleLabel}>Default card</p>
                <Badge variant="neutral">Neutral</Badge>
              </div>
              <h3 className={styles.cardTitle}>Clear information hierarchy</h3>
              <p className={styles.cardText}>
                A flexible surface for grouped content, labels, and supporting detail.
              </p>
            </Card>
            <Card className={styles.surfaceCard} tone="subtle">
              <div className={styles.surfaceCardHeader}>
                <p className={styles.exampleLabel}>Status badges</p>
              </div>
              <div aria-label="Badge variants" className={styles.badgeRow}>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Attention</Badge>
                <Badge variant="info">Information</Badge>
              </div>
              <p className={styles.cardText}>
                State colors are reserved for meaning, not decoration.
              </p>
            </Card>
          </div>
        </section>

        <section aria-labelledby="fields-title" className={styles.section}>
          <SectionHeading
            description="Labels, validation messages, and hints remain connected to their controls for assistive technology."
            eyebrow="05 / FORMS"
            id="fields-title"
            title="Form fields"
          />
          <div className={styles.fieldGrid}>
            <FormField
              autoComplete="name"
              id="contact-name"
              label="Contact name"
              placeholder="Enter a name"
              required
            />
            <FormField
              autoComplete="email"
              id="work-email"
              label="Email address"
              placeholder="you@company.com"
              type="email"
            />
            <FormField
              error="Enter a valid email address."
              id="invalid-example"
              label="Validation example"
              type="email"
              value="not-an-email"
              readOnly
            />
            <FormField
              disabled
              id="disabled-example"
              label="Disabled field"
              placeholder="Unavailable"
            />
          </div>
        </section>
      </Container>

      <footer className={styles.footer}>
        <Container className={styles.footerContent} width="wide">
          <span>RAJ INDUSTRIAL</span>
          <span>DESIGN TOKENS · UI PRIMITIVES · PHASE 02</span>
        </Container>
      </footer>
    </main>
  );
}