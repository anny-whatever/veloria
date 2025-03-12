// src/components/Portfolio/Portfolio.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import PortfolioItem from "./PortfolioItem";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Demo portfolio items - would be replaced with real projects
  const portfolioItems = [
    {
      id: 1,
      title: "Children's Clothing Brand",
      category: "ecommerce",
      image: "/placeholder1.jpg",
      description:
        "An e-commerce site for a premium children's clothing brand featuring custom checkout and inventory management.",
    },
    {
      id: 2,
      title: "Wellness Spa Website",
      category: "branding",
      image: "/placeholder2.jpg",
      description:
        "Complete branding and website for a luxury wellness spa targeting women.",
    },
    {
      id: 3,
      title: "Maternity Blog Platform",
      category: "blog",
      image: "/placeholder3.jpg",
      description:
        "Custom blog platform for a maternity influencer with content management system and newsletter integration.",
    },
    {
      id: 4,
      title: "Organic Baby Food Shop",
      category: "ecommerce",
      image: "/placeholder4.jpg",
      description:
        "E-commerce platform for organic baby food with subscription service and mobile app integration.",
    },
    {
      id: 5,
      title: "Women's Fitness Program",
      category: "webapp",
      image: "/placeholder5.jpg",
      description:
        "Interactive web application for women's fitness programs with progress tracking and community features.",
    },
    {
      id: 6,
      title: "Family Photography Portfolio",
      category: "branding",
      image: "/placeholder6.jpg",
      description:
        "Portfolio website for a family photographer with custom gallery features and booking system.",
    },
  ];

  const filteredItems =
    activeFilter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

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

  const headerVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "ecommerce", label: "E-commerce" },
    { id: "branding", label: "Branding" },
    { id: "webapp", label: "Web Apps" },
    { id: "blog", label: "Blogs" },
  ];

  return (
    <section
      id="portfolio"
      ref={ref}
      className="py-20 md:py-28 bg-gray-50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent rounded-full opacity-60 -translate-y-1/4 translate-x-1/4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            inView ? { opacity: 0.6, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 1.2, delay: 0.2 }}
        ></motion.div>

        <motion.div
          className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-radial from-accent/5 to-transparent rounded-full opacity-60 translate-y-1/4 -translate-x-1/4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            inView ? { opacity: 0.6, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 1.2, delay: 0.4 }}
        ></motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Portfolio</h2>
          <p className="text-gray-600 text-lg">
            Explore our recent projects and see how we've helped brands achieve
            their digital goals.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {filteredItems.map((item, index) => (
            <PortfolioItem key={item.id} item={item} index={index} />
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            className="px-8 py-3 bg-white border-2 border-primary text-primary font-medium rounded-full hover:bg-primary hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
