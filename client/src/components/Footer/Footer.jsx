// src/components/Footer/Footer.jsx
import { motion } from "framer-motion";
import {
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  Send,
  ArrowUp,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-dark-100 relative overflow-hidden border-t border-gray-200 dark:border-gray-800">
      {/* Decorative Elements - Make sure they're visible in both modes */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 dark:from-primary-400/10 dark:to-secondary-400/10 blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-gradient-to-l from-accent-500/20 to-primary-500/20 dark:from-accent-400/10 dark:to-primary-400/10 blur-3xl -z-10"></div>
      <div className="absolute top-40 right-1/4 w-32 h-32 rounded-full bg-gradient-to-tr from-secondary-500/20 to-accent-500/20 dark:from-secondary-400/10 dark:to-accent-400/10 blur-xl -z-10"></div>

      {/* Additional subtle design elements */}
      <div className="absolute bottom-40 left-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-primary-500/15 to-accent-500/15 dark:from-primary-400/8 dark:to-accent-400/8 blur-xl -z-10"></div>
      <div className="absolute top-60 left-2/3 w-16 h-16 rounded-full bg-gradient-to-tr from-secondary-500/15 to-primary-500/15 dark:from-secondary-400/8 dark:to-primary-400/8 blur-lg -z-10"></div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo and brief info */}
          <div>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent dark:from-primary-400 dark:to-secondary-400">
              Veloria
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Crafting beautiful digital experiences that resonate with your
              audience and bring your vision to life.
            </p>
            <div className="flex space-x-3">
              <motion.a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-white hover:bg-primary-500 hover:text-white dark:hover:bg-primary-600 transition-all duration-300"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-white hover:bg-primary-500 hover:text-white dark:hover:bg-primary-600 transition-all duration-300"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter size={18} />
              </motion.a>
              <motion.a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-white hover:bg-primary-500 hover:text-white dark:hover:bg-primary-600 transition-all duration-300"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-white hover:bg-primary-500 hover:text-white dark:hover:bg-primary-600 transition-all duration-300"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={18} />
              </motion.a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-bold mb-4 relative inline-block text-gray-800 dark:text-white">
              Quick Links
              <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-primary-500 dark:bg-primary-400"></div>
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "#home" },
                { name: "Services", href: "#services" },
                { name: "Portfolio", href: "#portfolio" },
                { name: "About Us", href: "#about" },
                { name: "Contact", href: "#contact" },
              ].map((link, index) => (
                <motion.li
                  key={index}
                  className="transition-all duration-300"
                  whileHover={{ x: 3 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 relative inline-block text-gray-800 dark:text-white">
              Services
              <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-secondary-500 dark:bg-secondary-400"></div>
            </h3>
            <ul className="space-y-3">
              {[
                "Website Design",
                "E-commerce Solutions",
                "Brand Strategy",
                "SEO Optimization",
                "Content Management",
              ].map((service, index) => (
                <motion.li
                  key={index}
                  className="transition-all duration-300"
                  whileHover={{ x: 3 }}
                >
                  <a
                    href="#services"
                    className="text-gray-600 hover:text-secondary-500 dark:text-gray-400 dark:hover:text-secondary-400 transition-colors duration-300"
                  >
                    {service}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 relative inline-block text-gray-800 dark:text-white">
              Contact Us
              <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-accent-500 dark:bg-accent-400"></div>
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <Mail
                  size={18}
                  className="text-accent-500 dark:text-accent-400 mt-1 mr-3 flex-shrink-0"
                />
                <span className="text-gray-600 dark:text-gray-400">
                  support@veloria.in
                </span>
              </li>
              <li className="flex items-start">
                <Phone
                  size={18}
                  className="text-accent-500 dark:text-accent-400 mt-1 mr-3 flex-shrink-0"
                />
                <span className="text-gray-600 dark:text-gray-400">
                  +91 9315 360 595
                </span>
              </li>
              <li className="flex items-start">
                <MapPin
                  size={18}
                  className="text-accent-500 dark:text-accent-400 mt-1 mr-3 flex-shrink-0"
                />
                <span className="text-gray-600 dark:text-gray-400">
                  1603, Palava City
                </span>
              </li>
            </ul>

            {/* Newsletter */}
            <h4 className="text-base font-bold mb-2 text-gray-800 dark:text-white">
              Join Our Newsletter
            </h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-white dark:bg-dark-300 border border-gray-300 dark:border-gray-700 rounded-l-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 w-full"
              />
              <motion.button
                className="bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 rounded-r-lg px-3 flex items-center justify-center text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={18} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-gray-800 mb-6"></div>

        {/* Copyright and policy links */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 dark:text-gray-400 text-sm">
          <p>© {currentYear} Veloria Design. All rights reserved.</p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
