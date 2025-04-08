// src/components/Contact/Contact.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from "lucide-react";
import ContactForm from "./ContactForm";

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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

  const handleFormSubmit = (data) => {
    // Would normally send the data to your backend here
    console.log("Form submitted with data:", data);
    setFormSubmitted(true);

    // Reset form after 5 seconds for demo purposes
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      details: "support@veloria.in",
      description: "We'll respond within 24 hours",
      color: "primary",
    },
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      details: "+91 9315 360 595",
      description: "Mon-Fri from 9am to 5pm",
      color: "secondary",
    },
    {
      icon: <MapPin size={24} />,
      title: "Visit Us",
      details: "1603, Palava City",
      description: "Book an appointment first",
      color: "accent",
    },
    {
      icon: <Clock size={24} />,
      title: "Working Hours",
      details: "Monday to Saturday",
      description: "10:00 AM - 7:00 PM",
      color: "light",
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-16 md:py-24 bg-gray-50 dark:bg-dark-300 relative"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 right-0 w-64 h-64 bg-gradient-radial from-primary-200/20 to-transparent rounded-full opacity-60 dark:from-primary-900/20"></div>
        <div className="absolute -bottom-16 left-0 w-80 h-80 bg-gradient-radial from-accent-200/10 to-transparent rounded-full opacity-60 dark:from-accent-900/10"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 z-10 relative">
        {/* Section header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Get In Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Have a project in mind? We'd love to hear from you. Reach out to us
            and we'll get back to you as soon as possible.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={itemVariants}
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-dark-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`w-12 h-12 rounded-full bg-${info.color}/20 flex items-center justify-center text-${info.color}-600 dark:text-${info.color}-400 mb-4`}
              >
                {info.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                {info.title}
              </h3>
              <p
                className={`text-${info.color}-600 dark:text-${info.color}-400 font-medium mb-1`}
              >
                {info.details}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {info.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form and Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Contact Form */}
          <motion.div
            className="bg-white dark:bg-dark-100 rounded-xl p-6 md:p-8 shadow-lg"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Send us a message
            </h3>

            {formSubmitted ? (
              <motion.div
                className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-6 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-800/30 flex items-center justify-center text-green-500 dark:text-green-400">
                  <CheckCircle size={32} />
                </div>
                <h4 className="text-xl font-bold text-green-800 dark:text-green-400 mb-2">
                  Message Sent!
                </h4>
                <p className="text-green-700 dark:text-green-300">
                  Thank you for reaching out. We'll get back to you as soon as
                  possible.
                </p>
              </motion.div>
            ) : (
              <ContactForm onSubmit={handleFormSubmit} />
            )}
          </motion.div>

          {/* Map / Location Info */}
          <motion.div
            className="bg-white dark:bg-dark-100 rounded-xl overflow-hidden shadow-lg h-full"
            variants={itemVariants}
          >
            {/* Replace with actual map if available */}
            <div className="bg-gray-200 dark:bg-gray-700 h-64 w-full relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full">
                  <iframe
                    className="gmap_iframe w-full h-full"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src="https://maps.google.com/maps?q=1603+Palava+City+Downtown+Palava+phase+2,+Mumbai&ie=UTF8&t=&z=16&iwloc=&output=embed"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps showing Veloria Studio location at Palava City, Mumbai"
                    aria-label="Veloria office location map at Palava City"
                  ></iframe>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Veloria Studio
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our creative space is located in the heart of the design
                district, where inspiration meets innovation.
              </p>

              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin
                    size={18}
                    className="text-primary-600 dark:text-primary-400 mt-1 mr-3"
                  />
                  <div>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                      1603, Palava City
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Downtown Palava phase 2, Mumbai
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock
                    size={18}
                    className="text-primary-600 dark:text-primary-400 mr-3"
                  />
                  <p className="text-gray-600 dark:text-gray-300">
                    Open Monday to Saturday, 10:00 AM - 7:00 PM
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <motion.button
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-400 dark:to-secondary-400 text-white font-medium flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Get directions to our office"
                >
                  <MapPin size={18} className="mr-2" aria-hidden="true" />
                  Get Directions
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
