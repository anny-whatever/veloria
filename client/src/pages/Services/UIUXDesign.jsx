import { motion } from "framer-motion";
import {
  Palette,
  Check,
  Users,
  Layers,
  LayoutGrid,
  Smartphone,
  MousePointer,
  Figma,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import { SeoHead, getServiceSchema } from "../../components/SEO";

const UIUXDesign = () => {
  const features = [
    {
      icon: <Users size={24} />,
      title: "User Research",
      description:
        "In-depth analysis of user behavior, needs, and motivations to create designs that truly solve problems and deliver value.",
    },
    {
      icon: <Layers size={24} />,
      title: "Wireframing & Prototyping",
      description:
        "Detailed sketches and interactive prototypes that visualize concepts early and enable iterative testing and improvement.",
    },
    {
      icon: <Palette size={24} />,
      title: "Visual Design",
      description:
        "Creating beautiful interfaces with carefully crafted color schemes, typography, and imagery that align with your brand identity.",
    },
    {
      icon: <LayoutGrid size={24} />,
      title: "Responsive Layouts",
      description:
        "Designs that automatically adapt to any screen size, ensuring a consistent and optimal experience across all devices.",
    },
    {
      icon: <MousePointer size={24} />,
      title: "Interaction Design",
      description:
        "Thoughtful animation and micro-interactions that provide visual feedback and make interfaces more intuitive and engaging.",
    },
    {
      icon: <Smartphone size={24} />,
      title: "Mobile-First Design",
      description:
        "Design approach that prioritizes mobile experiences first, then scales up to larger screens for optimum usability everywhere.",
    },
  ];

  const benefits = [
    "Increase user engagement and retention with intuitive interfaces",
    "Reduce development costs by resolving design issues early",
    "Enhance brand perception with visually appealing designs",
    "Improve conversion rates with optimized user journeys",
    "Boost accessibility for users of all abilities",
    "Stay ahead of competitors with innovative design solutions",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  // SEO metadata
  const title = "UI/UX Design Services | Veloria";
  const description =
    "Professional UI/UX design services in India. Create intuitive, engaging, and conversion-focused user interfaces and experiences for web and mobile applications.";
  const keywords =
    "UI/UX design, user interface design, user experience design, web design India, mobile app design, interface design, usability design";

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-dark-200">
      <SeoHead
        title={title}
        description={description}
        keywords={keywords}
        pathname="/services/ui-ux-design"
        structuredData={getServiceSchema({
          name: "UI/UX Design Services",
          description:
            "Professional UI/UX design services creating intuitive and engaging user interfaces that convert visitors into customers.",
          slug: "ui-ux-design",
        })}
      />

      <Navbar />

      <main className="pt-32 pb-20">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-dark-100 dark:to-dark-300 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <motion.h1
                  className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  UI/UX Design Services
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-700 dark:text-gray-300 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Create intuitive, engaging, and beautiful user interfaces that
                  enhance user experience and drive conversions.
                </motion.p>
                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <a
                    href="/get-started"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
                  >
                    Get Started
                  </a>
                  <a
                    href="/contact"
                    className="bg-white dark:bg-dark-300 hover:bg-gray-100 dark:hover:bg-dark-400 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-medium transition-all"
                  >
                    Contact Us
                  </a>
                </motion.div>
              </div>
              <div className="lg:w-1/2">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="bg-white dark:bg-dark-300 rounded-2xl shadow-xl p-6 relative z-10">
                    <div className="text-primary-500 dark:text-primary-400 mb-4">
                      <Palette size={48} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      User-Centered Design
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Our UI/UX design process focuses on creating interfaces
                      that are not only beautiful but also functional and
                      user-friendly, keeping your audience at the center of
                      every decision.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          User Research
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Wireframing
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Visual Design
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="text-green-500" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          Usability Testing
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-full h-full bg-primary-100 dark:bg-primary-900/20 rounded-2xl -z-10"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Our UI/UX Design Services
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We create user-centered designs through a comprehensive approach
                that combines aesthetics with functionality and usability.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-dark-300 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                  variants={itemVariants}
                >
                  <div className="text-primary-500 dark:text-primary-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Benefits section */}
        <section className="py-20 bg-gray-50 dark:bg-dark-300">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Benefits of Professional UI/UX Design
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Investing in quality UI/UX design delivers tangible business
                  results and creates products that users love to interact with.
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="bg-primary-500 dark:bg-primary-600 rounded-full p-1 text-white mt-0.5">
                        <Check size={16} />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {benefit}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="lg:w-1/2">
                <motion.div
                  className="bg-white dark:bg-dark-200 rounded-2xl shadow-xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-primary-600 dark:bg-primary-700 p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">Design Impact</h3>
                    <p className="text-primary-100">
                      How great UI/UX drives business success
                    </p>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                          94%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          First impressions are design-related
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-secondary-600 dark:text-secondary-400">
                          67%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Users prefer well-designed interfaces
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-accent-600 dark:text-accent-400">
                          88%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Users won't return after bad experiences
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-light-600 dark:text-light-400">
                          200%
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Average ROI of UX investment
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Process section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Our Design Process
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We follow a systematic approach to create user interfaces that
                are not only beautiful but also functional and user-friendly.
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[50%] top-0 bottom-0 w-1 bg-primary-200 dark:bg-primary-900 transform -translate-x-1/2 hidden md:block"></div>

              <div className="space-y-12">
                {[
                  {
                    title: "Discovery & Research",
                    description:
                      "We begin by understanding your business goals, target audience, and competitive landscape to identify design opportunities.",
                  },
                  {
                    title: "User Personas & Journey Maps",
                    description:
                      "Creating detailed profiles of your users and mapping their journeys helps us design for their specific needs and pain points.",
                  },
                  {
                    title: "Wireframing & Prototyping",
                    description:
                      "We sketch the layout and functionality of your interface, then create interactive prototypes for early testing and feedback.",
                  },
                  {
                    title: "Visual Design",
                    description:
                      "Our designers craft beautiful interfaces with attention to color, typography, imagery, and animations that align with your brand.",
                  },
                  {
                    title: "Usability Testing",
                    description:
                      "We test designs with real users to identify any usability issues and validate that the interface meets user needs effectively.",
                  },
                  {
                    title: "Implementation Support",
                    description:
                      "We work closely with developers to ensure the design is implemented exactly as intended, providing assets and specifications.",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className="relative flex flex-col md:flex-row items-center md:items-start gap-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <div
                      className={`md:w-1/2 flex ${
                        index % 2 === 0 ? "md:justify-end" : "md:order-last"
                      }`}
                    >
                      <div className="bg-white dark:bg-dark-300 p-6 rounded-xl shadow-lg max-w-md">
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Timeline marker */}
                    <div className="absolute left-[50%] transform -translate-x-1/2 -translate-y-1/3 hidden md:block">
                      <div className="w-10 h-10 rounded-full bg-primary-500 dark:bg-primary-600 text-white flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                    </div>

                    <div className="md:w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-primary-600 dark:bg-primary-700 py-16 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to create an exceptional user experience?
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Let's design intuitive interfaces that your users will love and
              that help achieve your business goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/get-started"
                className="bg-white text-primary-600 hover:text-primary-700 px-6 py-3 rounded-full font-medium transition-all hover:shadow-lg"
              >
                Get Started
              </a>
              <a
                href="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-full font-medium transition-all"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Have questions about our UI/UX design services? Find answers to
                commonly asked questions below.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "What's the difference between UI and UX design?",
                  answer:
                    "UI (User Interface) design focuses on the visual elements of a digital product—how it looks, including colors, typography, buttons, and layout. UX (User Experience) design is concerned with how users interact with the product—the flow, accessibility, and overall experience. While UI is about aesthetics, UX is about functionality and usability. Our services combine both to create interfaces that are beautiful and intuitive.",
                },
                {
                  question:
                    "How long does a typical UI/UX design project take?",
                  answer:
                    "The timeline varies based on the project's complexity. A simple website redesign might take 4-6 weeks, while a complex application could require 8-12 weeks or more. We'll provide a detailed timeline after understanding your specific requirements. Our process includes research, wireframing, visual design, prototyping, and revisions to ensure a high-quality final product.",
                },
                {
                  question: "Do you provide design systems for developers?",
                  answer:
                    "Yes, we create comprehensive design systems that include component libraries, style guides, and documentation to ensure consistent implementation. These systems help developers accurately translate designs into code, maintain consistency across the product, and make future updates more efficient. We can deliver these in various formats including Figma, Adobe XD, or Sketch files.",
                },
                {
                  question: "How do you ensure the designs are user-friendly?",
                  answer:
                    "We use a variety of methods to ensure usability, including user research, persona development, journey mapping, and usability testing. We test designs with real users throughout the process, collecting feedback and making iterative improvements. We also follow established design principles and best practices while keeping accessibility in mind to create interfaces that are intuitive for all users.",
                },
                {
                  question:
                    "Can you redesign our existing website or application?",
                  answer:
                    "Absolutely! We specialize in redesigning existing digital products while preserving their core functionality and improving the user experience. We start by analyzing the current design, identifying pain points, and researching user needs. Then we create a new design that addresses issues while enhancing visual appeal and usability. We can work on partial redesigns or complete overhauls depending on your needs.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-dark-300 rounded-xl shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default UIUXDesign;
