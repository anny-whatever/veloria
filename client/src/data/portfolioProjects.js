// src/data/portfolioProjects.js
// This file contains data for portfolio projects with detailed case studies

const portfolioProjects = [
  {
    id: 1,
    title: "Phuler",
    subtitle: "E-commerce Website",
    category: "ecommerce",
    thumbnail: "/projects/phuler/thumb.png",
    images: [
      "/projects/phuler/image_1.png",
      "/projects/phuler/image_2.png",
      "/projects/phuler/image_3.png",
    ],
    clientName: "Phuler Floral Boutique",
    duration: "6 weeks",
    completedDate: "Ongoing",
    liveUrl: "https://phuler.com",
    tags: [
      "E-commerce",
      "Custom Development",
      "UI/UX Design",
      "Responsive Design",
      "Mobile-First",
    ],
    description:
      "A premium e-commerce platform for a boutique selling handcrafted floral-inspired jewelry and accessories for women.",
    challenge:
      "Phuler was a new brand entering a competitive market with no existing online presence. They needed an e-commerce platform that would showcase their premium products effectively, convey their brand story, and provide a seamless shopping experience.",
    solution:
      "We created a custom e-commerce platform with an elegant, nature-inspired design that perfectly aligned with their brand identity. The site features high-quality product photography, intuitive navigation, and a streamlined checkout process with Razorpay integration. We implemented advanced filtering options to help customers find products by material, collection, and price range.",
    features: [
      "Custom product categorization system",
      "Integrated Instagram feed showing customer photos",
      "Wishlist functionality",
      "Size guide with detailed measurements",
      "Virtual try-on feature for select pieces",
      "Seamless mobile shopping experience",
      "Newsletter integration with special offer popup",
    ],
    results:
      "Within the first three months of launch, Phuler achieved a 35% conversion rate on product pages, a 2.8% overall site conversion rate (significantly above industry average), and an average order value of ₹5,800. Their email list grew to over 1,500 subscribers, and they received excellent feedback on the user experience.",
    testimonial: {
      text: "Love how Veloria understood our brand and created a site that's both gorgeous and super functional. Our customers often tell us how much they enjoy shopping with us!",
      author: "Priya Sharma",
      position: "Founder, Phuler",
    },
  },

  {
    id: 2,
    title: "Gracioza",
    subtitle: "Food & Fitness Blog",
    category: "blog",
    thumbnail: "/projects/gracioza/thumb.png",
    images: [
      "/projects/gracioza/image_1.png",
      "/projects/gracioza/image_2.png",
      "/projects/gracioza/image_3.png",
    ],
    clientName: "Ananya Sen, Food & Fitness Coach",
    duration: "4 weeks",
    completedDate: "July 2023",
    liveUrl: "https://gracioza.com",
    tags: ["Blog", "Custom CMS", "Content Management", "SEO", "Membership"],
    description:
      "A content-rich food and fitness blog platform for a holistic health coach focusing on balanced nutrition and mindful wellness practices.",
    challenge:
      "Ananya had been sharing content through social media and a basic website but needed a more robust platform to grow her audience, showcase her expertise, and create a premium membership area for exclusive content and courses.",
    solution:
      "We designed a custom content management system that prioritizes readability and content discovery. The site includes both free blog content and a gated membership area with exclusive resources. We implemented advanced SEO features to improve visibility and integrated email marketing to nurture her audience.",
    features: [
      "Category-focused homepage with featured content",
      "Custom post types for recipes, exercises, and meal plans",
      "Member-only content area with tiered access",
      "Integrated podcast player",
      "Email course automation",
      "Resource library with downloadable content",
      "Advanced search functionality with content filtering",
    ],
    results:
      "Within 6 months of launch, Gracioza's blog traffic increased by 115%, with organic search visits growing by 78%. Her email list doubled to 8,500 subscribers, and she successfully launched a premium membership program with 350 paying members in the first quarter.",
    testimonial: {
      text: "The team built exactly what I needed - not just a pretty site, but a powerful platform that grows with me. My readers love it and it's so easy to update!",
      author: "Ananya Sen",
      position: "Founder, Gracioza",
    },
  },

  {
    id: 3,
    title: "Kinder Dot",
    subtitle: "Children's Educational Platform",
    category: "custom",
    thumbnail: "/projects/kinderdot/thumb.svg",
    images: [
      "/projects/kinderdot/image_1.png",
      "/projects/kinderdot/image_2.png",
    ],
    clientName: "Kinder Dot Learning Co.",
    duration: "8 weeks",
    completedDate: "November 2023",
    liveUrl: "https://kinderdot.com",
    tags: [
      "Educational",
      "Interactive",
      "Child-Friendly",
      "Custom Web App",
      "Gamification",
    ],
    description:
      "An interactive educational platform designed for children aged 4-8, featuring learning games, animated stories, and parent resources.",
    challenge:
      "Kinder Dot needed a website that would be engaging for young children while being informative for parents. The platform needed to include interactive elements suitable for early learners, while maintaining excellent performance and an intuitive interface for children with limited reading skills.",
    solution:
      "We developed a custom web application with a vibrant, playful interface and an innovative navigation system suitable for young users. The platform features a mix of educational games, animated story videos, and printable activities. A separate parent zone provides resources, progress tracking, and account management.",
    features: [
      "Age-appropriate user interface with audio cues",
      "Interactive learning games with progress tracking",
      "Animated educational stories with voice narration",
      "Printable activity sheets and coloring pages",
      "Parent dashboard with child activity reports",
      "Bookmarking system for favorite content",
      "Achievement badges system to encourage learning",
    ],
    results:
      "Since launch, Kinder Dot has attracted over 12,000 registered users, with an average session duration of 18 minutes (exceptional for the children's market). The platform boasts a 72% return rate, with parents reporting high satisfaction with both the educational value and the child-friendly interface.",
    testimonial: {
      text: "Veloria nailed our vision for a platform that both kids and parents love. The site is engaging, educational, and super easy to use. Our user numbers have blown past our targets!",
      author: "Dr. Avinash Mehta",
      position: "Educational Director, Kinder Dot Learning Co.",
    },
  },

  {
    id: 4,
    title: "The Terminal",
    subtitle: "Stock Trading Platform",
    category: "custom",
    thumbnail: "/projects/theterminal/thumb.png",
    images: [
      "/projects/theterminal/image_1.png",
      "/projects/theterminal/image_2.png",
    ],
    clientName: "Mitesh Patel Trading Solutions",
    duration: "12 weeks",
    completedDate: "September 2023",
    liveUrl: "https://theterminal.finance",
    tags: [
      "Trading Platform",
      "Custom Development",
      "Data Visualization",
      "Real-time Updates",
      "User Authentication",
    ],
    description:
      "A full-fledged stock market trading terminal with advanced charting, real-time data, and portfolio management capabilities.",
    challenge:
      "Mitesh Patel needed a sophisticated yet intuitive trading platform for his investment company that could handle real-time market data, provide advanced technical analysis tools, and securely manage client portfolios across multiple asset classes.",
    solution:
      "We developed a custom trading terminal that combines robust data handling with an intuitive interface. The platform offers real-time market data integration, customizable trading dashboards, advanced charting tools, and secure multi-user authentication with role-based access controls.",
    features: [
      "Real-time market data integration",
      "Advanced technical analysis tools",
      "Customizable dashboard layouts",
      "Portfolio performance tracking",
      "Automated trade alerts",
      "Multi-device synchronization",
      "Institutional-grade security protocols",
    ],
    results:
      "After implementing The Terminal, Mitesh's trading firm reported a 42% increase in trade execution speed, 65% improvement in data analysis capabilities, and a 28% reduction in operational errors. Client satisfaction metrics improved by 47% due to the enhanced reporting and visualization tools.",
    testimonial: {
      text: "This platform has revolutionized how we analyze markets and execute trades. The team built exactly what we needed - fast, reliable, and powerful. Our analysts can't imagine working without it now!",
      author: "Mitesh Patel",
      position: "CEO, Mitesh Patel Trading Solutions",
    },
  },

  {
    id: 5,
    title: "Blair Owens",
    subtitle: "Real Estate Website",
    category: "landing",
    thumbnail: "/projects/blairowens/thumb.png",
    images: [
      "/projects/blairowens/image_1.png",
      "/projects/blairowens/image_2.png",
    ],
    clientName: "Blair Owens Real Estate",
    duration: "5 weeks",
    completedDate: "February 2024",
    liveUrl: "https://blairowens.com",
    tags: [
      "Real Estate",
      "Lead Generation",
      "Property Listings",
      "Conversion Optimization",
      "Local SEO",
    ],
    description:
      "A high-converting website for a family-focused real estate agency specializing in suburban homes for growing families.",
    challenge:
      "Blair Owens was running digital ad campaigns but lacked an effective website for conversion. They needed a targeted platform that would speak directly to families looking for suburban homes and convert visitors into qualified leads for their agents.",
    solution:
      "We designed a focused website that speaks directly to the needs and concerns of families searching for homes. The site features property listings, testimonials from satisfied families, neighborhood highlights, and clear calls to action. We implemented a custom lead capture form that qualifies prospects based on specific needs.",
    features: [
      "Neighborhood comparison tool",
      "School district information integration",
      "Family testimonial video carousel",
      "Home value estimation tool",
      "Multi-step lead generation form",
      "Appointment scheduling integration",
      "Mobile-optimized design for on-the-go parents",
    ],
    results:
      "The new website increased lead conversion rates from 2.4% to 8.9% - a 270% improvement over their previous generic site. The quality of leads improved significantly, with agents reporting that 45% of web leads became clients (up from 18%). The platform achieved a 45% decrease in cost-per-acquisition for their digital marketing campaigns.",
    testimonial: {
      text: "Our marketing ROI has skyrocketed with this website. We're getting better quality leads who are ready to buy. The design perfectly captures what we're about!",
      author: "Vikram Malhotra",
      position: "Marketing Director, Blair Owens Real Estate",
    },
  },

  {
    id: 6,
    title: "Panaderia",
    subtitle: "French Bakery Website",
    category: "branding",
    thumbnail: "/projects/panaderia/thumb.png",
    images: [
      "/projects/panaderia/image_1.png",
      "/projects/panaderia/image_2.png",
    ],
    clientName: "Panaderia Artisanal French Bakery",
    duration: "4 weeks",
    completedDate: "October 2023",
    liveUrl: "https://panaderia.fr",
    tags: [
      "Branding",
      "Local Business",
      "E-commerce",
      "Order System",
      "Local SEO",
    ],
    description:
      "A brand identity and website for an artisanal French bakery specializing in custom celebration cakes and authentic baked goods.",
    challenge:
      "Panaderia needed to transition from primarily word-of-mouth business to a more scalable model with online ordering. They needed a website that would showcase their beautiful creations, streamline the custom cake ordering process, and help them reach new local customers.",
    solution:
      "We developed a comprehensive brand identity and website that captures the artisanal, handcrafted nature of their products. The site features a custom cake builder, pre-order system with Razorpay payment integration for regular items, and strong local SEO elements to improve visibility in their community.",
    features: [
      "Custom cake design and ordering system",
      "Searchable gallery of previous creations",
      "Online pre-ordering for bakery items",
      "Event catering information and booking",
      "Baking class scheduling and payment",
      "Local delivery zone checker",
      "Seasonal product highlights",
    ],
    results:
      "Within three months of launch, Panaderia reported a 47% increase in custom cake orders and a 64% reduction in consultation time thanks to the detailed online cake builder. Their local search visibility improved dramatically, with a 110% increase in Google Business Profile interactions and a 75% increase in direction requests.",
    testimonial: {
      text: "This website has completely transformed our bakery! The cake builder saves us so much time, and our customers love browsing our creations. We're reaching new customers daily and spending more time baking, less time on the phone.",
      author: "Sophie Laurent",
      position: "Owner & Head Baker, Panaderia",
    },
  },
];

export default portfolioProjects;
