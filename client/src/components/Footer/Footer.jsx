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
    <>
      <footer className="bg-gray-900 text-white pt-16 pb-6 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-primary/10 to-transparent rounded-full opacity-10 -translate-y-1/4 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-radial from-secondary/10 to-transparent rounded-full opacity-10 translate-y-1/4 -translate-x-1/4"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Logo and brief info */}
            <div>
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Veloria
              </h2>
              <p className="text-gray-400 mb-6">
                Crafting beautiful digital experiences that resonate with your
                audience and bring your vision to life.
              </p>
              <div className="flex space-x-3">
                <motion.a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-all duration-300"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Facebook size={18} />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-all duration-300"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Twitter size={18} />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-all duration-300"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram size={18} />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-all duration-300"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin size={18} />
                </motion.a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="text-lg font-bold mb-4 relative inline-block">
                Quick Links
                <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-primary"></div>
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
                      className="text-gray-400 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-bold mb-4 relative inline-block">
                Services
                <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-secondary"></div>
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
                      className="text-gray-400 hover:text-secondary transition-colors duration-300"
                    >
                      {service}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Contact Info & Newsletter */}
            <div>
              <h3 className="text-lg font-bold mb-4 relative inline-block">
                Contact Us
                <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-accent"></div>
              </h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Mail
                    size={18}
                    className="text-accent mt-1 mr-3 flex-shrink-0"
                  />
                  <span className="text-gray-400">suppor@veloria.in</span>
                </li>
                <li className="flex items-start">
                  <Phone
                    size={18}
                    className="text-accent mt-1 mr-3 flex-shrink-0"
                  />
                  <span className="text-gray-400">+91 9315 360 595</span>
                </li>
                <li className="flex items-start">
                  <MapPin
                    size={18}
                    className="text-accent mt-1 mr-3 flex-shrink-0"
                  />
                  <span className="text-gray-400">1603, Palava City</span>
                </li>
              </ul>

              {/* Newsletter */}
              <h4 className="text-base font-bold mb-2">Join Our Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-white/10 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:bg-white/20 transition-all duration-300 w-full"
                />
                <motion.button
                  className="bg-gradient-to-r from-primary to-secondary rounded-r-lg px-3 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-6"></div>

          {/* Copyright and policy links */}
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>© {currentYear} Veloria Design. All rights reserved.</p>

            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="hover:text-primary transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-primary transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-primary transition-colors duration-300"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
