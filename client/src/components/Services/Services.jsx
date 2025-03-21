// src/components/Services/Services.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const services = [
    {
      title: "Website Design",
      description:
        "Create stunning, responsive websites that capture your brand's essence and engage your audience with intuitive user experiences.",
      icon: "design",
      color: "primary",
    },
    {
      title: "E-commerce Solutions",
      description:
        "Build powerful online stores with secure payment gateways, inventory management, and seamless checkout experiences.",
      icon: "ecommerce",
      color: "secondary",
    },
    {
      title: "Brand Strategy",
      description:
        "Develop comprehensive brand identities that communicate your values and connect with your target audience.",
      icon: "brand",
      color: "accent",
    },
    {
      title: "SEO Optimization",
      description:
        "Improve your website's visibility and drive organic traffic with tailored search engine optimization strategies.",
      icon: "seo",
      color: "primary",
    },
    {
      title: "Content Management",
      description:
        "Implement easy-to-use content management systems that empower you to update your website with minimal technical knowledge.",
      icon: "cms",
      color: "secondary",
    },
    {
      title: "Conversion Optimization",
      description:
        "Transform visitors into customers with data-driven strategies that optimize your conversion funnels and boost ROI.",
      icon: "conversion",
      color: "primary",
    },
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

  const headerVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  return (
    <section
      id="services"
      ref={ref}
      className="py-20 md:py-28 bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute top-0 right-0 h-64 w-64 text-primary/5 transform translate-x-1/3 -translate-y-1/4"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M37.5,-48.1C52.1,-38.4,70,-31.6,74.2,-20.4C78.5,-9.2,69.2,6.2,60.9,19.6C52.7,33.1,45.4,44.5,34.9,52.7C24.4,60.9,10.7,65.9,-2.6,69.2C-16,72.5,-29.9,74.2,-42.1,68.3C-54.3,62.5,-64.9,49.2,-71.2,34.2C-77.6,19.2,-79.7,2.7,-75.4,-11.9C-71.1,-26.5,-60.5,-39.1,-47.8,-49.2C-35.1,-59.2,-20.4,-66.6,-5.8,-60.1C8.9,-53.5,22.9,-33.1,29.4,-26.5C35.9,-19.9,32.9,-7,37.5,2.5C42,12,54.1,18.1,54.9,23.9C55.8,29.7,45.4,35.3,35.9,35.7C26.5,36.1,18,31.3,10,31.3C2,31.3,-5.5,36.3,-14.5,37.7C-23.5,39.1,-34,37,-41.2,30.9C-48.3,24.8,-52.2,14.7,-52.7,4.4C-53.3,-5.8,-50.6,-16.2,-44.5,-23.5C-38.5,-30.7,-29.2,-34.9,-20.7,-45.8C-12.2,-56.7,-4.6,-74.3,3,-77.1C10.5,-80,21,-68,31.9,-58.4C42.8,-48.8,54,-41.7,52.4,-32.5C50.8,-23.3,36.4,-12,37.5,-0.7C38.5,10.7,55,21.3,56.6,28.2C58.2,35,45,38,39.6,45.2C34.3,52.3,36.8,63.5,32.6,66.2C28.4,68.9,17.6,63.1,5.3,65.5C-7,67.9,-20.7,78.6,-29.4,74.9C-38.1,71.2,-41.7,53.2,-49.8,39.7C-57.9,26.1,-70.5,17.1,-75.2,5.2C-79.9,-6.7,-76.7,-21.4,-68.5,-32.5C-60.2,-43.6,-46.9,-51,-34.2,-60.9C-21.6,-70.7,-9.5,-82.9,1.2,-84.5C11.9,-86.1,22.4,-77.1,33.8,-67.2C45.1,-57.3,57.2,-46.5,56.9,-35.5C56.6,-24.5,44,-13.2,41.3,-3.3C38.6,6.6,45.9,15.3,43.7,18.7C41.5,22.1,29.8,20.2,24.6,22.6C19.3,24.9,20.5,31.5,16.1,42.8C11.8,54.1,2,70.2,-6.4,78.8C-14.8,87.4,-21.9,88.5,-30.7,85.1C-39.5,81.7,-50,73.9,-58.7,63.8C-67.4,53.8,-74.2,41.6,-77.3,28.7C-80.5,15.8,-79.9,2.3,-75.9,-9.7C-71.9,-21.8,-64.4,-32.3,-55.1,-39.4C-45.7,-46.5,-34.4,-50.1,-23.3,-60.4C-12.3,-70.7,-1.6,-87.7,7.1,-96.9C15.9,-106.1,22.8,-107.6,33.5,-103.6C44.2,-99.6,58.7,-90.2,62.1,-77.2C65.6,-64.1,58,-47.4,54.9,-34.6C51.8,-21.8,53.1,-12.8,58.9,-1.7C64.6,9.4,74.8,22.6,78.1,36.3C81.4,50.1,77.8,64.4,68.4,72.3C59,80.3,43.8,81.9,29.9,80.1C16,78.3,3.3,73.1,-7.3,68.1C-17.9,63.1,-26.6,58.3,-39.7,54C-52.8,49.7,-70.4,45.9,-78.3,35.8C-86.3,25.7,-84.5,9.4,-76.4,-2.4C-68.3,-14.1,-53.8,-21.4,-44.4,-31.8C-35,-42.3,-30.7,-55.9,-22.5,-63.6C-14.3,-71.3,-2.2,-73,9.3,-73.7C20.8,-74.4,31.7,-74.2,43.2,-69.9C54.8,-65.6,66.9,-57.3,66.9,-47.8C66.9,-38.3,54.7,-27.6,49.9,-17.3C45.1,-7,47.6,2.9,49.6,15.1C51.5,27.2,53,41.5,47.8,51.7C42.7,62,31,68.1,18.4,72.5C5.8,77,-7.8,79.8,-19.9,77.2C-32,74.7,-42.7,66.8,-52.9,57.7C-63.1,48.5,-72.7,38.1,-75.4,26C-78.1,13.8,-73.7,-0.1,-67.4,-12.1C-61.1,-24.2,-52.7,-34.5,-42.3,-44.5C-31.8,-54.5,-19.2,-64.3,-5.4,-70.3C8.3,-76.3,23.2,-78.5,32.3,-71.7C41.4,-64.9,44.6,-49.1,50.3,-36.6C56,-24.1,64.1,-14.8,63.5,-5.9C63,-3,53.7,-0.5,53.8,0.5C53.9,1.5,63.5,1,67.7,4.4C71.9,7.8,70.7,15.2,68.4,23.7C66.1,32.2,62.7,41.8,55.4,50.1C48.1,58.4,36.9,65.3,25.1,67C13.3,68.7,0.9,65.2,-10.7,60.3C-22.3,55.4,-33.1,49.2,-43.1,41.3C-53.1,33.4,-62.3,23.9,-65.7,12.5C-69.1,1.1,-66.7,-12.1,-62.2,-24.8C-57.8,-37.5,-51.4,-49.7,-41.9,-54.9C-32.4,-60.1,-19.8,-58.3,-8.5,-54.2C2.8,-50.1,12.8,-43.8,24.8,-39.5C36.7,-35.3,50.5,-33.1,59.2,-25.6C67.9,-18.1,71.5,-5.2,71,8C70.6,21.2,66.1,34.6,59,46.6C51.8,58.6,42,69.3,29.1,74.9C16.2,80.5,0.2,81,-13.5,78.7C-27.2,76.4,-38.7,71.4,-49.9,64.1C-61.1,56.9,-72,47.5,-78.3,35.2C-84.6,22.9,-86.4,7.7,-83.3,-6.2C-80.3,-20.2,-72.5,-32.9,-61.8,-42.2C-51.1,-51.5,-37.6,-57.3,-24.8,-64.9C-12,-72.4,0.1,-81.6,10.9,-79.5C21.8,-77.4,31.5,-64,40.6,-54C49.7,-44,58.3,-37.3,63.8,-28.1C69.3,-18.9,71.8,-7.1,72.2,4.7C72.6,16.6,71,28.5,67.7,42.3C64.5,56.1,59.6,71.7,50.2,79.1C40.9,86.5,27.1,85.7,14.4,82.8C1.7,79.9,-9.9,75,-22.4,70.9C-34.8,66.9,-48.1,63.8,-56.6,54.9C-65.1,46.1,-68.7,31.4,-70.2,17.3C-71.7,3.1,-71.1,-10.6,-66.7,-22.9C-62.3,-35.2,-54.1,-46.1,-43.5,-54.3C-32.9,-62.5,-19.9,-68,-8.3,-70.7C3.3,-73.4,13.5,-73.3,25.2,-72.5C36.9,-71.7,50.1,-70.1,58.1,-63.1C66.1,-56.1,69,-43.5,66.3,-32.2C63.6,-20.9,55.4,-10.8,53,-0.8C50.6,9.1,54,18.1,56.4,30.3C58.7,42.4,60,57.7,53.3,67.2C46.6,76.7,32,80.6,17.6,82C3.2,83.4,-11,82.5,-25.2,79.1C-39.3,75.8,-53.3,70.2,-61.9,59.7C-70.5,49.3,-73.7,34.1,-74.4,19.9C-75.1,5.7,-73.3,-7.3,-67.2,-17.9C-61.1,-28.4,-50.7,-36.5,-40.3,-45.3C-29.9,-54.1,-19.5,-63.6,-6.5,-67.9C6.5,-72.3,22.1,-71.6,31.5,-66C40.9,-60.4,44.1,-49.9,46.9,-39.9C49.7,-29.9,52.1,-20.3,56.5,-10C60.9,0.3,67.4,11.3,70.6,24.2C73.7,37.1,73.6,51.8,68.1,65.4C62.6,79,51.8,91.5,38.2,97.1C24.6,102.8,8.1,101.6,-8.5,100.7C-25,99.8,-41.6,99.3,-56.1,93.7C-70.6,88.1,-83.1,77.5,-91.2,64C-99.4,50.4,-103.3,33.9,-103.8,17.4C-104.3,0.9,-101.4,-15.5,-94.8,-30.4C-88.2,-45.3,-77.8,-58.7,-64.1,-69.6C-50.3,-80.4,-33.3,-88.7,-16.1,-87.7C1.1,-86.6,18.3,-76.2,30.5,-66.3C42.7,-56.3,49.7,-46.9,53.8,-36.3C57.9,-25.7,59.1,-13.9,60.3,-1.2C61.5,11.5,62.7,24,64.1,38.6C65.5,53.2,67.1,69.8,61.2,83.2C55.3,96.7,41.9,106.9,27.3,109.7C12.6,112.5,-3.3,107.9,-17,101.5C-30.7,95.1,-42.1,86.9,-52,76.8C-61.9,66.7,-70.3,54.7,-73.4,41.3C-76.5,27.9,-74.5,13.2,-73.8,-1.6C-73.1,-16.5,-73.7,-31.4,-67.7,-44.1C-61.6,-56.8,-48.9,-67.3,-35.2,-76.5C-21.5,-85.7,-6.9,-93.7,8.9,-94.3C24.7,-94.9,41.5,-88.2,51.7,-77.4C61.9,-66.6,65.6,-51.6,67.9,-37.5C70.3,-23.4,71.4,-10.1,72.4,4.5C73.4,19.1,74.3,35.1,67.8,44.7C61.3,54.3,47.4,57.5,34.5,60C21.6,62.5,9.8,64.4,-1.3,66.9C-12.4,69.5,-22.7,72.8,-34,72C-45.3,71.3,-57.6,66.5,-69.6,58.9C-81.5,51.3,-93.2,40.8,-96.8,27.7C-100.4,14.6,-96,:-1.2,-88.6,-14.2C-81.3,-27.2,-71,-37.5,-59.6,-47.3C-48.1,-57.2,-35.5,-66.6,-21.3,-73C-7.1,-79.5,8.6,-83,24.4,-80.2C40.1,-77.5,55.9,-68.5,65.7,-55.9C75.5,-43.3,79.3,-27,77.9,-12C76.4,3,69.7,16.6,66.4,31.4C63.1,46.1,63.1,62,55.7,70.3C48.3,78.7,33.4,79.5,20.4,83.8C7.4,88,-3.6,95.7,-16.4,98.1C-29.3,100.5,-44,97.6,-58,91.2C-72,84.8,-85.3,74.8,-95.8,61.6C-106.2,48.3,-113.9,31.7,-114.2,14.7C-114.6,-2.3,-107.7,-19.7,-98.9,-35.6C-90.1,-51.5,-79.5,-65.8,-65.5,-76.7C-51.5,-87.6,-34.1,-95,-16.6,-93.3C0.9,-91.5,18.7,-80.5,31.7,-68.8C44.7,-57.1,53,-44.7,56.5,-32C59.9,-19.2,58.5,-6.1,60.3,9.4C62.1,24.9,67.1,42.8,63.5,56.8C59.9,70.9,47.8,81.2,34.1,84.2C20.4,87.3,5.1,83.3,-7.5,77.3C-20.1,71.3,-30,63.4,-40.8,56.2C-51.5,49.1,-63.1,42.8,-70.8,32.9C-78.6,23,-82.5,9.5,-80.7,-3.1C-78.9,-15.7,-71.3,-27.5,-62.5,-38.3C-53.6,-49.2,-43.5,-59.2,-30.7,-66.5C-18,-73.8,-2.6,-78.4,12,-80.3C26.5,-82.2,40.3,-81.3,51.8,-74.8C63.4,-68.2,72.8,-56,77.4,-42.8C82,-29.6,81.7,-15.3,79.6,-2.1C77.4,11.1,73.5,23.1,67.6,34.3C61.7,45.5,53.7,55.9,43.5,63.3C33.3,70.8,20.9,75.2,8.3,79.8C-4.3,84.4,-17,89.1,-29.8,88.6C-42.6,88.1,-55.5,82.4,-66.7,73.4C-78,64.4,-87.5,52.1,-91.6,37.9C-95.6,23.6,-94.2,7.3,-90.7,-8.1C-87.3,-23.6,-81.8,-38.2,-71.9,-50.4C-62,-62.6,-47.8,-72.5,-32.7,-76.6C-17.6,-80.7,-1.7,-79.1,13.6,-76.4C28.9,-73.7,43.6,-70,54.8,-60.8C66,-51.5,73.7,-36.8,76.5,-21.5C79.2,-6.2,76.9,9.5,73.1,24.3C69.2,39.1,63.8,53,54.3,63.8C44.8,74.5,31.2,82,16.7,84.9C2.3,87.8,-13.1,86,-28.2,82.6C-43.3,79.2,-58.2,74.1,-69.4,64.4C-80.7,54.7,-88.4,40.4,-92.4,25C-96.5,9.6,-96.9,-6.9,-91.6,-21.4C-86.3,-35.9,-75.3,-48.5,-62.3,-59.7C-49.3,-71,-34.4,-81.1,-18.5,-85.1C-2.7,-89.2,14,-87.3,28.9,-81.6C43.8,-75.9,56.9,-66.5,67.5,-54.2C78.1,-41.9,86.3,-26.8,86.4,-11.8C86.5,3.2,78.6,18.1,71.5,31.3C64.4,44.5,58.1,56.1,49.1,65.8C40.1,75.6,28.3,83.6,14.6,87.1C0.9,90.6,-14.6,89.7,-29.7,86.2C-44.8,82.7,-59.5,76.7,-70.5,66.1C-81.5,55.6,-88.8,40.6,-92.7,24.5C-96.5,8.5,-96.8,-8.6,-91.3,-23.2C-85.9,-37.8,-74.7,-49.9,-61.3,-59.7C-47.9,-69.4,-32.4,-76.8,-16.3,-80.7C-0.3,-84.7,16.3,-85.3,30.8,-80.3C45.3,-75.4,57.8,-65,67.6,-52.6C77.5,-40.1,84.8,-25.5,86.9,-10.5C89.1,4.5,86.1,19.9,81,34.4C75.8,48.9,68.6,62.4,58.2,72.4C47.8,82.4,34.3,88.9,20.1,91.7C6,94.5,-8.8,93.7,-22.6,90.2C-36.4,86.7,-49.3,80.4,-60.9,71.2C-72.6,62,-83,49.8,-88.2,35.5C-93.5,21.2,-93.5,4.8,-88.9,-9.2C-84.3,-23.2,-75.1,-34.8,-64.9,-46.1C-54.7,-57.5,-43.5,-68.7,-29.3,-75.3C-15,-81.9,2.2,-84,18.1,-82.2C34,-80.5,48.6,-74.9,61.9,-65.4C75.2,-55.9,87.2,-42.6,91.9,-27.4C96.7,-12.2,94.2,4.9,90,20.8C85.7,36.8,79.6,51.7,69.5,63.5C59.3,75.3,45.1,84.1,30.2,88.3C15.3,92.6,-0.3,92.3,-15.5,90.5C-30.7,88.7,-45.5,85.4,-58.2,77.9C-70.9,70.4,-81.5,58.6,-87.9,44.6C-94.2,30.6,-96.3,14.2,-93.9,-0.7C-91.5,-15.7,-84.7,-29.2,-76.3,-42.3C-67.9,-55.4,-58,-68,-44.6,-76.3C-31.3,-84.6,-14.3,-88.5,1.5,-89.6C17.3,-90.7,31.9,-89,45.1,-82.6C58.3,-76.3,70.1,-65.4,79.4,-52.1C88.6,-38.8,95.3,-23,96.9,-6.7C98.4,9.6,94.8,26.3,89.5,42.9C84.2,59.5,77.2,75.9,65.2,84.6C53.2,93.2,36.2,94,20.7,95.4C5.2,96.7,-8.8,98.5,-23.3,96.4C-37.8,94.2,-52.7,88,-66.1,79C-79.5,70,-91.4,58.2,-99.4,43.8C-107.5,29.5,-111.8,12.6,-111.5,-3.6C-111.3,-19.9,-106.6,-35.4,-98.3,-49.9C-89.9,-64.4,-77.9,-77.8,-63,-86.9C-48.1,-96,-30.4,-100.7,-13.3,-99.9C3.9,-99,20.5,-92.6,35.7,-85.2C50.9,-77.8,64.7,-69.4,76.4,-57.5C88.1,-45.6,97.8,-30.2,100.8,-13.7C103.9,2.8,100.3,20.4,94.6,36.6C88.8,52.8,80.8,67.7,69.5,77.7C58.1,87.6,43.4,92.7,28.6,96.4C13.8,100,-1.1,102.3,-16.2,101.9C-31.3,101.5,-46.5,98.4,-61.1,91.9C-75.6,85.4,-89.5,75.6,-96.2,61.9C-102.9,48.1,-102.5,30.4,-101.6,13.3C-100.7,-3.8,-99.3,-20.4,-92.9,-35.1C-86.5,-49.9,-75.2,-62.8,-62,-73.5C-48.7,-84.3,-33.5,-92.8,-16.8,-96.8C-0.1,-100.8,18,-100.4,34.1,-95.8C50.2,-91.1,64.3,-82.3,75.1,-70.1C85.8,-57.9,93.3,-42.4,97.5,-26.1C101.6,-9.8,102.4,7.2,100.3,24.3C98.2,41.4,93.2,58.5,83.3,70.5C73.4,82.5,58.6,89.3,43.4,94.4C28.2,99.5,12.6,103,3,112C-12.5,125.9,-22,145.5,-35,151.7"
            strokeWidth="1"
            strokeDasharray="5,5"
            strokeLinecap="round"
            transform="translate(100 100)"
          />
        </svg>
        <svg
          className="absolute bottom-0 left-0 h-64 w-64 text-secondary/5 transform -translate-x-1/3 translate-y-1/4"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M41.2,-51.4C55.1,-43.9,69.1,-33.5,76.3,-18.1C83.4,-2.7,83.8,17.7,75.5,33.1C67.3,48.5,50.6,58.9,33.4,67C16.2,75,-1.5,80.7,-18.8,77.9C-36.1,75.1,-53,63.8,-64.1,48.4C-75.2,33,-80.4,13.5,-77.8,-3.9C-75.2,-21.3,-64.8,-36.6,-51.7,-44.7C-38.6,-52.8,-22.8,-53.8,-7.2,-55.3C8.5,-56.8,27.2,-58.8,41.2,-51.4Z"
            strokeWidth="1"
            strokeDasharray="5,5"
            strokeLinecap="round"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 text-lg">
            We provide comprehensive solutions to help your brand stand out in
            the digital landscape.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              isActive={activeIndex === index}
              onHover={() => setActiveIndex(index)}
              onLeave={() => setActiveIndex(null)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
