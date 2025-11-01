import { motion } from "motion/react";
import {
  MessageCircleHeart,
  BookOpen,
  Wind,
  ShoppingBag,
  Gamepad2,
  Users,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";

const features = [
  {
    icon: MessageCircleHeart,
    title: "CereSukh AI Chatbot",
    description: "Talk to your empathetic AI companion anytime, anywhere. Get support when you need it most.",
    color: "from-purple-500 to-pink-500",
    gradient: "from-purple-50 to-pink-50",
  },
  {
    icon: BookOpen,
    title: "Journaling & Habit Tracking",
    description: "Track your thoughts, emotions, and daily habits. Build positive routines for lasting wellness.",
    color: "from-blue-500 to-cyan-500",
    gradient: "from-blue-50 to-cyan-50",
  },
  {
    icon: Wind,
    title: "Mindfulness & Breathing",
    description: "Guided breathing exercises and daily inspirational quotes to center your mind.",
    color: "from-emerald-500 to-teal-500",
    gradient: "from-emerald-50 to-teal-50",
  },
  {
    icon: ShoppingBag,
    title: "Stress-Free Shop",
    description: "Discover wellness products, from stress toys to yoga mats and self-help resources.",
    color: "from-pink-500 to-rose-500",
    gradient: "from-pink-50 to-rose-50",
  },
  {
    icon: Gamepad2,
    title: "Games & Mood Tracker",
    description: "Play relaxing games and track your mood patterns to understand yourself better.",
    color: "from-indigo-500 to-purple-500",
    gradient: "from-indigo-50 to-purple-50",
  },
  {
    icon: Users,
    title: "Peer & Therapist Support",
    description: "Connect with support groups or schedule sessions with professional therapists.",
    color: "from-teal-500 to-cyan-500",
    gradient: "from-teal-50 to-cyan-50",
  },
];

export function Features() {
  return (
    <section id="features" className="py-32 px-6 bg-gradient-to-b from-pink-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-semibold mb-4"
          >
            ✨ Comprehensive Wellness Tools
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Everything You Need to Thrive
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive tools designed to support your emotional wellness journey, all in one beautiful platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-white h-full">
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-slate-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Learn More Link */}
                <motion.button
                  className="inline-flex items-center gap-2 text-purple-600 font-semibold group/btn"
                  whileHover={{ x: 5 }}
                >
                  Explore
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white rounded-full px-10 py-7 text-lg shadow-2xl shadow-purple-500/30"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
