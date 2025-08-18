import { BarChart3, ChartColumn, Clock, Code2, FileText, Globe, Shield, ShoppingCart, Users, Zap } from "lucide-react";

// export const testimonials = [
//   {
//     name: "Sarah Chen",
//     role: "Frontend Developer",
//     company: "TechStart Inc.",
//     content:
//       "DataForge has completely transformed how we prototype applications. The realistic data makes our demos feel authentic and helps stakeholders understand the vision immediately.",
//     rating: 5,
//     gradient: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
//     glow: "shadow-[0_0_30px_rgba(59,130,246,0.2)]",
//     border: "border border-[#3b82f640]",
//   },
//   {
//     name: "Marcus Rodriguez",
//     role: "Full Stack Engineer",
//     company: "InnovateNow",
//     content:
//       "The API response times are incredible, and the data quality is unmatched. We've been able to focus entirely on our application logic instead of worrying about test data.",
//     rating: 5,
//     gradient: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
//     glow: "shadow-[0_0_30px_rgba(168,85,247,0.2)]",
//     border: "border border-[#a855f740]",
//   },
//   {
//     name: "Emma Thompson",
//     role: "Product Manager",
//     company: "Digital Solutions Co.",
//     content:
//       "What impressed me most is how easy it was to integrate. Our entire team was up and running within minutes, and the documentation is crystal clear.",
//     rating: 5,
//     gradient: "bg-gradient-to-br from-emerald-500/20 to-green-500/20",
//     glow: "shadow-[0_0_30px_rgba(16,185,129,0.2)]",
//     border: "border border-[#10b98140]",
//   },
//   {
//     name: "David Kim",
//     role: "Backend Developer",
//     company: "CloudTech Systems",
//     content:
//       "The variety of endpoints available is fantastic. Whether we need user data, e-commerce products, or social media posts, DataForge has exactly what we need.",
//     rating: 5,
//     gradient: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
//     glow: "shadow-[0_0_30px_rgba(249,115,22,0.2)]",
//     border: "border border-[#f9731640]",
//   },
//   {
//     name: "Lisa Wang",
//     role: "Tech Lead",
//     company: "StartupHub",
//     content:
//       "DataForge has become an essential part of our development workflow. The consistent data structure and reliability have significantly improved our testing process.",
//     rating: 5,
//     gradient: "bg-gradient-to-br from-indigo-500/20 to-purple-500/20",
//     glow: "shadow-[0_0_30px_rgba(99,102,241,0.2)]",
//     border: "border border-[#6366f140]",
//   },
//   {
//     name: "James Miller",
//     role: "Mobile Developer",
//     company: "AppCraft Studios",
//     content:
//       "The mobile-optimized responses and fast loading times make DataForge perfect for our React Native applications. It's exactly what we needed.",
//     rating: 5,
//     gradient: "bg-gradient-to-br from-rose-500/20 to-pink-500/20",
//     glow: "shadow-[0_0_30px_rgba(244,63,94,0.2)]",
//     border: "border border-[#f43f5e40]",
//   },
// ];

export const testimonials = [
  {
    name: "Sarah Chen",
    role: "Frontend Developer",
    company: "TechStart Inc.",
    content: "DataForge has completely transformed how we prototype applications. The realistic data makes our demos feel authentic and helps stakeholders understand the vision immediately.",
    rating: 5,
    gradient: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/20 dark:to-cyan-500/20",
    glow: "shadow-[0_0_30px_rgba(59,130,246,0.2)]",
    border: "border border-blue-200 dark:border-[#3b82f640]",
    textColor: "text-gray-700 dark:text-white/80",
    iconBg: "bg-blue-100 dark:bg-blue-500/20"
  },
  {
    name: "Marcus Rodriguez",
    role: "Full Stack Engineer",
    company: "InnovateNow",
    content: "The API response times are incredible, and the data quality is unmatched. We've been able to focus entirely on our application logic instead of worrying about test data.",
    rating: 5,
    gradient: "bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-500/20 dark:to-pink-500/20",
    glow: "shadow-[0_0_30px_rgba(168,85,247,0.2)]",
    border: "border border-purple-200 dark:border-[#a855f740]",
    textColor: "text-gray-700 dark:text-white/80",
    iconBg: "bg-purple-100 dark:bg-purple-500/20"
  },
  {
    name: "Emma Thompson",
    role: "Product Manager",
    company: "Digital Solutions Co.",
    content: "What impressed me most is how easy it was to integrate. Our entire team was up and running within minutes, and the documentation is crystal clear.",
    rating: 5,
    gradient: "bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-500/20 dark:to-green-500/20",
    glow: "shadow-[0_0_30px_rgba(16,185,129,0.2)]",
    border: "border border-emerald-200 dark:border-[#10b98140]",
    textColor: "text-gray-700 dark:text-white/80",
    iconBg: "bg-green-100 dark:bg-emerald-500/20"
  },
  {
    name: "David Kim",
    role: "Backend Developer",
    company: "CloudTech Systems",
    content: "The variety of endpoints available is fantastic. Whether we need user data, e-commerce products, or social media posts, DataForge has exactly what we need.",
    rating: 5,
    gradient: "bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-500/20 dark:to-red-500/20",
    glow: "shadow-[0_0_30px_rgba(249,115,22,0.2)]",
    border: "border border-orange-200 dark:border-[#f9731640]",
    textColor: "text-gray-700 dark:text-white/80",
    iconBg: "bg-orange-100 dark:bg-orange-500/20"
  },
  {
    name: "Lisa Wang",
    role: "Tech Lead",
    company: "StartupHub",
    content: "DataForge has become an essential part of our development workflow. The consistent data structure and reliability have significantly improved our testing process.",
    rating: 5,
    gradient: "bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-500/20 dark:to-purple-500/20",
    glow: "shadow-[0_0_30px_rgba(99,102,241,0.2)]",
    border: "border border-indigo-200 dark:border-[#6366f140]",
    textColor: "text-gray-700 dark:text-white/80",
    iconBg: "bg-indigo-100 dark:bg-indigo-500/20"
  },
  {
    name: "James Miller",
    role: "Mobile Developer",
    company: "AppCraft Studios",
    content: "The mobile-optimized responses and fast loading times make DataForge perfect for our React Native applications. It's exactly what we needed.",
    rating: 5,
    gradient: "bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-500/20 dark:to-pink-500/20",
    glow: "shadow-[0_0_30px_rgba(244,63,94,0.2)]",
    border: "border border-rose-200 dark:border-[#f43f5e40]",
    textColor: "text-gray-700 dark:text-white/80",
    iconBg: "bg-rose-100 dark:bg-rose-500/20"
  },
];

export const faqs = [
  {
    question: "How do I get started with DataForge?",
    answer:
      "Simply sign up for a free account and you'll receive your API key instantly. You can start making requests immediately with our comprehensive documentation and examples.",
  },
  {
    question: "Is the data realistic and production-ready?",
    answer:
      "Yes! Our dummy data is carefully crafted to be realistic and comprehensive. It includes proper relationships, realistic values, and follows industry standards for data structures.",
  },
  {
    question: "Can I use DataForge in production?",
    answer:
      "DataForge is designed for development, testing, and prototyping. For production applications, you'll want to replace our endpoints with your actual backend APIs.",
  },
  {
    question: "What happens when I hit the rate limits?",
    answer:
      "When you reach your plan's rate limit, requests will return a 429 status code. You can upgrade your plan for higher limits or wait for the limit to reset.",
  },
  //   {
  //     question: "Do you offer custom data structures?",
  //     answer:
  //       "Yes! Enterprise customers can request custom endpoints and data structures tailored to their specific needs. Contact our sales team to discuss your requirements.",
  //   },
  {
    question: "Is my API key secure?",
    answer:
      "Absolutely. Your API key is encrypted and should be kept confidential. Never expose it in client-side code. Use environment variables and follow security best practices.",
  },
  //   {
  //     question: "Can I cancel my subscription anytime?",
  //     answer:
  //       "Yes, you can cancel your subscription at any time. Your plan will remain active until the end of your billing period, and you can always downgrade to our free tier.",
  //   },
];

export const apiCategories = [
  {
    title: "User Management",
    description:
      "Access detailed user data, authentication status, and social information. Ideal for monitoring user activity and integrating identity management systems.",
    icon: Users,
    endpoints: ["Users", "Profiles"],
    border: "border-blue-500/30",
    hoverShadow: "hover:shadow-[0_0_20px_#3b82f6aa]",
    iconGradient: "from-blue-500 via-blue-600 to-blue-700",
    extraInfo:
      "Provides comprehensive user profile data, authentication status, and role-based access information. Read-only access—no user creation or modification supported.",
  },
  {
    title: "E-commerce",
    description:
      "Retrieve structured data on products, orders, and payments for e-commerce analysis, reporting, and inventory monitoring.",
    icon: ShoppingCart,
    endpoints: ["Products", "Orders", "Payments", "Cart"],
    border: "border-green-500/30",
    hoverShadow: "hover:shadow-[0_0_20px_#22c55e88]",
    iconGradient: "from-green-400 via-green-500 to-green-600",
    extraInfo:
      "Offers access to current product listings, order statuses, payment summaries, and cart data. All data is read-only and designed for analytics or external sync.",
  },
  {
    title: "Content & Media",
    description:
      "Fetch content-related data including posts, comments, files, and media assets. Great for content consumption and media-rich integrations.",
    icon: FileText,
    endpoints: ["Posts", "Comments", "Media", "Files"],
    border: "border-purple-500/30",
    hoverShadow: "hover:shadow-[0_0_20px_#8b5cf699]",
    iconGradient: "from-purple-500 via-purple-600 to-purple-700",
    extraInfo:
      "Includes access to published posts, user comments, uploaded files, and image metadata. Intended for display and analysis purposes only — no write or delete capabilities.",
  },
  {
    title: "Analytics & Data",
    description:
      "Gain insights from business and platform data with access to charts, reports, metrics, and analytics endpoints.",
    icon: ChartColumn,
    endpoints: ["Analytics", "Reports", "Metrics"],
    border: "border-orange-500/30",
    hoverShadow: "hover:shadow-[0_0_20px_#f9731699]",
    iconGradient: "from-orange-400 via-orange-500 to-orange-600",
    extraInfo:
      "Delivers detailed usage statistics, performance metrics, traffic reports, and chart data. Fully read-only, built for dashboards, monitoring tools, and reporting engines.",
  },
];

export const features = [
  {
    title: "Lightning Fast",
    description: "Global CDN ensures sub-100ms response times worldwide",
    icon: Zap,
    border: "border-yellow-400/30",
    hoverShadow: "hover:shadow-[0_0_20px_#facc1599]",
    iconGradient: "from-yellow-400 via-yellow-500 to-yellow-600",
  },
  {
    title: "Production Ready",
    description: "99.9% uptime with enterprise-grade infrastructure",
    icon: Shield,
    border: "border-pink-500/30",
    hoverShadow: "hover:shadow-[0_0_20px_#ec489999]",
    iconGradient: "from-pink-500 via-fuchsia-500 to-rose-500",
  },
  {
    title: "Usage Analytics",
    description: "Detailed insights into your API consumption and patterns",
    icon: BarChart3,
    border: "border-orange-400/30",
    hoverShadow: "hover:shadow-[0_0_20px_#fb923c99]",
    iconGradient: "from-orange-500 via-orange-600 to-orange-700",
  },
  {
    title: "Real-time Updates",
    description: "Fresh data every hour with realistic variations",
    icon: Clock,
    border: "border-indigo-500/30",
    hoverShadow: "hover:shadow-[0_0_20px_#6366f199]",
    iconGradient: "from-indigo-500 via-indigo-600 to-indigo-700",
  },
  {
    title: "Global Access",
    description: "CORS enabled, accessible from any domain or app",
    icon: Globe,
    border: "border-cyan-500/30",
    hoverShadow: "hover:shadow-[0_0_20px_#06b6d499]",
    iconGradient: "from-cyan-500 via-blue-500 to-blue-600",
  },
  {
    title: "Multiple Formats",
    description: "JSON, XML, CSV - choose your preferred data format",
    icon: Code2,
    border: "border-teal-500/30",
    hoverShadow: "hover:shadow-[0_0_20px_#14b8a699]",
    iconGradient: "from-teal-500 via-teal-600 to-teal-700",
  },
];