import { useState } from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Palette,
  Monitor,
  Code,
  ShoppingBag,
  Database,
  Hotel,
  School,
  Hospital,
  DollarSign,
  LayoutGrid,
} from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { SeoHead, PAGE_SEO, getServiceSchema } from "../../components/SEO";

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  // All service categories
  const categories = [
    { id: "all", label: "All Services" },
    { id: "web", label: "Web Development" },
    { id: "app", label: "App Development" },
    { id: "ecommerce", label: "E-commerce" },
    { id: "management", label: "Management Systems" },
  ];

  // Service items with their categories
  const services = [
    {
      id: "web-design",
      name: "UI/UX Design",
      slug: "ui-ux-design",
      icon: <Palette size={40} />,
      categories: ["web"],
      description:
        "Create intuitive and beautiful user interfaces that enhance user experience. Our design process focuses on both aesthetics and functionality to deliver websites that engage visitors and drive conversions.",
      features: [
        "User research & persona development",
        "Wireframing & prototyping",
        "Interactive UI design",
        "Responsive layouts",
        "Usability testing",
      ],
      keywords:
        "UI/UX design, web design India, user interface design, user experience design",
    },
    {
      id: "web-development",
      name: "Web Development",
      slug: "web-development",
      icon: <Monitor size={40} />,
      categories: ["web"],
      description:
        "Custom website development with modern technologies that are fast, secure, and optimized for all devices. We build websites that not only look great but perform exceptionally well across all platforms.",
      features: [
        "Responsive web development",
        "CMS integration",
        "API development",
        "Performance optimization",
        "Web accessibility compliance",
      ],
      keywords:
        "web development company India, website development services, custom web application development, responsive website design",
    },
    {
      id: "app-development",
      name: "Mobile App Development",
      slug: "mobile-app-development",
      icon: <Smartphone size={40} />,
      categories: ["app"],
      description:
        "Native and cross-platform mobile applications that provide seamless experiences on any device. Our mobile apps are built with performance and user experience in mind, ensuring they meet the highest standards in the industry.",
      features: [
        "iOS and Android development",
        "Cross-platform solutions",
        "Progressive Web Apps (PWA)",
        "App Store optimization",
        "Integration with device features",
      ],
      keywords:
        "mobile app development services, iOS app development, Android app development, cross-platform app development India",
    },
    {
      id: "custom-development",
      name: "Custom Software Development",
      slug: "custom-software-development",
      icon: <Code size={40} />,
      categories: ["web", "app"],
      description:
        "Tailored software solutions built to address your specific business challenges and requirements. We develop custom software that streamlines operations, enhances productivity, and provides a competitive edge.",
      features: [
        "Requirements analysis",
        "Custom architecture design",
        "Scalable software development",
        "Integration with existing systems",
        "Post-launch support",
      ],
      keywords:
        "custom software development India, bespoke software solutions, enterprise software development, IT solutions provider India",
    },
    {
      id: "ecommerce-development",
      name: "E-commerce Development",
      slug: "ecommerce-management-system",
      icon: <ShoppingBag size={40} />,
      categories: ["ecommerce", "web"],
      description:
        "Build powerful online stores that drive sales and provide exceptional shopping experiences. Our e-commerce solutions include everything from product management to secure payment gateways and analytics.",
      features: [
        "Custom e-commerce websites",
        "Shopping cart development",
        "Payment gateway integration",
        "Product catalog management",
        "Order processing systems",
      ],
      keywords:
        "ecommerce website development India, online store development services, custom ecommerce platform development, ecommerce solutions provider India",
    },
    {
      id: "database-development",
      name: "Database Solutions",
      slug: "database-solutions",
      icon: <Database size={40} />,
      categories: ["web", "app", "management"],
      description:
        "Design and implementation of robust database systems for effective data management. Our database solutions ensure data integrity, security, and optimal performance for your applications.",
      features: [
        "Database architecture design",
        "Data migration services",
        "Performance optimization",
        "Backup & recovery solutions",
        "Database security implementation",
      ],
      keywords:
        "database development services, data management solutions, custom database design, SQL and NoSQL database services",
    },
    {
      id: "hotel-management",
      name: "Hotel Management Systems",
      slug: "hotel-management-system",
      icon: <Hotel size={40} />,
      categories: ["management"],
      description:
        "Comprehensive hotel management software to streamline operations, improve guest experience, and maximize revenue. Our systems cover everything from reservations to housekeeping and financial reporting.",
      features: [
        "Reservation & booking management",
        "Front desk operations",
        "Housekeeping management",
        "Billing & invoicing",
        "Guest relationship management",
      ],
      keywords:
        "hotel management system development, custom hotel management software India, hotel booking engine development, hospitality management solutions",
    },
    {
      id: "school-management",
      name: "School Management Systems",
      slug: "school-management-system",
      icon: <School size={40} />,
      categories: ["management"],
      description:
        "Powerful school management software to digitize educational institutions' administrative processes. Our systems help schools manage everything from admissions to examinations and fee collection.",
      features: [
        "Student information management",
        "Attendance tracking",
        "Examination management",
        "Fee management",
        "Communication portals for parents",
      ],
      keywords:
        "school management system development, school ERP software India, education management software, college management system development",
    },
    {
      id: "hospital-management",
      name: "Hospital Management Systems",
      slug: "hospital-management-system",
      icon: <Hospital size={40} />,
      categories: ["management"],
      description:
        "Efficient hospital management systems to streamline healthcare operations and improve patient care. Our solutions help healthcare providers manage appointments, patient records, billing, and more.",
      features: [
        "Patient records management",
        "Appointment scheduling",
        "Laboratory management",
        "Pharmacy integration",
        "Billing & insurance processing",
      ],
      keywords:
        "hospital management system development, clinic management software development, healthcare management software, medical practice management system",
    },
    {
      id: "payroll-management",
      name: "Payroll Management Systems",
      slug: "payroll-management-system",
      icon: <DollarSign size={40} />,
      categories: ["management"],
      description:
        "Reliable payroll management systems to automate salary processing and tax calculations. Our solutions ensure accurate and timely payment processing while reducing administrative burden.",
      features: [
        "Automated salary calculation",
        "Tax management",
        "Leave & attendance tracking",
        "Employee self-service portal",
        "Compliance reporting",
      ],
      keywords:
        "payroll management system development, custom payroll software India, HRMS development services, employee management software",
    },
    {
      id: "erp-system",
      name: "Enterprise Resource Planning (ERP)",
      slug: "erp-system",
      icon: <LayoutGrid size={40} />,
      categories: ["management"],
      description:
        "Integrated enterprise resource planning solutions that connect all aspects of your business in a single system. Our ERP systems help streamline operations, enhance productivity, and drive business growth.",
      features: [
        "Financial management",
        "Inventory & supply chain",
        "Human resources",
        "Customer relationship management",
        "Business intelligence & reporting",
      ],
      keywords:
        "erp system development, enterprise resource planning software, business management software, erp solutions, custom erp development",
    },
  ];

  // Filter services based on active tab
  const filteredServices =
    activeTab === "all"
      ? services
      : services.filter((service) => service.categories.includes(activeTab));

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-dark-200">
      <SeoHead
        title={PAGE_SEO.services.title}
        description={PAGE_SEO.services.description}
        keywords={PAGE_SEO.services.keywords}
        pathname="/services"
        structuredData={getServiceSchema({
          name: "Web & App Development Services",
          description:
            "Professional web development, mobile app development, and custom software services for businesses of all sizes in India.",
          slug: "services",
        })}
      />

      <Navbar />

      <main className="pt-32 pb-20">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-dark-100 dark:to-dark-300 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Our Services
              </motion.h1>
              <motion.p
                className="text-xl text-gray-700 dark:text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Comprehensive web and app development solutions tailored to your
                business needs
              </motion.p>
            </div>
          </div>
        </section>

        {/* Services section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            {/* Category tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-5 py-2.5 rounded-full transition-all duration-300 ${
                    activeTab === category.id
                      ? "bg-primary-500 dark:bg-primary-600 text-white shadow-md"
                      : "bg-white dark:bg-dark-300 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-400"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Services grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  className="bg-white dark:bg-dark-300 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="p-6">
                    <div className="text-primary-500 dark:text-primary-400 mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {service.description}
                    </p>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                      Key Features:
                    </h4>
                    <ul className="mb-6 space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary-500 dark:text-primary-400 mr-2">
                            •
                          </span>
                          <span className="text-gray-600 dark:text-gray-300 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto">
                      <a
                        href={`/services/${service.slug}`}
                        className="inline-block text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                      >
                        Learn more →
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-primary-600 dark:bg-primary-700 py-16 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to start your project?
            </h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              We're here to help you transform your ideas into reality. Let's
              create something amazing together.
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
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
