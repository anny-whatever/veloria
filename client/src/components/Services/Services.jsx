// src/components/Services/Services.jsx
import {
  Smartphone,
  Palette,
  Monitor,
  Code,
  Lightbulb,
  BarChart3,
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
  },
  {
    icon: <Monitor size={36} />,
    title: "Web Development",
    description:
      "Custom websites built with modern technologies that are fast, secure, and optimized for all devices.",
    iconColor: "text-secondary-500 dark:text-secondary-400",
    delay: 0.2,
  },
  {
    icon: <Smartphone size={36} />,
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications that provide seamless experiences on any device.",
    iconColor: "text-accent-500 dark:text-accent-400",
    delay: 0.3,
  },
  {
    icon: <Code size={36} />,
    title: "Custom Development",
    description:
      "Tailored software solutions built to address your specific business challenges and requirements.",
    iconColor: "text-light-500 dark:text-light-400",
    delay: 0.4,
  },
  {
    icon: <Lightbulb size={36} />,
    title: "Brand Strategy",
    description:
      "Develop a cohesive brand identity that communicates your values and resonates with your target audience.",
    iconColor: "text-neutral-500 dark:text-neutral-400",
    delay: 0.5,
  },
  {
    icon: <BarChart3 size={36} />,
    title: "Digital Marketing",
    description:
      "Data-driven marketing strategies to increase your online presence and drive meaningful results.",
    iconColor: "text-primary-500 dark:text-primary-400",
    delay: 0.6,
  },
];

const ServiceCard = ({ icon, title, description, iconColor, delay }) => (
  <ScrollReveal delay={delay}>
    <Card
      hover
      className="h-full transition-all duration-300 hover:border-l-4 hover:border-l-primary-500 dark:hover:border-l-primary-400"
    >
      <div className="flex flex-col h-full">
        <div className={`${iconColor} mb-5`}>{icon}</div>
        <Heading level={3} className="mb-3">
          {title}
        </Heading>
        <Text color="muted" className="mt-auto">
          {description}
        </Text>
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
            Transforming Ideas into Digital Reality
          </Heading>
          <Text color="muted" size="lg">
            We offer comprehensive digital solutions to help businesses thrive
            in today's competitive landscape. Our services are tailored to meet
            your specific needs and goals.
          </Text>
        </ScrollReveal>

        <Grid cols={{ default: 1, sm: 2, lg: 3 }} gap="lg">
          {serviceItems.map((service, index) => (
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
