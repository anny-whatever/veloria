"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { cn } from "../../lib/utils";
import {
  IconCode,
  IconRocket,
  IconShield,
  IconDatabase,
  IconCloud,
  IconBrandGithub,
  IconExternalLink,
  IconBrain,
  IconServer,
  IconCurrencyBitcoin,
  IconHeartHandshake,
  IconApi,
} from "@tabler/icons-react";

const categoryIcons = {
  mvp: <IconRocket className="w-5 h-5" />,
  ai: <IconBrain className="w-5 h-5" />,
  ecommerce: <IconHeartHandshake className="w-5 h-5" />,
  healthcare: <IconShield className="w-5 h-5" />,
  blockchain: <IconCurrencyBitcoin className="w-5 h-5" />,
  infrastructure: <IconServer className="w-5 h-5" />,
  api: <IconApi className="w-5 h-5" />,
  database: <IconDatabase className="w-5 h-5" />,
  cloud: <IconCloud className="w-5 h-5" />,
  default: <IconCode className="w-5 h-5" />,
};

export default function ExpandablePortfolio({ projects }) {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      {/* Modal Overlay */}
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm h-full w-full z-[90]"
          />
        )}
      </AnimatePresence>

      {/* Modal Content */}
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-6 right-6 lg:hidden items-center justify-center bg-white dark:bg-neutral-900 rounded-full h-8 w-8 z-[110] shadow-lg"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-6xl h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 md:rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <motion.div
                layoutId={`header-${active.title}-${id}`}
                className="p-6 border-b border-neutral-200 dark:border-neutral-800 md:p-8"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="flex gap-3 items-center mb-2">
                      <div className="p-2 text-purple-600 bg-purple-100 rounded-lg dark:bg-purple-900/20 dark:text-purple-400">
                        {categoryIcons[active.category] ||
                          categoryIcons.default}
                      </div>
                      <span className="text-sm font-medium tracking-wide text-purple-600 uppercase dark:text-purple-400">
                        {active.category}
                      </span>
                    </div>
                    <motion.h2
                      layoutId={`title-${active.title}-${id}`}
                      className="mb-2 text-2xl font-bold md:text-3xl text-white-900 dark:text-white-100"
                    >
                      {active.title}
                    </motion.h2>
                    <motion.p
                      layoutId={`subtitle-${active.subtitle}-${id}`}
                      className="mb-4 text-lg text-white dark:text-white-400"
                    >
                      {active.subtitle}
                    </motion.p>
                    <p className="leading-relaxed text-white-700 dark:text-white-300">
                      {active.description}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {active.liveUrl && (
                      <motion.a
                        layoutId={`button-live-${active.title}-${id}`}
                        href={active.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex gap-2 items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg transition-colors hover:bg-purple-700"
                      >
                        <IconExternalLink className="w-4 h-4" />
                        Live Demo
                      </motion.a>
                    )}
                    {active.githubUrl && (
                      <motion.a
                        href={active.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex gap-2 items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white-700 dark:text-white-300"
                      >
                        <IconBrandGithub className="w-4 h-4" />
                        GitHub
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Modal Body */}
              <div className="overflow-auto flex-1">
                <div className="p-6 space-y-8 md:p-8">
                  {/* Challenge & Solution */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="mb-3 text-lg font-semibold text-white-900 dark:text-white-100">
                        Challenge
                      </h3>
                      <p className="leading-relaxed text-white-600 dark:text-white-400">
                        {active.challenge}
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-3 text-lg font-semibold text-white-900 dark:text-white-100">
                        Solution
                      </h3>
                      <p className="leading-relaxed text-white-600 dark:text-white-400">
                        {active.solution}
                      </p>
                    </div>
                  </div>

                  {/* Technical Content */}
                  {active.content && (
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-800/50"
                    >
                      {typeof active.content === "function"
                        ? active.content()
                        : active.content}
                    </motion.div>
                  )}

                  {/* Tech Stack */}
                  {active.techStack && (
                    <div>
                      <h3 className="mb-4 text-lg font-semibold text-white-900 dark:text-white-100">
                        Tech Stack
                      </h3>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {Object.entries(active.techStack).map(
                          ([category, technologies]) => (
                            <div
                              key={category}
                              className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/50"
                            >
                              <h4 className="mb-2 font-medium text-white-900 dark:text-white-100">
                                {category}
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {technologies.map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-2 py-1 text-xs font-medium bg-white rounded border dark:bg-neutral-700 text-white-700 dark:text-white-300 border-neutral-200 dark:border-neutral-600"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Key Metrics */}
                  {active.metrics && (
                    <div>
                      <h3 className="mb-4 text-lg font-semibold text-white-900 dark:text-white-100">
                        Key Metrics
                      </h3>
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {Object.entries(active.metrics).map(
                          ([metric, value]) => (
                            <div
                              key={metric}
                              className="p-4 text-center rounded-lg bg-neutral-50 dark:bg-neutral-800/50"
                            >
                              <div className="mb-1 text-2xl font-bold text-purple-600 dark:text-purple-400">
                                {value}
                              </div>
                              <div className="text-sm text-white-600 dark:text-white-400">
                                {metric}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  {active.features && (
                    <div>
                      <h3 className="mb-4 text-lg font-semibold text-white-900 dark:text-white-100">
                        Key Features
                      </h3>
                      <div className="grid gap-3 md:grid-cols-2">
                        {active.features.map((feature, index) => (
                          <div key={index} className="flex gap-3 items-start">
                            <div className="flex-shrink-0 mt-2 w-2 h-2 bg-purple-500 rounded-full" />
                            <span className="text-white-600 dark:text-white-400">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Results & Testimonial */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="mb-3 text-lg font-semibold text-white-900 dark:text-white-100">
                        Results
                      </h3>
                      <p className="leading-relaxed text-white-600 dark:text-white-400">
                        {active.results}
                      </p>
                    </div>
                    {active.testimonial && (
                      <div className="p-6 bg-purple-50 rounded-xl dark:bg-purple-900/10">
                        <blockquote className="mb-4 italic text-white-700 dark:text-white-300">
                          "{active.testimonial.text}"
                        </blockquote>
                        <div className="text-sm">
                          <div className="font-medium text-white-900 dark:text-white-100">
                            {active.testimonial.author}
                          </div>
                          <div className="text-white-600 dark:text-white-400">
                            {active.testimonial.position}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="flex flex-wrap gap-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                    <div>
                      <span className="text-sm font-medium text-white-500 dark:text-white-400">
                        Client:
                      </span>
                      <span className="ml-2 text-white-700 dark:text-white-300">
                        {active.clientName}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-white-500 dark:text-white-400">
                        Duration:
                      </span>
                      <span className="ml-2 text-white-700 dark:text-white-300">
                        {active.duration}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-white-500 dark:text-white-400">
                        Completed:
                      </span>
                      <span className="ml-2 text-white-700 dark:text-white-300">
                        {active.completedDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <PortfolioCard
            key={`portfolio-${project.id}-${id}`}
            project={project}
            id={id}
            index={index}
            onClick={() => setActive(project)}
          />
        ))}
      </div>
    </>
  );
}

const PortfolioCard = ({ project, id, index, onClick }) => {
  return (
    <motion.div
      layoutId={`card-${project.title}-${id}`}
      onClick={onClick}
      className={cn(
        "overflow-hidden relative bg-white rounded-xl border transition-all duration-300 cursor-pointer group border-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 hover:border-white dark:hover:border-white/80",
        "hover:shadow-lg hover:shadow-white/20 dark:hover:shadow-white/10"
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Card Header */}
      <motion.div layoutId={`header-${project.title}-${id}`} className="p-6">
        <div className="flex gap-3 items-center mb-3">
          <div className="p-2 text-purple-600 bg-purple-100 rounded-lg transition-colors dark:bg-purple-900/20 dark:text-purple-400 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/40">
            {categoryIcons[project.category] || categoryIcons.default}
          </div>
          <span className="text-sm font-medium tracking-wide text-purple-600 uppercase dark:text-purple-400">
            {project.category}
          </span>
        </div>

        <motion.h3
          layoutId={`title-${project.title}-${id}`}
          className="mb-2 text-xl font-bold transition-colors text-white-900 dark:text-white-100 group-hover:text-purple-600 dark:group-hover:text-purple-400"
        >
          {project.title}
        </motion.h3>

        <motion.p
          layoutId={`subtitle-${project.subtitle}-${id}`}
          className="mb-4 text-white-600 dark:text-white-400"
        >
          {project.subtitle}
        </motion.p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium rounded border bg-neutral-100 dark:bg-neutral-800 text-white-600 dark:text-white-400 border-neutral-200 dark:border-neutral-700"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 text-xs font-medium rounded border bg-neutral-100 dark:bg-neutral-800 text-white-600 dark:text-white-400 border-neutral-200 dark:border-neutral-700">
              +{project.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Key Metrics Preview */}
        {project.metrics && (
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(project.metrics)
              .slice(0, 2)
              .map(([metric, value]) => (
                <div
                  key={metric}
                  className="p-3 text-center rounded-lg bg-neutral-50 dark:bg-neutral-800/50"
                >
                  <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    {value}
                  </div>
                  <div className="text-xs text-white-600 dark:text-white-400">
                    {metric}
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Action Button */}
        <div className="absolute right-4 bottom-4">
          <motion.button
            layoutId={`button-${project.title}-${id}`}
            className="px-4 py-2 text-sm font-medium rounded-lg transition-colors bg-neutral-100 dark:bg-neutral-800 text-white-700 dark:text-white-300 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/20 group-hover:text-purple-700 dark:group-hover:text-purple-400"
          >
            View Details
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 text-white-700 dark:text-white-300"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
