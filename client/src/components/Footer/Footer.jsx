// src/components/Footer/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
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
  ArrowUpRight,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Define industry directories for backlinks
  const industryDirectories = [
    {
      name: "Clutch",
      url: "https://clutch.co/profile/veloria",
      rel: "noopener noreferrer",
    },
    {
      name: "GoodFirms",
      url: "https://www.goodfirms.co/company/veloria",
      rel: "noopener noreferrer",
    },
    {
      name: "DesignRush",
      url: "https://www.designrush.com/agency/profile/veloria",
      rel: "noopener noreferrer",
    },
  ];

  // Define industry associations
  const industryAssociations = [
    {
      name: "NASSCOM",
      url: "https://nasscom.in/",
      rel: "noopener noreferrer",
    },
    {
      name: "CII",
      url: "https://www.cii.in/",
      rel: "noopener noreferrer",
    },
  ];

  return (
    <footer className="bg-surface-100 dark:bg-dark-100 border-t border-gray-200 dark:border-gray-800 pt-12 pb-6">
      {/* Decorative Elements - Make sure they're visible in both modes */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 dark:from-primary-400/10 dark:to-secondary-400/10 blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-gradient-to-l from-accent-500/20 to-primary-500/20 dark:from-accent-400/10 dark:to-primary-400/10 blur-3xl -z-10"></div>
      <div className="absolute top-40 right-1/4 w-32 h-32 rounded-full bg-gradient-to-tr from-secondary-500/20 to-accent-500/20 dark:from-secondary-400/10 dark:to-accent-400/10 blur-xl -z-10"></div>

      {/* Additional subtle design elements */}
      <div className="absolute bottom-40 left-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-primary-500/15 to-accent-500/15 dark:from-primary-400/8 dark:to-accent-400/8 blur-xl -z-10"></div>
      <div className="absolute top-60 left-2/3 w-16 h-16 rounded-full bg-gradient-to-tr from-secondary-500/15 to-primary-500/15 dark:from-secondary-400/8 dark:to-primary-400/8 blur-lg -z-10"></div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-600 dark:text-primary-400">
              Veloria
            </h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              A leading web design and development agency delivering exceptional
              digital experiences and custom software solutions.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/veloria"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://facebook.com/veloria"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/veloria"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com/company/veloria"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/get-started"
                  className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail
                  size={18}
                  className="mr-2 text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0"
                />
                <a
                  href="mailto:info@veloria.in"
                  className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
                >
                  info@veloria.in
                </a>
              </li>
              <li className="flex items-start">
                <Phone
                  size={18}
                  className="mr-2 text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0"
                />
                <a
                  href="tel:+919315360595"
                  className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
                >
                  +91 9315360595
                </a>
              </li>
              <li className="flex items-start">
                <MapPin
                  size={18}
                  className="mr-2 text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0"
                />
                <span className="text-gray-700 dark:text-gray-300">India</span>
              </li>
            </ul>
          </div>

          {/* Industry Directories - For Backlinks */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              Industry Recognition
            </h3>
            <div className="mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Find us on:
              </p>
              <ul className="space-y-2">
                {industryDirectories.map((directory, index) => (
                  <li key={index}>
                    <a
                      href={directory.url}
                      target="_blank"
                      rel={directory.rel}
                      className="flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
                    >
                      {directory.name}
                      <ArrowUpRight size={14} className="ml-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Member of:
              </p>
              <ul className="space-y-2">
                {industryAssociations.map((association, index) => (
                  <li key={index}>
                    <a
                      href={association.url}
                      target="_blank"
                      rel={association.rel}
                      className="flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors"
                    >
                      {association.name}
                      <ArrowUpRight size={14} className="ml-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Attribution Links Container - populated by BacklinkHelper */}
        <div className="attribution-links hidden">
          {/* This container will be populated and styled by BacklinkHelper */}
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-400">
          <p>
            &copy; {currentYear} Veloria. All rights reserved.{" "}
            <Link
              to="/privacy-policy"
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link
              to="/terms-of-service"
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
