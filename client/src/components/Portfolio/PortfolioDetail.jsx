// src/components/Portfolio/PortfolioDetail.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Clock,
  Globe,
  Tag,
  ChevronRight,
  Award,
  CheckCircle,
  ExternalLink,
  ZoomIn,
  ChevronLeft,
  ChevronUp,
} from "lucide-react";

// Image Modal Component
const ImageModal = ({ image, alt, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    document.addEventListener("mousedown", handleClickOutside);

    // Prevent scrolling on body when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        ref={modalRef}
        className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-lg bg-white"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute z-20 p-2 text-gray-900 transition-colors rounded-full shadow-md top-2 right-2 bg-white/80 hover:bg-white"
            aria-label="Close image"
          >
            <X size={20} />
          </button>

          <div className="flex items-center justify-center bg-gray-100">
            <img
              src={image}
              alt={alt}
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>

          <div className="p-4 bg-white">
            <p className="text-sm text-gray-600">{alt}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PortfolioDetail = ({ project, onClose }) => {
  const modalRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Detect click outside the modal content
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        if (selectedImage) {
          setSelectedImage(null);
        } else {
          onClose();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose, selectedImage]);

  // Function to open image modal
  const openImageModal = (image, alt) => {
    setSelectedImage({ src: image, alt });
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/50 md:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          ref={modalRef}
          className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute z-10 p-2 transition-colors rounded-full shadow-md top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-gray-100"
            aria-label="Close case study"
          >
            <X size={20} />
          </button>

          <div className="relative">
            {/* Hero image */}
            <div
              className="h-[30vh] md:h-[40vh] relative bg-gray-100 overflow-hidden cursor-pointer"
              onClick={() =>
                project.images &&
                project.images[0] &&
                openImageModal(
                  project.images[0],
                  `${project.title} - Main Image`
                )
              }
            >
              {project.images && project.images[0] && (
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 to-transparent">
                  {/* Zoom icon overlay */}
                  <div className="absolute p-2 transition-opacity rounded-full top-4 right-4 bg-white/30 backdrop-blur-sm opacity-70 hover:opacity-100">
                    <ZoomIn size={20} className="text-white" />
                  </div>
                </div>
              )}
              {project.images && project.images[0] ? (
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-primary/10">
                  <p className="text-primary">Project image</p>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                <div className="inline-block px-3 py-1 mb-3 text-xs font-medium rounded-full bg-white/90 backdrop-blur-sm text-primary">
                  {project.category.charAt(0).toUpperCase() +
                    project.category.slice(1)}
                </div>
                <h1 className="mb-1 text-3xl font-bold text-white md:text-4xl">
                  {project.title}
                </h1>
                <p className="text-lg text-white/90">{project.subtitle}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {/* Main content */}
                <div className="md:col-span-2">
                  {/* Overview */}
                  <section className="mb-8">
                    <h2 className="mb-4 text-2xl font-bold">
                      Project Overview
                    </h2>
                    <p className="mb-6 text-gray-700">{project.description}</p>

                    <div className="space-y-6">
                      {/* Challenge */}
                      <div>
                        <h3 className="mb-2 text-lg font-semibold text-primary">
                          The Challenge
                        </h3>
                        <p className="text-gray-700">{project.challenge}</p>
                      </div>

                      {/* Solution */}
                      <div>
                        <h3 className="mb-2 text-lg font-semibold text-primary">
                          Our Solution
                        </h3>
                        <p className="text-gray-700">{project.solution}</p>
                      </div>

                      {/* Results */}
                      <div>
                        <h3 className="mb-2 text-lg font-semibold text-primary">
                          The Results
                        </h3>
                        <p className="text-gray-700">{project.results}</p>
                      </div>
                    </div>
                  </section>

                  {/* Key Features */}
                  <section className="mb-8">
                    <h2 className="mb-4 text-2xl font-bold">Key Features</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {project.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <div className="mt-1 mr-3 text-primary">
                            <CheckCircle size={18} />
                          </div>
                          <p className="text-gray-700">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Project Gallery */}
                  {project.images && project.images.length > 1 && (
                    <section className="mb-8">
                      <h2 className="mb-4 text-2xl font-bold">
                        Project Gallery
                      </h2>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {project.images.slice(1).map((image, index) => (
                          <div
                            key={index}
                            className="relative h-48 overflow-hidden bg-gray-100 rounded-lg cursor-pointer group"
                            onClick={() =>
                              openImageModal(
                                image,
                                `${project.title} - Image ${index + 2}`
                              )
                            }
                          >
                            <div className="absolute inset-0 z-10 flex items-center justify-center transition-opacity opacity-0 bg-black/30 group-hover:opacity-100">
                              <ZoomIn size={24} className="text-white" />
                            </div>
                            <img
                              src={image}
                              alt={`${project.title} ${index + 2}`}
                              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Testimonial */}
                  {project.testimonial && (
                    <section className="p-6 mb-8 border border-gray-200 bg-gray-50 rounded-xl">
                      <div className="flex flex-col items-start">
                        <div className="mb-4">
                          <Award size={28} className="text-primary" />
                        </div>
                        <blockquote className="mb-4 italic text-gray-700">
                          "{project.testimonial.text}"
                        </blockquote>
                        <div>
                          <p className="font-medium">
                            {project.testimonial.author}
                          </p>
                          <p className="text-sm text-gray-600">
                            {project.testimonial.position}
                          </p>
                        </div>
                      </div>
                    </section>
                  )}
                </div>

                {/* Sidebar */}
                <div>
                  <div className="sticky p-6 border border-gray-200 bg-gray-50 rounded-xl top-8">
                    <h2 className="mb-4 text-xl font-bold">Project Details</h2>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <Calendar
                          size={18}
                          className="flex-shrink-0 mt-1 mr-3 text-primary"
                        />
                        <div>
                          <p className="text-sm text-gray-500">
                            Completed Date
                          </p>
                          <p className="font-medium">{project.completedDate}</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Clock
                          size={18}
                          className="flex-shrink-0 mt-1 mr-3 text-primary"
                        />
                        <div>
                          <p className="text-sm text-gray-500">Duration</p>
                          <p className="font-medium">{project.duration}</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Globe
                          size={18}
                          className="flex-shrink-0 mt-1 mr-3 text-primary"
                        />
                        <div>
                          <p className="text-sm text-gray-500">Client</p>
                          <p className="font-medium">{project.clientName}</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ExternalLink
                          size={18}
                          className="flex-shrink-0 mt-1 mr-3 text-primary"
                        />
                        <div>
                          <p className="text-sm text-gray-500">Website</p>
                          <p className="font-medium">
                            {project.liveUrl ? (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-primary hover:underline"
                              >
                                {project.liveUrl}
                                <ExternalLink size={12} className="ml-1" />
                              </a>
                            ) : (
                              <span className="text-gray-400">
                                Not provided
                              </span>
                            )}
                          </p>
                        </div>
                      </li>
                    </ul>

                    {/* Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="pt-6 mt-6 border-t border-gray-200">
                        <div className="flex items-center mb-3">
                          <Tag size={18} className="mr-2 text-primary" />
                          <h3 className="font-medium">Technologies & Skills</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-block px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="pt-6 mt-6 border-t border-gray-200">
                      <h3 className="mb-3 font-medium">
                        Interested in similar results?
                      </h3>
                      <button className="flex items-center justify-center w-full px-4 py-3 text-white rounded-lg bg-gradient-to-r from-primary to-secondary">
                        <span>Start Your Project</span>
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <ImageModal
            image={selectedImage.src}
            alt={selectedImage.alt}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default PortfolioDetail;
