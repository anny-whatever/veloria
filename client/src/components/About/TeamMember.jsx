// src/components/About/TeamMember.jsx
import { motion } from "framer-motion";
import { Twitter, Linkedin, Instagram, Github, Dribbble } from "lucide-react";

const TeamMember = ({ member, index }) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9],
        delay: 0.1 * index,
      },
    },
  };

  const getSocialIcon = (platform) => {
    switch (platform) {
      case "twitter":
        return <Twitter size={16} />;
      case "linkedin":
        return <Linkedin size={16} />;
      case "instagram":
        return <Instagram size={16} />;
      case "github":
        return <Github size={16} />;
      case "dribbble":
        return <Dribbble size={16} />;
      default:
        return null;
    }
  };

  // Create a function to assign a color based on index
  const getColorByIndex = (index) => {
    const colors = ["primary", "secondary", "accent", "light"];
    return colors[index % colors.length];
  };

  const memberColor = getColorByIndex(index);

  return (
    <motion.div
      className="bg-white dark:bg-dark-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
      variants={itemVariants}
      whileHover={{ y: -5 }}
    >
      {/* Image container */}
      <div className="relative h-56 overflow-hidden">
        {/* Placeholder for team member image */}
        <div
          className={`w-full h-full bg-${memberColor}/20 dark:bg-${memberColor}/10 flex items-center justify-center`}
        >
          <div
            className={`w-24 h-24 rounded-full bg-${memberColor}/40 dark:bg-${memberColor}/30 flex items-center justify-center text-${memberColor}-600 dark:text-${memberColor}-400`}
          >
            <span className="text-xl font-bold">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
        </div>
        {/* If using actual images, uncomment this */}
        {/* <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
        /> */}

        {/* Colored overlay */}
        <div
          className={`absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-${memberColor}/40 dark:from-${memberColor}/30 to-transparent`}
        ></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h4 className="text-lg font-bold mb-1 text-gray-900 dark:text-gray-100">
          {member.name}
        </h4>
        <p
          className={`text-${memberColor}-600 dark:text-${memberColor}-400 text-sm font-medium mb-3`}
        >
          {member.role}
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {member.bio}
        </p>

        {/* Social links */}
        <div className="flex space-x-2">
          {Object.entries(member.social).map(([platform, url]) => (
            <motion.a
              key={platform}
              href={url}
              className={`p-2 rounded-full bg-${memberColor}/10 dark:bg-${memberColor}/20 text-${memberColor}-600 dark:text-${memberColor}-400 hover:bg-${memberColor}-500 hover:text-white transition-all duration-300`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Connect with ${member.name} on ${platform}`}
              title={`${member.name}'s ${platform} profile`}
            >
              {getSocialIcon(platform)}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMember;
