// src/components/Navbar/Logo.jsx
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="overflow-hidden">
        <div className="flex logo-animation">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent dark:from-primary-400 dark:via-secondary-400 dark:to-accent-400">
            Veloria Labs
          </h1>
        </div>
      </div>
    </Link>
  );
};

export default Logo; // src/components/Navbar/Logo.jsx
