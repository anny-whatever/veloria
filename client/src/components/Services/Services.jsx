// src/components/Services/Services.jsx
import {
  Rocket,
  Palette,
  Monitor,
  Code,
  Database,
  Zap,
  Shield,
  GitBranch,
  Bot,
  LayoutGrid,
  Users,
  Settings,
} from "lucide-react";
import { Section, Container, Grid, GridItem } from "../Grid";
import Card from "../Card";
import { Heading } from "../Text";
import Text from "../Text";
import ScrollReveal from "../ScrollReveal";

const serviceItems = [
  {
    icon: <Rocket size={36} />,
    title: "MVP Development",
    description:
      "Ship production-ready MVPs in 4-8 weeks. From idea to market with enterprise-grade architecture that scales.",
    iconColor: "text-primary-500 dark:text-primary-400",
    delay: 0.1,
    link: "/services/mvp-development",
  },
  {
    icon: <Code size={36} />,
    title: "Product Engineering",
    description:
      "Full-stack development with modern technologies. Clean code, automated testing, and CI/CD from day one.",
    iconColor: "text-accent-600 dark:text-accent-400",
    delay: 0.2,
    link: "/services/product-engineering",
  },
  {
    icon: <Bot size={36} />,
    title: "AI Integration",
    description:
      "Integrate cutting-edge AI capabilities into your product. From LLM-powered features to custom ML models.",
    iconColor: "text-primary-600 dark:text-primary-300",
    delay: 0.3,
    link: "/services/ai-integration",
  },
  {
    icon: <LayoutGrid size={36} />,
    title: "Technical Architecture",
    description:
      "Scalable system design and architecture consulting. Build for scale from the beginning, not as an afterthought.",
    iconColor: "text-accent-700 dark:text-accent-400",
    delay: 0.4,
    link: "/services/technical-architecture",
  },
  {
    icon: <Shield size={36} />,
    title: "DevOps & Infrastructure",
    description:
      "Production-ready infrastructure on AWS/GCP. Monitoring, logging, security, and 99.9% uptime guarantees.",
    iconColor: "text-primary-700 dark:text-primary-400",
    delay: 0.5,
    link: "/services/devops-infrastructure",
  },
  {
    icon: <Users size={36} />,
    title: "Startup Advisory",
    description:
      "Technical co-founder on-demand. Architecture decisions, tech stack choices, and engineering team leadership.",
    iconColor: "text-accent-800 dark:text-accent-300",
    delay: 0.6,
    link: "/services/startup-advisory",
  },
  {
    icon: <Database size={36} />,
    title: "API Development",
    description:
      "RESTful and GraphQL APIs designed for scale. Documentation, versioning, and developer-first experiences.",
    iconColor: "text-primary-800 dark:text-primary-400",
    delay: 0.7,
    link: "/services/api-development",
  },
  {
    icon: <GitBranch size={36} />,
    title: "Technical Due Diligence",
    description:
      "Comprehensive code audits and technical assessments. Prepare for investment rounds with confidence.",
    iconColor: "text-accent-600 dark:text-accent-400",
    delay: 0.8,
    link: "/services/technical-due-diligence",
  },
];

const ServiceCard = ({ icon, title, description, iconColor, delay, link }) => (
  <ScrollReveal delay={delay}>
    <Card
      hover
      className="h-full transition-all duration-200 border-l-transparent hover:border-l-4 hover:border-l-primary-500 bg-white/10 backdrop-blur-sm border border-gray-700/50 hover:bg-white/20"
    >
      <div className="flex flex-col h-full">
        <div className={`${iconColor} mb-5`}>{icon}</div>
        <Heading level={3} className="mb-3 text-white">
          {title}
        </Heading>
        <Text className="mt-auto mb-4 text-gray-300">{description}</Text>
        <a
          href={link}
          className="inline-block text-primary-400 font-medium hover:text-primary-300 transition-colors mt-auto"
        >
          Learn more →
        </a>
      </div>
    </Card>
  </ScrollReveal>
);

const Services = () => {
  return (
    <Section
      id="services"
      className="bg-gradient-to-b from-black via-gray-900 to-surface-100 dark:to-dark-100 pt-24"
    >
      <Container>
        <ScrollReveal className="mb-16 max-w-3xl mx-auto text-center">
          <Text
            color="primary"
            size="sm"
            weight="medium"
            className="uppercase tracking-wider mb-3 text-primary-400"
          >
            Product Engineering Services
          </Text>
          <Heading level={2} className="mb-4 text-white">
            From MVP to Scale
          </Heading>
          <Text size="lg" className="text-gray-300">
            We partner with technical founders and startups to build
            production-ready products that scale. Enterprise-grade engineering
            with startup velocity.
          </Text>
        </ScrollReveal>

        <div className="mb-10 flex justify-center">
          <a
            href="/services"
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25 inline-block hover:text-white no-underline hover:no-underline"
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
