import React from "react";
import { FloatingDock } from "./floating-dock";
import {
  IconMessageCircle,
  IconRoute,
  IconCalendar,
  IconQuestionMark,
} from "@tabler/icons-react";

export default function FloatingDockDemo({ activeSection, setActiveSection }) {
  const links = [
    {
      title: "Contact Us",
      icon: (
        <IconMessageCircle
          className={`h-full w-full transition-colors ${
            activeSection === "contact"
              ? "text-primary-400"
              : "text-gray-300 hover:text-primary-400"
          }`}
        />
      ),
      href: "#contact",
      onClick: () => setActiveSection("contact"),
    },
    {
      title: "Our Process",
      icon: (
        <IconRoute
          className={`h-full w-full transition-colors ${
            activeSection === "process"
              ? "text-primary-400"
              : "text-gray-300 hover:text-primary-400"
          }`}
        />
      ),
      href: "#process",
      onClick: () => setActiveSection("process"),
    },
    {
      title: "Book a Call",
      icon: (
        <IconCalendar
          className={`h-full w-full transition-colors ${
            activeSection === "booking"
              ? "text-primary-400"
              : "text-gray-300 hover:text-primary-400"
          }`}
        />
      ),
      href: "#booking",
      onClick: () => setActiveSection("booking"),
    },
    {
      title: "FAQ",
      icon: (
        <IconQuestionMark
          className={`h-full w-full transition-colors ${
            activeSection === "faq"
              ? "text-primary-400"
              : "text-gray-300 hover:text-primary-400"
          }`}
        />
      ),
      href: "#faq",
      onClick: () => setActiveSection("faq"),
    },
  ];

  return (
    <div className="flex justify-center w-full">
      <FloatingDock items={links} />
    </div>
  );
}
