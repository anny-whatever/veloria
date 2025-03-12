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
      details: "hello@veloria.design",
      description: "We'll respond within 24 hours",
      color: "primary",
    },
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri from 9am to 5pm",
      color: "secondary",
    },
    {
      icon: <MapPin size={24} />,
      title: "Visit Us",
      details: "123 Design Street, Creative City",
      description: "Book an appointment first",
      color: "accent",
    },
    {
      icon: <Clock size={24} />,
      title: "Working Hours",
      details: "Monday to Friday",
      description: "9:00 AM - 5:00 PM",
      color: "light",
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 md:py-28 bg-gray-50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-primary/10 to-transparent rounded-full opacity-60 -translate-y-1/4 -translate-x-1/4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            inView ? { opacity: 0.6, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 1.2, delay: 0.2 }}
        ></motion.div>

        <motion.div
          className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-secondary/10 to-transparent rounded-full opacity-60 translate-y-1/4 translate-x-1/4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            inView ? { opacity: 0.6, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 1.2, delay: 0.4 }}
        ></motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-600 text-lg">
              Have a project in mind? We'd love to hear about it. Drop us a line
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
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`w-12 h-12 rounded-full bg-${info.color}/20 flex items-center justify-center text-${info.color} mb-4`}
                >
                  {info.icon}
                </div>
                <h4 className="text-xl font-bold mb-2">{info.title}</h4>
                <p className={`text-${info.color} font-medium mb-1`}>
                  {info.details}
                </p>
                <p className="text-gray-500 text-sm">{info.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form and Map Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Contact Form */}
            <motion.div
              className="bg-white rounded-xl p-6 md:p-8 shadow-lg"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>

              {formSubmitted ? (
                <motion.div
                  className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-green-800 mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-green-700">
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
              className="bg-white rounded-xl overflow-hidden shadow-lg h-full"
              variants={itemVariants}
            >
              {/* Replace with actual map if available */}
              <div className="bg-gray-200 h-64 w-full relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6">
                    <MapPin size={32} className="mx-auto mb-3 text-primary" />
                    <p className="text-gray-600">Map Placeholder</p>
                    <p className="text-gray-500 text-sm">
                      Interactive map would go here
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">
                  Veloria Design Studio
                </h3>
                <p className="text-gray-600 mb-4">
                  Our creative space is located in the heart of the design
                  district, where inspiration meets innovation.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin size={18} className="text-primary mt-1 mr-3" />
                    <div>
                      <p className="text-gray-800 font-medium">
                        123 Design Street
                      </p>
                      <p className="text-gray-600">
                        Creative City, State 12345
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Clock size={18} className="text-primary mr-3" />
                    <p className="text-gray-600">
                      Open Monday to Friday, 9:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <motion.button
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MapPin size={18} className="mr-2" />
                    Get Directions
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
