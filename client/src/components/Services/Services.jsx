// src/components/Services/Services.jsx
import {
  Smartphone,
  Palette,
  Monitor,
  Code,
  Database,
  Hotel,
  School,
  Hospital,
  ShoppingBag,
  LayoutGrid,
  DollarSign,
} from "lucide-react";
import { Section, Container, Grid, GridItem } from "../Grid";
import Card from "../Card";
import { Heading } from "../Text";
import Text from "../Text";
import ScrollReveal from "../ScrollReveal";

const serviceItems = [
  {
    icon: <Palette size={36} />,
    title: "UI/UX Design",
    description:
      "Create intuitive, beautiful interfaces that delight your users and enhance their experience with your brand.",
    iconColor: "text-primary-500 dark:text-primary-400",
    delay: 0.1,
    link: "/services/ui-ux-design",
  },
  {
    icon: <Monitor size={36} />,
    title: "Web Development",
    description:
      "Custom websites built with modern technologies that are fast, secure, and optimized for all devices.",
    iconColor: "text-secondary-500 dark:text-secondary-400",
    delay: 0.2,
    link: "/services/web-development",
  },
  {
    icon: <Smartphone size={36} />,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications that provide seamless experiences on any device.",
    iconColor: "text-accent-500 dark:text-accent-400",
    delay: 0.3,
    link: "/services/mobile-app-development",
  },
  {
    icon: <Hotel size={36} />,
    title: "Hotel Management",
    description:
      "Comprehensive hotel management systems to streamline operations, improve guest experience, and maximize revenue.",
    iconColor: "text-primary-500 dark:text-primary-400",
    delay: 0.4,
    link: "/services/hotel-management-system",
  },
  {
    icon: <School size={36} />,
    title: "School Management",
    description:
      "Powerful school management software to digitize educational institutions' administrative processes.",
    iconColor: "text-secondary-500 dark:text-secondary-400",
    delay: 0.5,
    link: "/services/school-management-system",
  },
  {
    icon: <ShoppingBag size={36} />,
    title: "E-commerce Solutions",
    description:
      "Build powerful online stores that drive sales and provide exceptional shopping experiences.",
    iconColor: "text-accent-500 dark:text-accent-400",
    delay: 0.6,
    link: "/services/ecommerce-management-system",
  },
  {
    icon: <LayoutGrid size={36} />,
    title: "ERP Systems",
    description:
      "Integrated enterprise resource planning solutions that connect all aspects of your business in a single system.",
    iconColor: "text-neutral-500 dark:text-neutral-400",
    delay: 1.0,
    link: "/services/erp-system",
  },
  {
    icon: <DollarSign size={36} />,
    title: "Payroll Management",
    description:
      "Reliable payroll management systems to automate salary processing and tax calculations.",
    iconColor: "text-primary-500 dark:text-primary-400",
    delay: 1.1,
    link: "/services/payroll-management-system",
  },
];

const ServiceCard = ({ icon, title, description, iconColor, delay, link }) => (
  <ScrollReveal delay={delay}>
    <Card
      hover
      className="h-full transition-all duration-200 border-l-transparent hover:border-l-4 hover:border-l-secondary-500 dark:hover:border-l-secondary-400"
    >
      <div className="flex flex-col h-full">
        <div className={`${iconColor} mb-5`}>{icon}</div>
        <Heading level={3} className="mb-3">
          {title}
        </Heading>
        <Text color="muted" className="mt-auto mb-4">
          {description}
        </Text>
        <a
          href={link}
          className="inline-block text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors mt-auto"
        >
          Learn more →
        </a>
      </div>
    </Card>
  </ScrollReveal>
);

const Services = () => {
  return (
    <Section id="services" className="bg-surface-100 dark:bg-dark-100">
      <Container>
        <ScrollReveal className="mb-16 max-w-3xl mx-auto text-center">
          <Text
            color="primary"
            size="sm"
            weight="medium"
            className="uppercase tracking-wider mb-3"
          >
            Our Services
          </Text>
          <Heading level={2} className="mb-4">
            Comprehensive Digital Solutions
          </Heading>
          <Text color="muted" size="lg">
            We offer a wide range of services designed to help businesses
            streamline operations, enhance customer experiences, and drive
            growth in today's digital landscape.
          </Text>
        </ScrollReveal>

        <div className="mb-10 flex justify-center">
          <a
            href="/services"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:-translate-y-1 inline-block hover:text-white no-underline hover:no-underline"
          >
            View All Services
          </a>
        </div>

        <Grid cols={{ default: 1, sm: 2, lg: 3 }} gap="lg">
          {serviceItems.slice(0, 6).map((service, index) => (
            <GridItem key={index}>
              <ServiceCard {...service} />
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default Services;
