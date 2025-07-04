import { motion } from "framer-motion";
import WorldMap from "./ui/world-map";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "./ui/glowing-stars";

export default function GlobalReach() {
  return (
    <section
      id="connectivity"
      className="px-4 py-20"
      style={{ backgroundColor: "#EDEDED" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-4xl font-bold md:text-5xl"
          >
            <span className="text-gray-800">Global</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {"Connectivity".split("").map((letter, idx) => (
                <motion.span
                  key={idx}
                  className="inline-block"
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.04 }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 md:text-xl"
          >
            We serve clients <strong>anywhere in the world</strong> and excel at
            working with remote and overseas teams. Break free from geographical
            boundaries and collaborate seamlessly across time zones.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <WorldMap
            dots={[
              {
                start: { lat: 6.076, lng: 72.8777 }, // Mumbai
                end: { lat: 40.7128, lng: -74.006 }, // New York
              },
              {
                start: { lat: 6.076, lng: 72.8777 }, // Mumbai
                end: { lat: 35.6895, lng: 139.6917 }, // Tokyo
              },
              {
                start: { lat: 6.076, lng: 72.8777 }, // Mumbai
                end: { lat: -43.8688, lng: 141.2093 }, // Sydney
              },
              {
                start: { lat: 6.076, lng: 72.8777 }, // Mumbai
                end: { lat: 55.7558, lng: 37.6176 }, // Moscow
              },
              {
                start: { lat: 6.076, lng: 72.8777 }, // Mumbai
                end: { lat: -34.6037, lng: -58.3816 }, // Buenos Aires
              },
              {
                start: { lat: 6.076, lng: 72.8777 }, // Mumbai
                end: { lat: 48.8566, lng: 2.3522 }, // Paris
              },
              {
                start: { lat: 6.076, lng: 72.8777 }, // Mumbai
                end: { lat: 1.3521, lng: 103.8198 }, // Singapore
              },
              {
                start: { lat: 6.076, lng: 72.8777 }, // Mumbai
                end: { lat: 25.276987, lng: 55.296249 }, // Dubai
              },
            ]}
            lineColor="#8b5cf6"
          />
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center"
          >
            <GlowingStarsBackgroundCard className="bg-[#EDEDED]">
              <GlowingStarsTitle>24/7 Availability</GlowingStarsTitle>
              <div className="flex justify-between items-end">
                <GlowingStarsDescription>
                  Round-the-clock support across multiple time zones to ensure
                  your project never sleeps.
                </GlowingStarsDescription>
              </div>
            </GlowingStarsBackgroundCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center"
          >
            <GlowingStarsBackgroundCard className="bg-[#EDEDED]">
              <GlowingStarsTitle>Remote Collaboration</GlowingStarsTitle>
              <div className="flex justify-between items-end">
                <GlowingStarsDescription>
                  Seamless integration with your existing remote teams using
                  cutting-edge collaboration tools.
                </GlowingStarsDescription>
              </div>
            </GlowingStarsBackgroundCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center"
          >
            <GlowingStarsBackgroundCard className="bg-[#EDEDED]">
              <GlowingStarsTitle>Cultural Adaptability</GlowingStarsTitle>
              <div className="flex justify-between items-end">
                <GlowingStarsDescription>
                  Understanding diverse markets and cultural nuances to deliver
                  solutions that resonate globally.
                </GlowingStarsDescription>
              </div>
            </GlowingStarsBackgroundCard>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <p className="text-lg font-medium text-gray-700">
            Ready to work with a truly global team?{" "}
            <span className="font-semibold text-blue-600">
              Let's connect across continents.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Icon Components
const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-4 h-4 text-white stroke-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const TeamIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-4 h-4 text-white stroke-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
    />
  </svg>
);

const GlobalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-4 h-4 text-white stroke-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
    />
  </svg>
);
