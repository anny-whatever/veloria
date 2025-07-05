// src/components/Footer/Footer.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Github,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  // Check if we're on the GetStarted page
  const isGetStartedPage = location.pathname === "/get-started";

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "#about" },
    { name: "Contact", path: "#contact" },
    { name: "Get Started", path: "/get-started" },
  ];

  const socialLinks = [
    {
      name: "Twitter",
      icon: <Twitter size={18} />,
      url: "https://x.com/CursorWarrior",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={18} />,
      url: "https://www.linkedin.com/company/107645819/admin/dashboard/",
    },
    {
      name: "GitHub",
      icon: <Github size={18} />,
      url: "https://github.com/anny-whatever",
    },
  ];

  const contactInfo = [
    {
      icon: <Mail size={16} />,
      text: "info@veloria.in",
      href: "mailto:info@veloria.in",
    },
    {
      icon: <Phone size={16} />,
      text: "+91 9315 360 595",
      href: "tel:+919315360595",
    },
    { icon: <MapPin size={16} />, text: "Mumbai, India", href: "#" },
  ];

  return (
    <footer className="relative">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: isGetStartedPage
            ? "black"
            : "linear-gradient(to bottom, #EDEDED 0%, #D0D0D0 30%, #B0B0B0 60%, #6B7280 1600%)",
        }}
      />

      {/* Subtle overlay patterns */}
      <div
        className={`absolute inset-0 ${
          isGetStartedPage ? "opacity-[0.05]" : "opacity-[0.02]"
        }`}
      >
        <div
          className={`absolute top-0 left-0 w-full h-full ${
            isGetStartedPage
              ? "bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]"
              : "bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.1)_0%,transparent_50%)]"
          }`}
        />
        <div
          className={`absolute top-0 right-0 w-full h-full ${
            isGetStartedPage
              ? "bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.1)_0%,transparent_50%)]"
              : "bg-[radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.1)_0%,transparent_50%)]"
          }`}
        />
      </div>

      <div className="relative px-4 py-16">
        <div className="mx-auto max-w-6xl">
          {/* Main Footer Content */}
          <div className="grid gap-12 mb-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3
                  className={`mb-3 text-2xl font-bold ${
                    isGetStartedPage ? "text-white" : "text-gray-800"
                  }`}
                >
                  Veloria Labs
                </h3>
                <p
                  className={`max-w-md leading-relaxed ${
                    isGetStartedPage ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  A product engineering lab that partners with technical
                  founders to build scalable, production-ready platforms.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={`flex justify-center items-center w-10 h-10 transition-colors duration-300 ${
                      isGetStartedPage
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-500 hover:text-gray-800"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4
                className={`mb-6 text-lg font-semibold ${
                  isGetStartedPage ? "text-white" : "text-gray-800"
                }`}
              >
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className={`flex items-center transition-colors duration-300 group ${
                        isGetStartedPage
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {link.name}
                      <ArrowUpRight
                        size={14}
                        className="ml-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4
                className={`mb-6 text-lg font-semibold ${
                  isGetStartedPage ? "text-white" : "text-gray-800"
                }`}
              >
                Contact
              </h4>
              <ul className="space-y-3">
                {contactInfo.map((contact, index) => (
                  <li key={index}>
                    <a
                      href={contact.href}
                      className={`flex items-center transition-colors duration-300 group ${
                        isGetStartedPage
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <span
                        className={`mr-3 transition-colors duration-300 ${
                          isGetStartedPage
                            ? "text-gray-400 group-hover:text-gray-200"
                            : "text-gray-500 group-hover:text-gray-700"
                        }`}
                      >
                        {contact.icon}
                      </span>
                      {contact.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div
            className={`pt-8 border-t ${
              isGetStartedPage ? "border-gray-700/30" : "border-gray-400/30"
            }`}
          >
            <div className="flex flex-col justify-between items-center space-y-4 md:flex-row md:space-y-0">
              <div
                className={`text-sm ${
                  isGetStartedPage ? "text-gray-300" : "text-gray-200"
                }`}
              >
                <p>&copy; {currentYear} Veloria. All rights reserved.</p>
              </div>
              <div className="flex space-x-6 text-sm">
                <Link
                  to="/privacy-policy"
                  className={`transition-colors duration-300 ${
                    isGetStartedPage
                      ? "text-gray-400 hover:text-gray-200"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms-of-service"
                  className={`transition-colors duration-300 ${
                    isGetStartedPage
                      ? "text-gray-400 hover:text-gray-200"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
