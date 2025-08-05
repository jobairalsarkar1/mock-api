import Link from "next/link";
import {
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Code,
  Heart,
  Network,
} from "lucide-react";
import CustomBadge from "./CustomBadge";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/docs" },
      { label: "Status", href: "#" },
    ],
    company: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
    resources: [
      { label: "Community", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Examples", href: "/docs" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  };

  return (
    <footer className="bg-[#0e0e10] text-white pt-24">
      {/* CTA Section */}
      <div className="text-center px-4">
        <CustomBadge icon={Code} text="Ready to Build?" />
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Start Building with{" "}
          <span className="bg-gradient-to-r from-orange-200 via-orange-500 to-orange-600 bg-clip-text text-transparent">
            DataForge Today
          </span>
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">
          Join thousands of developers who trust DataForge for rapid prototyping
          and development.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Link
            href="/account"
            className="inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg rounded-lg hover:scale-105 transition"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center justify-center px-6 py-2 border border-orange-600/80 text-gray-300 text-lg rounded-lg hover:bg-orange-600/10 transition"
          >
            View Documentation
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 pb-12 lg:pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-tr from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Network className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">DataForge</span>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              Realistic dummy APIs for modern developers. Build faster, iterate
              quicker, and focus on what matters most.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-orange-500 transition"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-orange-500 transition"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-orange-500 transition"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-orange-500 transition"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([section, links], i) => (
            <div key={i}>
              <h3 className="font-semibold mb-4 capitalize">{section}</h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-orange-500 transition text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Separator */}
        <div className="my-8 h-px bg-orange-600/40"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {currentYear} DataForge. All rights reserved.</p>
          <div className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> for
            developers
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
