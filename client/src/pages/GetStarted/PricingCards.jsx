// src/pages/GetStarted/PricingCards.jsx
import { motion } from "framer-motion";
import { Check, X, HelpCircle } from "lucide-react";

const PricingCards = () => {
  const pricingOptions = [
    {
      id: "landing",
      title: "Landing Page",
      description: "Perfect for campaigns and product launches",
      price: "₹10,999",
      features: [
        { title: "Beautifully designed custom landing page", included: true },
        { title: "Mobile-responsive design", included: true },
        { title: "Content management system (Partial)", included: true },
        { title: "Lead capture forms", included: true },
        { title: "SEO optimization", included: true },
        { title: "2-week delivery time", included: true },
        { title: "Domain included (if under ₹1,500/year)", included: true },
        { title: "Free hosting for 1 year", included: true },
        { title: "1 month of free support", included: true },
      ],
    },
    {
      id: "portfolio",
      title: "Portfolio Website",
      description: "Showcase your work and talent",
      price: "₹19,999",
      features: [
        { title: "Custom designed portfolio", included: true },
        { title: "Mobile-responsive design", included: true },
        { title: "Content management system", included: true },
        { title: "Project gallery with filtering", included: true },
        { title: "Contact form integration", included: true },
        { title: "Social media integration", included: true },
        { title: "3-week delivery time (Minimum)", included: true },
        { title: "Domain included (if under ₹1,500/year)", included: true },
        { title: "Free hosting for 1 year", included: true },
        { title: "2 month of free support", included: true },
      ],
    },
    {
      id: "blog",
      title: "Blog Website",
      description: "Share your content with the world",
      price: "₹24,999",
      features: [
        { title: "Custom designed blog", included: true },
        { title: "Mobile-responsive design", included: true },
        { title: "Advanced content management", included: true },
        { title: "Category and tag system", included: true },
        { title: "Search functionality", included: true },
        { title: "SEO optimization", included: true },
        { title: "Newsletter integration", included: true },
        { title: "Domain included (if under ₹1,500/year)", included: true },
        { title: "Free hosting for 1 year", included: true },
        { title: "2 month of free support", included: true },
      ],
    },
    {
      id: "ecommerce",
      title: "E-commerce Website",
      description: "Sell products online with ease",
      price: "₹39,999",
      popular: true,
      features: [
        { title: "Custom designed online store", included: true },
        { title: "Mobile-responsive design", included: true },
        { title: "Product management system", included: true },
        { title: "Secure payment gateway integration", included: true },
        { title: "Order management", included: true },
        { title: "Customer accounts", included: true },
        { title: "Product filtering and search", included: true },
        { title: "Domain included (if under ₹1,500/year)", included: true },
        { title: "Free hosting for 1 year", included: true },
        { title: "3 month of free support", included: true },
      ],
    },
    {
      id: "custom",
      title: "Custom Solution",
      description: "Tailored to your specific needs",
      price: "Custom Quote",
      features: [
        { title: "Custom-built from scratch", included: true },
        { title: "Dedicated project manager", included: true },
        { title: "Detailed requirements analysis", included: true },
        { title: "Custom functionality development", included: true },
        { title: "Advanced integrations", included: true },
        { title: "Comprehensive testing", included: true },
        { title: "Training sessions included", included: true },
        { title: "Extended support options", included: true },
        { title: "Domain and hosting consultation", included: true },
        { title: "Maintenance plans available", included: true },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Transparent Pricing</h3>
        <p className="text-gray-600">
          Choose a package that fits your needs, or contact us for a custom
          quote.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {pricingOptions.map((option) => (
          <motion.div
            key={option.id}
            variants={cardVariants}
            className={`border-2 ${
              option.popular
                ? "border-primary shadow-lg relative"
                : "border-gray-200"
            } rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300`}
          >
            {option.popular && (
              <div className="absolute top-0 right-0">
                <div className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                  POPULAR
                </div>
              </div>
            )}

            <div className="p-6">
              <h4 className="text-xl font-bold mb-1">{option.title}</h4>
              <p className="text-gray-600 text-sm mb-4">{option.description}</p>
              <div className="mb-6">
                <span className="text-3xl font-bold">{option.price}</span>
                {option.id !== "custom" && (
                  <span className="text-gray-600 text-sm ml-1">
                    / starting from
                  </span>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {option.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    {feature.included ? (
                      <Check
                        size={18}
                        className="text-green-500 mt-1 mr-3 flex-shrink-0"
                      />
                    ) : (
                      <X
                        size={18}
                        className="text-red-500 mt-1 mr-3 flex-shrink-0"
                      />
                    )}
                    <span
                      className={
                        feature.included ? "text-gray-800" : "text-gray-500"
                      }
                    >
                      {feature.title}
                    </span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 rounded-lg font-medium ${
                  option.popular
                    ? "bg-gradient-to-r from-primary to-secondary text-white"
                    : "border-2 border-primary text-primary hover:bg-primary/5"
                } transition-colors duration-300 bottom-0 `}
              >
                {option.id === "custom" ? "Request Quote" : "Get Started"}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-12 bg-gray-50 rounded-xl p-6 border border-gray-200">
        <div className="flex items-start">
          <HelpCircle
            size={24}
            className="text-primary mt-1 mr-4 flex-shrink-0"
          />
          <div>
            <h4 className="text-lg font-bold mb-2">Need a custom solution?</h4>
            <p className="text-gray-600 mb-4">
              If you don't see a package that fits your needs, we're happy to
              create a custom solution for you. Our prices are tailored to your
              specific requirements and project complexity.
            </p>
            <p className="text-gray-600">
              All packages include one-on-one consultation, responsive design,
              and initial SEO setup. Maintenance plans are available separately
              after the first year.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCards;
