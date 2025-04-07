# Dark Mode Implementation for Admin Panel

This document outlines the implementation of dark mode in the Veloria admin panel.

## Overview

Dark mode has been implemented across the admin panel using Tailwind CSS's dark mode feature. The dark mode is controlled by the `ThemeContext` provider from `src/contexts/ThemeContext.jsx`, which manages the theme state based on user preference and system settings.

## Implementation

The dark mode toggle in the admin panel header allows users to switch between light and dark themes. The implementation follows these key principles:

1. Classes are added to elements following the pattern: `bg-white dark:bg-gray-800`
2. The dark mode classes are only applied when the `dark` class is present on the `html` element
3. Brand color variants are typically darker in light mode and lighter in dark mode

## Dark Mode Class Mappings

### Backgrounds

- Primary backgrounds: `bg-white dark:bg-gray-800`
- Secondary backgrounds: `bg-gray-100 dark:bg-gray-900`
- UI element backgrounds: `bg-gray-200 dark:bg-gray-700`
- Modal headers/footers: `bg-gray-50 dark:bg-gray-900/50`

### Text

- Primary text: `text-gray-900 dark:text-gray-100`
- Secondary text: `text-gray-700 dark:text-gray-300`
- Muted text: `text-gray-500 dark:text-gray-400`

### Borders

- Primary borders: `border-gray-200 dark:border-gray-700`
- Input borders: `border-gray-300 dark:border-gray-600`

### Brand Colors

- Primary: `text-primary dark:text-primary-400`
- Secondary: `text-secondary dark:text-secondary-400`
- Accent: `text-accent dark:text-accent-400`

### Hover States

- Background hover: `hover:bg-gray-100 dark:hover:bg-gray-700`
- Text hover: `hover:text-primary dark:hover:text-primary-400`

## Guidelines for Adding Dark Mode to New Components

When implementing dark mode in new admin components:

1. Use the utility classes from `src/pages/Admin/utils/darkModeUpdates.js` as a reference
2. Maintain consistent color patterns across the admin interface
3. Test components in both light and dark mode
4. Pay special attention to contrast ratios for accessibility

## Components with Dark Mode Support

These key components have been updated to support dark mode:

- `AdminDashboard.jsx` - Main layout
- `AdminHeader.jsx` - Top navigation bar
- `AdminSidebar.jsx` - Side navigation
- `AdminLogin.jsx` - Login screen
- `AdminHome.jsx` - Dashboard home page
- `StatsCard.jsx` - Dashboard statistics
- `RecentSubmissionsList.jsx` - Activity feed
- `ConfirmDeleteModal.jsx` - Delete confirmation
- `InputModal.jsx` - Form inputs

## Usage

To use dark mode in a component:

```jsx
import { useTheme } from "../../contexts/ThemeContext";

const YourComponent = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      {/* Component content */}
    </div>
  );
};
```

The theme will automatically adjust based on the user's preference.
