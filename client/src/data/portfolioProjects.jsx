// src/data/portfolioProjects.js
// Portfolio data for Veloria Labs - Product Engineering & Technical Solutions

const portfolioProjects = [
  {
    id: 1,
    title: "FinTech MVP Platform",
    subtitle: "Real-time Trading & Analytics Engine",
    category: "mvp",
    thumbnail: "/projects/fintech/thumb.png",
    images: [
      "/projects/fintech/architecture.png",
      "/projects/fintech/dashboard.png",
      "/projects/fintech/mobile.png",
    ],
    clientName: "TradeFlex Technologies",
    duration: "6 weeks",
    completedDate: "March 2024",
    liveUrl: "https://tradeflex.ai",
    githubUrl: "https://github.com/velorialabs/tradeflex-engine",
    tags: [
      "TypeScript",
      "Node.js",
      "React",
      "WebSocket",
      "Redis",
      "PostgreSQL",
      "AWS",
      "Real-time Data",
    ],
    description:
      "Production-ready fintech platform built from MVP to scale in 6 weeks. Features real-time market data processing, algorithmic trading capabilities, and institutional-grade security.",
    challenge:
      "A startup needed to go from concept to Series A pitch with a fully functional trading platform. Required handling millions of real-time data points, sub-100ms latency, and enterprise security compliance.",
    solution:
      "Architected a microservices platform using Node.js and TypeScript with real-time WebSocket connections. Implemented Redis for caching, PostgreSQL for transactions, and deployed on AWS with auto-scaling. Built custom trading algorithms and risk management systems.",
    techStack: {
      Frontend: ["React 18", "TypeScript", "Redux Toolkit", "Material-UI"],
      Backend: ["Node.js", "Express", "TypeScript", "WebSocket"],
      Database: ["PostgreSQL", "Redis", "TimescaleDB"],
      Infrastructure: ["AWS ECS", "CloudFormation", "ElastiCache", "RDS"],
      DevOps: ["Docker", "GitHub Actions", "Terraform"],
    },
    metrics: {
      Performance: "Sub-50ms API response times",
      Scale: "1M+ transactions/day capability",
      Uptime: "99.9% SLA achieved",
      Security: "SOC2 Type II compliant",
    },
    features: [
      "Real-time market data streaming (WebSocket)",
      "Algorithmic trading engine with custom strategies",
      "Portfolio analytics and risk management",
      "Multi-asset support (stocks, crypto, forex)",
      "Advanced charting with technical indicators",
      "Automated compliance reporting",
      "Mobile-first responsive design",
    ],
    results:
      "Platform processed $50M+ in trades during beta. Client raised $12M Series A within 3 months of launch. System handles 10,000+ concurrent users with 99.9% uptime.",
    testimonial: {
      text: "Veloria Labs delivered exactly what we needed - enterprise-grade architecture that scales. Their technical expertise in fintech is unmatched. We went from idea to Series A in record time.",
      author: "Sarah Chen",
      position: "CTO, TradeFlex Technologies",
    },
    content: () => (
      <div className="space-y-4 text-sm">
        <p className="font-semibold text-purple-600">
          Technical Architecture Highlights:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Microservices architecture with Docker containerization</li>
          <li>Real-time data processing using Redis Streams</li>
          <li>Load balancing with AWS Application Load Balancer</li>
          <li>Database sharding strategy for horizontal scaling</li>
          <li>Event-driven architecture using AWS EventBridge</li>
        </ul>
        <p className="font-semibold text-purple-600 mt-4">
          Security & Compliance:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>End-to-end encryption for all financial data</li>
          <li>Multi-factor authentication and role-based access</li>
          <li>Automated security scanning in CI/CD pipeline</li>
          <li>PCI DSS Level 1 compliance implementation</li>
        </ul>
      </div>
    ),
  },

  {
    id: 2,
    title: "AI-Powered SaaS Platform",
    subtitle: "Document Processing & Analytics",
    category: "ai",
    thumbnail: "/projects/docai/thumb.png",
    images: [
      "/projects/docai/dashboard.png",
      "/projects/docai/ai-features.png",
      "/projects/docai/analytics.png",
    ],
    clientName: "DocumentIQ Systems",
    duration: "8 weeks",
    completedDate: "February 2024",
    liveUrl: "https://documentiq.ai",
    tags: [
      "Python",
      "FastAPI",
      "React",
      "AI/ML",
      "OpenAI",
      "Vector DB",
      "Kubernetes",
      "Microservices",
    ],
    description:
      "Enterprise AI platform that transforms document processing workflows using advanced ML models and natural language processing for automated data extraction and insights.",
    challenge:
      "Enterprise client needed to digitize and process thousands of legal documents daily. Manual processing was taking 40+ hours per document with high error rates. Required intelligent extraction and compliance verification.",
    solution:
      "Built an AI-native platform using OpenAI GPT-4, custom ML models, and vector databases. Implemented intelligent document parsing, automated data extraction, and real-time compliance checking with audit trails.",
    techStack: {
      "AI/ML": ["OpenAI GPT-4", "Hugging Face", "LangChain", "Pinecone"],
      Backend: ["Python", "FastAPI", "Celery", "Redis"],
      Frontend: ["React", "TypeScript", "Tailwind CSS"],
      Infrastructure: ["Kubernetes", "Docker", "AWS", "MongoDB"],
      DevOps: ["GitLab CI/CD", "Terraform", "Monitoring"],
    },
    metrics: {
      "Processing Speed": "95% faster than manual",
      Accuracy: "99.2% data extraction accuracy",
      "Cost Savings": "$2M+ annual savings",
      Scalability: "10,000+ documents/day",
    },
    features: [
      "Intelligent document parsing with OCR",
      "AI-powered data extraction and classification",
      "Real-time compliance verification",
      "Custom ML model training pipeline",
      "Advanced analytics and reporting dashboard",
      "API-first architecture for integrations",
      "Multi-language support (12 languages)",
    ],
    results:
      "Reduced document processing time from 40 hours to 2 hours per document. Achieved 99.2% accuracy in data extraction. Client expanded to 5 new markets using the platform's scalability.",
    testimonial: {
      text: "This AI platform has revolutionized our document workflows. The technical sophistication and practical results exceeded our expectations. Veloria Labs truly understands enterprise AI implementation.",
      author: "Dr. Michael Rodriguez",
      position: "Chief Technology Officer, DocumentIQ Systems",
    },
    content: () => (
      <div className="space-y-4 text-sm">
        <p className="font-semibold text-purple-600">AI/ML Implementation:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Custom fine-tuned models for document classification</li>
          <li>Vector embeddings for semantic search capabilities</li>
          <li>Continuous learning pipeline with feedback loops</li>
          <li>Multi-modal processing (text, images, tables)</li>
          <li>Real-time model performance monitoring</li>
        </ul>
        <p className="font-semibold text-purple-600 mt-4">
          Technical Innovation:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Event-driven microservices architecture</li>
          <li>Async processing with intelligent queuing</li>
          <li>Auto-scaling based on processing load</li>
          <li>Enterprise-grade security and data governance</li>
        </ul>
      </div>
    ),
  },

  {
    id: 3,
    title: "E-commerce Growth Engine",
    subtitle: "Headless Commerce + Analytics",
    category: "ecommerce",
    thumbnail: "/projects/commerce/thumb.png",
    images: [
      "/projects/commerce/storefront.png",
      "/projects/commerce/admin.png",
      "/projects/commerce/analytics.png",
    ],
    clientName: "RetailMax Solutions",
    duration: "10 weeks",
    completedDate: "January 2024",
    liveUrl: "https://retailmax.store",
    tags: [
      "Next.js",
      "Shopify Plus",
      "GraphQL",
      "Stripe",
      "Analytics",
      "Headless",
      "Performance",
    ],
    description:
      "High-performance headless e-commerce platform with advanced analytics, A/B testing, and growth optimization features. Built for scale with sub-2s load times.",
    challenge:
      "Growing e-commerce brand hitting platform limitations. Legacy system couldn't handle traffic spikes, had poor mobile performance, and lacked growth analytics. Needed seamless migration without downtime.",
    solution:
      "Architected a headless commerce solution using Next.js and Shopify Plus. Implemented advanced caching strategies, real-time analytics, and A/B testing framework. Zero-downtime migration with gradual traffic shifting.",
    techStack: {
      Frontend: ["Next.js 14", "React", "TypeScript", "Tailwind CSS"],
      Commerce: ["Shopify Plus", "GraphQL", "Storefront API"],
      Analytics: ["Custom Analytics", "Google Analytics 4", "Mixpanel"],
      Infrastructure: ["Vercel", "CDN", "Redis", "Shopify Functions"],
      Performance: ["Image Optimization", "Edge Computing", "ISR"],
    },
    metrics: {
      Performance: "1.8s average load time",
      Conversion: "34% increase in conversions",
      Mobile: "95+ Lighthouse score",
      Revenue: "$2.3M+ additional annual revenue",
    },
    features: [
      "Server-side rendering with ISR for optimal SEO",
      "Advanced product filtering and search",
      "Real-time inventory management",
      "Personalized product recommendations",
      "A/B testing framework for optimization",
      "Multi-currency and multi-language support",
      "Progressive Web App capabilities",
    ],
    results:
      "Achieved 34% increase in conversion rates and 47% improvement in mobile performance. Platform handles 50,000+ concurrent users during peak sales. Generated $2.3M+ in additional annual revenue.",
    testimonial: {
      text: "The technical execution was flawless. Our site is now lightning fast, conversion rates are up 34%, and we can scale confidently. Veloria Labs delivered enterprise-grade engineering.",
      author: "Jennifer Park",
      position: "Head of Digital, RetailMax Solutions",
    },
    content: () => (
      <div className="space-y-4 text-sm">
        <p className="font-semibold text-purple-600">
          Performance Optimizations:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Edge-side includes (ESI) for dynamic content</li>
          <li>Intelligent image optimization with WebP/AVIF</li>
          <li>Service worker for offline functionality</li>
          <li>Critical CSS inlining and resource prioritization</li>
          <li>Database query optimization and caching layers</li>
        </ul>
        <p className="font-semibold text-purple-600 mt-4">Growth Features:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Advanced cohort analysis and customer segmentation</li>
          <li>Predictive analytics for inventory management</li>
          <li>Automated personalization engine</li>
          <li>Real-time A/B testing with statistical significance</li>
        </ul>
      </div>
    ),
  },

  {
    id: 4,
    title: "Healthcare Data Platform",
    subtitle: "HIPAA-Compliant Patient Portal",
    category: "healthcare",
    thumbnail: "/projects/healthtech/thumb.png",
    images: [
      "/projects/healthtech/portal.png",
      "/projects/healthtech/dashboard.png",
      "/projects/healthtech/mobile.png",
    ],
    clientName: "MedCore Healthcare Systems",
    duration: "12 weeks",
    completedDate: "December 2023",
    liveUrl: "https://medcore-portal.health",
    tags: [
      "HIPAA",
      "Security",
      "React",
      "Node.js",
      "MongoDB",
      "AWS",
      "Encryption",
      "Compliance",
    ],
    description:
      "Enterprise healthcare platform with end-to-end encryption, HIPAA compliance, and real-time patient data management. Supports 100,000+ patients across multiple healthcare facilities.",
    challenge:
      "Healthcare network needed to consolidate patient data across 15 facilities while maintaining strict HIPAA compliance. Legacy systems had security vulnerabilities and poor user experience for both patients and providers.",
    solution:
      "Built a HIPAA-compliant platform with end-to-end encryption, role-based access controls, and audit logging. Implemented secure data synchronization across facilities and intuitive interfaces for patients and healthcare providers.",
    techStack: {
      Security: ["End-to-End Encryption", "AES-256", "TLS 1.3", "2FA"],
      Backend: ["Node.js", "Express", "MongoDB", "Redis"],
      Frontend: ["React", "TypeScript", "Secure Components"],
      Infrastructure: ["AWS", "VPC", "KMS", "CloudTrail"],
      Compliance: ["HIPAA", "SOC2", "Audit Logging", "Data Governance"],
    },
    metrics: {
      Security: "Zero security incidents",
      Compliance: "100% HIPAA audit compliance",
      Performance: "Sub-3s page loads",
      Adoption: "94% user adoption rate",
    },
    features: [
      "End-to-end encrypted patient communications",
      "Secure document sharing and e-signatures",
      "Real-time appointment scheduling across facilities",
      "Comprehensive audit logging and compliance reporting",
      "Role-based access controls for healthcare staff",
      "Mobile-first design with offline capabilities",
      "Integration with major EHR systems",
    ],
    results:
      "Successfully consolidated data from 15 facilities serving 100,000+ patients. Achieved 100% HIPAA compliance with zero security incidents. Reduced administrative overhead by 60%.",
    testimonial: {
      text: "Veloria Labs built exactly what we needed - a secure, compliant platform that our staff actually wants to use. Their expertise in healthcare technology and security is exceptional.",
      author: "Dr. Patricia Williams",
      position: "Chief Information Officer, MedCore Healthcare Systems",
    },
    content: () => (
      <div className="space-y-4 text-sm">
        <p className="font-semibold text-purple-600">Security Architecture:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Zero-trust security model implementation</li>
          <li>Advanced threat detection and monitoring</li>
          <li>Secure API design with rate limiting</li>
          <li>Regular penetration testing and security audits</li>
          <li>Automated compliance monitoring and reporting</li>
        </ul>
        <p className="font-semibold text-purple-600 mt-4">
          Integration Capabilities:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>HL7 FHIR R4 standard compliance</li>
          <li>Epic, Cerner, and Allscripts integrations</li>
          <li>Real-time data synchronization across systems</li>
          <li>Scalable microservices architecture</li>
        </ul>
      </div>
    ),
  },

  {
    id: 5,
    title: "Blockchain Infrastructure",
    subtitle: "DeFi Protocol & Smart Contracts",
    category: "blockchain",
    thumbnail: "/projects/defi/thumb.png",
    images: [
      "/projects/defi/protocol.png",
      "/projects/defi/contracts.png",
      "/projects/defi/analytics.png",
    ],
    clientName: "YieldVault Protocol",
    duration: "14 weeks",
    completedDate: "November 2023",
    liveUrl: "https://yieldvault.finance",
    tags: [
      "Solidity",
      "Web3",
      "React",
      "Ethereum",
      "Smart Contracts",
      "DeFi",
      "Security",
      "Auditing",
    ],
    description:
      "Production-ready DeFi protocol with automated yield farming, liquidity mining, and governance features. Manages $50M+ in total value locked (TVL).",
    challenge:
      "Crypto startup needed to launch a secure DeFi protocol with complex tokenomics and governance mechanisms. Required extensive security auditing and gas optimization for cost-effective operations.",
    solution:
      "Developed a comprehensive DeFi protocol using Solidity smart contracts with advanced yield farming strategies. Implemented governance token mechanics, security best practices, and gas-optimized contract architecture.",
    techStack: {
      Blockchain: ["Solidity", "Ethereum", "OpenZeppelin", "Hardhat"],
      Frontend: ["React", "Web3.js", "Ethers.js", "Wagmi"],
      Testing: ["Foundry", "Slither", "MythX", "Echidna"],
      Infrastructure: ["IPFS", "The Graph", "Alchemy", "Vercel"],
      Security: ["Multi-sig", "Timelock", "Proxy Patterns", "Audits"],
    },
    metrics: {
      TVL: "$50M+ total value locked",
      Security: "3 independent security audits",
      "Gas Efficiency": "40% gas optimization achieved",
      Governance: "2,500+ active governance participants",
    },
    features: [
      "Automated yield farming with multiple strategies",
      "Liquidity mining rewards and incentives",
      "Decentralized governance with voting mechanisms",
      "Multi-token support and LP token staking",
      "Flash loan resistant security measures",
      "Gas-optimized contract architecture",
      "Comprehensive analytics and reporting",
    ],
    results:
      "Protocol achieved $50M+ TVL within 6 months. Successfully passed 3 independent security audits with zero critical vulnerabilities. Generated $2M+ in fees for token holders.",
    testimonial: {
      text: "Veloria Labs delivered enterprise-grade smart contract development. Their security-first approach and deep DeFi expertise gave us confidence to launch with significant capital. Outstanding technical execution.",
      author: "Alex Thompson",
      position: "Founder & CEO, YieldVault Protocol",
    },
    content: () => (
      <div className="space-y-4 text-sm">
        <p className="font-semibold text-purple-600">
          Smart Contract Architecture:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Modular contract design with upgradeability</li>
          <li>Advanced access control and role management</li>
          <li>Gas-optimized storage patterns and data structures</li>
          <li>Emergency pause mechanisms and circuit breakers</li>
          <li>Comprehensive event logging for transparency</li>
        </ul>
        <p className="font-semibold text-purple-600 mt-4">Security Measures:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Multi-signature wallet for protocol governance</li>
          <li>Time-locked upgrades for transparency</li>
          <li>Automated testing with 100% code coverage</li>
          <li>Flash loan attack prevention mechanisms</li>
        </ul>
      </div>
    ),
  },

  {
    id: 6,
    title: "Enterprise API Gateway",
    subtitle: "Microservices Architecture & DevOps",
    category: "infrastructure",
    thumbnail: "/projects/api-gateway/thumb.png",
    images: [
      "/projects/api-gateway/architecture.png",
      "/projects/api-gateway/monitoring.png",
      "/projects/api-gateway/performance.png",
    ],
    clientName: "TechScale Enterprises",
    duration: "16 weeks",
    completedDate: "October 2023",
    liveUrl: "https://api.techscale.io",
    tags: [
      "Kubernetes",
      "Docker",
      "GraphQL",
      "API Gateway",
      "Microservices",
      "DevOps",
      "Monitoring",
      "Scaling",
    ],
    description:
      "Enterprise-grade API gateway and microservices platform handling 1M+ requests/day. Complete DevOps pipeline with auto-scaling, monitoring, and zero-downtime deployments.",
    challenge:
      "Enterprise client had monolithic architecture causing deployment bottlenecks and scaling issues. Needed migration to microservices with robust API management and enterprise-grade DevOps practices.",
    solution:
      "Architected a comprehensive microservices platform with Kubernetes orchestration, API gateway, and complete CI/CD pipeline. Implemented monitoring, logging, and auto-scaling for enterprise reliability.",
    techStack: {
      Orchestration: ["Kubernetes", "Docker", "Helm", "Istio"],
      "API Management": ["Kong Gateway", "GraphQL", "REST", "gRPC"],
      Monitoring: ["Prometheus", "Grafana", "Jaeger", "ELK Stack"],
      Infrastructure: ["AWS EKS", "Terraform", "ArgoCD", "Vault"],
      "CI/CD": ["GitLab CI", "Flux", "SonarQube", "Security Scanning"],
    },
    metrics: {
      Scale: "1M+ API requests/day",
      Uptime: "99.99% availability SLA",
      Performance: "Sub-100ms P95 latency",
      Deployment: "50+ deployments/week capability",
    },
    features: [
      "Intelligent API routing and load balancing",
      "Rate limiting and quota management",
      "Real-time monitoring and alerting",
      "Automated scaling based on traffic patterns",
      "Zero-downtime deployment strategies",
      "Comprehensive security and compliance features",
      "Multi-environment CI/CD pipeline",
    ],
    results:
      "Achieved 99.99% uptime with 50+ weekly deployments. Reduced infrastructure costs by 35% through intelligent auto-scaling. Improved development velocity by 200% with streamlined DevOps.",
    testimonial: {
      text: "This platform transformation exceeded our expectations. Veloria Labs delivered enterprise-grade architecture with remarkable reliability. Our development teams are now incredibly productive.",
      author: "Robert Kim",
      position: "VP of Engineering, TechScale Enterprises",
    },
    content: () => (
      <div className="space-y-4 text-sm">
        <p className="font-semibold text-purple-600">
          Infrastructure Architecture:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Multi-region deployment with disaster recovery</li>
          <li>Service mesh implementation for secure communication</li>
          <li>Advanced caching strategies with Redis Cluster</li>
          <li>Automated backup and restoration procedures</li>
          <li>Infrastructure as Code with GitOps workflow</li>
        </ul>
        <p className="font-semibold text-purple-600 mt-4">DevOps Excellence:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Blue-green and canary deployment strategies</li>
          <li>Automated security scanning and compliance checks</li>
          <li>Performance testing in CI/CD pipeline</li>
          <li>Intelligent rollback mechanisms</li>
        </ul>
      </div>
    ),
  },
];

export default portfolioProjects;
