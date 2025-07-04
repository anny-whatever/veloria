import {
  Rocket,
  Code,
  Bot,
  LayoutGrid,
  Shield,
  Users,
  Database,
  GitBranch,
} from "lucide-react";
import { Section, Container } from "../Grid";
import { Heading } from "../Text";
import Text from "../Text";
import ScrollReveal from "../ScrollReveal";
import { CardSpotlight } from "../ui/card-spotlight";

const serviceItems = [
  {
    icon: <Rocket size={28} />,
    title: "MVP Development",
    description:
      "Ship production-ready MVPs in 4-8 weeks with enterprise-grade architecture.",
    features: [
      "Rapid prototyping & validation",
      "Scalable architecture design",
      "Production deployment ready",
      "User feedback integration",
    ],
    delay: 0.1,
  },
  {
    icon: <Code size={28} />,
    title: "Product Engineering",
    description:
      "Full-stack development with modern technologies and best practices.",
    features: [
      "React/Next.js frontends",
      "Node.js/Python backends",
      "Automated testing & CI/CD",
      "Code quality & documentation",
    ],
    delay: 0.2,
  },
  {
    icon: <Bot size={28} />,
    title: "AI Integration",
    description:
      "Integrate cutting-edge AI capabilities into your product ecosystem.",
    features: [
      "GPT-powered features",
      "Custom ML model training",
      "Natural language processing",
      "Intelligent automation",
    ],
    delay: 0.3,
  },
  {
    icon: <LayoutGrid size={28} />,
    title: "Technical Architecture",
    description:
      "Scalable system design and architecture consulting for growth.",
    features: [
      "Microservices architecture",
      "Database design & optimization",
      "Performance & scalability",
      "Technology stack selection",
    ],
    delay: 0.4,
  },
  {
    icon: <Shield size={28} />,
    title: "DevOps & Infrastructure",
    description:
      "Production-ready infrastructure with 99.9% uptime guarantees.",
    features: [
      "AWS/GCP cloud deployment",
      "Monitoring & logging",
      "Security & compliance",
      "Automated backup & recovery",
    ],
    delay: 0.5,
  },
  {
    icon: <Users size={28} />,
    title: "Startup Advisory",
    description: "Technical co-founder on-demand for critical decisions.",
    features: [
      "Tech stack recommendations",
      "Engineering team leadership",
      "Code review & audits",
      "Strategic technology planning",
    ],
    delay: 0.6,
  },
];

const ServiceSpotlightCard = ({
  icon,
  title,
  description,
  features,
  delay,
}) => (
  <ScrollReveal delay={delay}>
    <CardSpotlight className="h-auto min-h-[320px] p-6 bg-gradient-to-br from-stone-950 via-zinc-950 to-gray-950 border-gray-700 hover:border-primary-500/50 transition-all duration-300">
      <div className="flex relative z-20 flex-col h-full">
        <div className="flex mb-4">
          <div className="mr-3 text-primary-400">{icon}</div>
          <Heading level={3} className="text-lg font-semibold text-white">
            {title}
          </Heading>
        </div>

        <Text className="mb-4 leading-relaxed text-white">{description}</Text>

        <ul className="mt-auto space-y-2 list-none">
          {features.map((feature, index) => (
            <li key={index} className="flex gap-2 items-start text-sm">
              <CheckIcon />
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </CardSpotlight>
  </ScrollReveal>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-primary-400 mt-0.5 shrink-0"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path
      d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
      fill="currentColor"
      strokeWidth="0"
    />
  </svg>
);

const SpotlightServices = () => {
  return (
    <Section
      id="services"
      className="py-24 bg-gradient-to-b from-black via-gray-950 to-gray-950"
    >
      <Container>
        <ScrollReveal className="mx-auto mb-16 max-w-3xl text-center">
          <Text
            color="primary"
            size="sm"
            weight="medium"
            className="mb-3 tracking-wider uppercase text-primary-400"
          >
            Product Engineering Services
          </Text>
          <Heading level={2} className="mb-6 text-4xl text-white">
            Engineering Tomorrow's Products
          </Heading>
          <Text size="lg" className="leading-relaxed text-white">
            We partner with technical founders and startups to build
            production-ready products that scale. Enterprise-grade engineering
            with startup velocity.
          </Text>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3">
          {serviceItems.map((service, index) => (
            <ServiceSpotlightCard key={index} {...service} />
          ))}
        </div>

        <div className="text-center">
          <ScrollReveal delay={0.7}>
            <a
              href="/services"
              className="inline-flex gap-2 items-center px-8 py-4 font-semibold text-white bg-gradient-to-r rounded-lg transition-all duration-300 transform hover:text-white from-primary-600 to-primary-500 hover:from-primary-700 hover:no-underline hover:to-primary-600 hover:scale-105 hover:shadow-xl hover:shadow-primary-500/25"
            >
              <span>Explore All Services</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </ScrollReveal>
        </div>
      </Container>
    </Section>
  );
};

export default SpotlightServices;
