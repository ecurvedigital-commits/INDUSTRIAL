import Image from "next/image";
import { categoryPlaceholders, featuredProductPlaceholders, provisionalIndustries, servicePlaceholders } from "../../data/homepage";
import { Badge } from "../../components/design-system/Badge";
import { Button } from "../../components/design-system/Button";
import { Card } from "../../components/design-system/Card";
import { Container } from "../../components/design-system/Container";
import { SectionHeading } from "../../components/design-system/SectionHeading";
import { CategoryCard, ProductCard, ServiceCard } from "../../components/homepage/HomepageCards";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <section aria-labelledby="hero-title" className={styles.hero}>
        <Container className={styles.heroGrid} width="wide">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>RAJ INDUSTRIAL</p>
            <h1 className={styles.heroTitle} id="hero-title">
              Industrial supply.
              <span>Manufacturing capability.</span>
            </h1>
            <p className={styles.heroDescription}>
              Industrial hardware sourcing and manufacturing for business requirements.
              Discuss the right route with RAJ, from supply through to manufacturing
              possibilities.
            </p>
            <div className={styles.heroActions}>
              <Button href="/products">Explore Products</Button>
              <Button href="/contact#request-a-quote" variant="outline">
                Request a Quote
              </Button>
            </div>
            <p className={styles.heroNote}>
              MANUFACTURING <span /> HARDWARE SUPPLY &amp; DISTRIBUTION
            </p>
          </div>
          <figure className={styles.heroVisual}>
            <Image
              alt="A fabrication worker grinding a metal surface in a workshop."
              className={styles.heroImage}
              fill
              preload
              sizes="(max-width: 760px) 100vw, (max-width: 1100px) 48vw, 48rem"
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1800&q=88"
            />
            <figcaption className={styles.imageCaption}>
              Industrial fabrication / illustrative photography
            </figcaption>
          </figure>
        </Container>
      </section>

      <section aria-labelledby="categories-title" className={styles.section}>
        <Container width="wide">
          <div className={styles.sectionTopline}>
            <SectionHeading
              description="Browse a starting framework for the product range. Category names and details remain placeholders until the RAJ taxonomy is confirmed."
              eyebrow="01 / PRODUCT RANGE"
              id="categories-title"
              title="Product categories"
            />
            <Button className={styles.sectionAction} href="/products" variant="outline">
              All categories
            </Button>
          </div>
          <div className={styles.categoryGrid}>
            {categoryPlaceholders.map((category) => (
              <CategoryCard category={category} key={category.number} />
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="about-title" className={styles.aboutSection}>
        <Container className={styles.aboutGrid} width="wide">
          <div className={styles.aboutVisual}>
            <Image
              alt="Engineering drawings at a technical workstation."
              className={styles.aboutImage}
              fill
              sizes="(max-width: 760px) 100vw, 42vw"
              src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=85"
            />
            <span className={styles.aboutImageLabel}>
              ENGINEERING DETAIL / ILLUSTRATIVE
            </span>
            <span aria-hidden="true" className={styles.aboutRule} />
          </div>
          <div className={styles.aboutCopy}>
            <SectionHeading
              description="RAJ operates as both an industrial manufacturer and a hardware supplier/distributor. That combined model gives customers a place to discuss supply requirements and manufacturing possibilities."
              eyebrow="02 / ABOUT RAJ"
              id="about-title"
              title="Supply and manufacturing, in one conversation."
            />
            <p className={styles.aboutNote}>
              Product availability, manufacturing scope, and customization options
              are confirmed with the RAJ team for each requirement.
            </p>
            <Button href="/about" variant="outline">
              About RAJ
            </Button>
          </div>
        </Container>
      </section>

      <section aria-labelledby="capabilities-title" className={styles.section}>
        <Container width="wide">
          <SectionHeading
            description="A practical starting point for discussing industrial requirements. Specific products, sourcing scope, and manufacturing options are confirmed case by case."
            eyebrow="03 / CAPABILITIES"
            id="capabilities-title"
            title="A flexible industrial partner."
          />
          <div className={styles.capabilityGrid}>
            <Card className={styles.capabilityCard}>
              <span className={styles.capabilityIndex}>01</span>
              <h3 className={styles.cardTitle}>Product range</h3>
              <p className={styles.cardDescription}>
                Explore hardware and product categories as the verified catalog is
                established.
              </p>
            </Card>
            <Card className={styles.capabilityCard}>
              <span className={styles.capabilityIndex}>02</span>
              <h3 className={styles.cardTitle}>Sourcing &amp; supply</h3>
              <p className={styles.cardDescription}>
                Discuss industrial hardware supply and distribution requirements
                with the RAJ team.
              </p>
            </Card>
            <Card className={styles.capabilityCard}>
              <span className={styles.capabilityIndex}>03</span>
              <h3 className={styles.cardTitle}>Manufacturing options</h3>
              <p className={styles.cardDescription}>
                Manufacturing and customization can be explored where applicable to
                the requirement.
              </p>
            </Card>
            <Card className={styles.capabilityCard}>
              <span className={styles.capabilityIndex}>04</span>
              <h3 className={styles.cardTitle}>Customer support</h3>
              <p className={styles.cardDescription}>
                Discuss requirements with the RAJ team. The sales team reviews
                quotation requests and prepares quotations manually.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      <section aria-labelledby="services-title" className={styles.servicesSection}>
        <Container width="wide">
          <SectionHeading
            description="Service areas will be updated when RAJ's confirmed service catalog is available."
            eyebrow="04 / SERVICES"
            id="services-title"
            title="Services"
          />
          <div className={styles.serviceGrid}>
            {servicePlaceholders.map((service) => (
              <ServiceCard key={service.number} service={service} />
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="industries-title" className={styles.section}>
        <Container className={styles.industriesGrid} width="wide">
          <div className={styles.industriesCopy}>
            <SectionHeading
              description="These provisional labels are for layout only and are not a confirmed list of industries served."
              eyebrow="05 / INDUSTRIES"
              id="industries-title"
              title="Industries served"
            />
            <Button href="/industries" variant="outline">
              Industry information
            </Button>
          </div>
          <ul aria-label="Provisional industry categories" className={styles.industryList}>
            {provisionalIndustries.map((industry, index) => (
              <li className={styles.industryItem} key={industry}>
                <span className={styles.industryIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{industry}</span>
                <Badge variant="neutral">Provisional</Badge>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="featured-title" className={styles.featuredSection}>
        <Container width="wide">
          <div className={styles.sectionTopline}>
            <SectionHeading
              description="Illustrative placeholders only. These images and names do not represent verified RAJ products or available inventory."
              eyebrow="06 / FEATURED REFERENCES"
              id="featured-title"
              title="Product placeholders"
            />
            <Button className={styles.sectionAction} href="/products" variant="outline">
              Explore categories
            </Button>
          </div>
          <div className={styles.productGrid}>
            {featuredProductPlaceholders.map((product) => (
              <ProductCard key={product.number} product={product} />
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="quote-title" className={styles.quoteSection}>
        <Container className={styles.quoteContent} width="wide">
          <div>
            <p className={styles.quoteEyebrow}>START A CONVERSATION</p>
            <h2 className={styles.quoteTitle} id="quote-title">
              Have a requirement to discuss?
            </h2>
            <p className={styles.quoteDescription}>
              Send your requirements to RAJ. The sales team will review them and
              prepare a quotation manually.
            </p>
          </div>
          <Button className={styles.quoteButton} href="/contact#request-a-quote" variant="secondary">
            Request a Quote
          </Button>
        </Container>
      </section>
    </div>
  );
}