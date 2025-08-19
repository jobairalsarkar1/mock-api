import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { Github, Twitter, Linkedin, Mail, Youtube } from "lucide-react";

const Page = () => {
  return (
    <>
      <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 dark:bg-[#0e0e10] text-gray-900 dark:text-white/90">
        <div className="relative z-20 max-w-6xl w-full grid md:grid-cols-2 gap-12 px-6">
          {/* Left side: Info & Socials */}
          <div className="flex flex-col justify-between h-full items-center text-center md:items-start md:text-left">
            {/* Top content */}
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800 dark:text-white/90">
                Contact{" "}
                <span className="bg-gradient-to-r from-orange-300 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Us
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-lg">
                We&apos;d love your input: questions, feature requests, bugs, or
                compliments.
              </p>
            </div>

            {/* Bottom content */}
            <div>
              <h3 className="font-semibold mb-4 text-gray-800 dark:text-white/90 text-lg md:text-2xl">
                Follow us
              </h3>

              <div className="flex flex-wrap gap-4 text-gray-500 dark:text-gray-400 justify-center md:justify-start">
                <a href="#" className="hover:text-orange-500">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-orange-500">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-orange-500">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="hover:text-orange-500">
                  <Youtube className="w-6 h-6" />
                </a>
                <a
                  href="mailto:hello@example.com"
                  className="hover:text-orange-500"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Right side: Form */}
          <ContactForm />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Page;
