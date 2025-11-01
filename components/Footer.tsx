import { motion } from "motion/react";
import { Heart, Github, Twitter, Linkedin, Mail, Instagram, Facebook } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Footer() {
  const footerLinks = {
    platform: [
      { name: "Home", href: "#home" },
      { name: "Features", href: "#features" },
      { name: "Shop", href: "#shop" },
      { name: "About", href: "#about" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "Community", href: "#" },
      { name: "FAQs", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Disclaimer", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", color: "hover:bg-blue-500" },
    { icon: Linkedin, href: "#", color: "hover:bg-blue-600" },
    { icon: Instagram, href: "#", color: "hover:bg-pink-500" },
    { icon: Facebook, href: "#", color: "hover:bg-blue-700" },
    { icon: Github, href: "#", color: "hover:bg-slate-700" },
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-50 to-slate-100 border-t border-slate-200 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl p-10 mb-16 shadow-2xl"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-white mb-3">
              Stay Connected with Your Wellness Journey
            </h3>
            <p className="text-purple-100 mb-6 text-lg">
              Get weekly tips, mindfulness exercises, and exclusive updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/90 backdrop-blur-sm border-0 rounded-full py-6 text-base"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-white text-purple-600 hover:bg-purple-50 rounded-full px-8 py-6 font-semibold whitespace-nowrap">
                  Subscribe
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.a
              href="#home"
              className="flex items-center gap-2 mb-4 group"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center shadow-lg"
                whileHover={{ rotate: [0, -10, 10, 0] }}
              >
                <Heart className="w-7 h-7 text-white" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                NeuraMed
              </span>
            </motion.a>
            <p className="text-slate-600 mb-6 leading-relaxed text-lg">
              Your AI-powered companion for emotional wellness. Heal, reflect, and grow with CereSukh.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={`w-11 h-11 rounded-full bg-slate-200 ${social.color} hover:text-white flex items-center justify-center transition-all shadow-md hover:shadow-lg`}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-bold text-slate-800 mb-5 text-lg">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <a
                    href={link.href}
                    className="text-slate-600 hover:text-purple-600 transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-purple-600 group-hover:w-4 transition-all mr-0 group-hover:mr-2" />
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-bold text-slate-800 mb-5 text-lg">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <a
                    href={link.href}
                    className="text-slate-600 hover:text-purple-600 transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-purple-600 group-hover:w-4 transition-all mr-0 group-hover:mr-2" />
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-bold text-slate-800 mb-5 text-lg">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <a
                    href={link.href}
                    className="text-slate-600 hover:text-purple-600 transition-colors inline-flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-purple-600 group-hover:w-4 transition-all mr-0 group-hover:mr-2" />
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Development Mode Notice */}
        <div className="border-t border-slate-300 pt-8 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 text-center"
          >
            <p className="text-sm font-semibold text-purple-700">
              🚀 Running on Localhost — Development Mode
            </p>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-300 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-center md:text-left">
            © 2025 NeuraMed | Powered by CereSukh AI. All rights reserved.
          </p>
          <p className="text-slate-500 flex items-center gap-2 text-center md:text-right">
            Made with{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.span>{" "}
            for your wellbeing
          </p>
        </div>
      </div>
    </footer>
  );
}
