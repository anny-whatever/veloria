import { motion } from "framer-motion";
import WorldMap from "./ui/world-map";

export default function GlobalReach() {
  return (
    <section className="py-20 px-4" style={{ backgroundColor: "#F8F8FF" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="text-gray-800">Global</span>{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
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
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
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

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              24/7 Availability
            </h3>
            <p className="text-gray-600">
              Round-the-clock support across multiple time zones to ensure your
              project never sleeps.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Remote Collaboration
            </h3>
            <p className="text-gray-600">
              Seamless integration with your existing remote teams using
              cutting-edge collaboration tools.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Cultural Adaptability
            </h3>
            <p className="text-gray-600">
              Understanding diverse markets and cultural nuances to deliver
              solutions that resonate globally.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-700 font-medium">
            Ready to work with a truly global team?{" "}
            <span className="text-blue-600 font-semibold">
              Let's connect across continents.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
