import { motion } from "motion/react";
import { Heart, Sparkles, Shield, Users, Zap, Globe } from "lucide-react";

export function About() {
  const values = [
    {
      icon: Heart,
      title: "Compassion First",
      description: "Every interaction is designed with empathy, understanding, and non-judgment at its core.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Privacy & Safety",
      description: "Your data is encrypted and secure. We never share your personal information without consent.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Globe,
      title: "Accessible to All",
      description: "Mental health support should be available anytime, anywhere, for everyone who needs it.",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Happy Users" },
    { icon: Zap, value: "1M+", label: "Sessions Completed" },
    { icon: Heart, value: "95%", label: "Satisfaction Rate" },
  ];

  return (
    <section id="about" className="py-32 px-6 bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute -bottom-40 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 30, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
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
            💜 Our Story
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            About NeuraMed
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Empowering emotional wellness through compassionate AI and community support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-bold text-slate-800 mb-6">
              Our Mission
            </h3>
            <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
              <p>
                NeuraMed was created with a simple yet powerful vision: to make emotional wellness 
                accessible to everyone, everywhere. We believe that mental health support shouldn't 
                be a luxury, but a fundamental right.
              </p>
              <p>
                Through our AI companion{" "}
                <span className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  CereSukh
                </span>
                , we provide 24/7 empathetic support, combining cutting-edge technology with evidence-based 
                therapeutic approaches. CereSukh is designed to listen, understand, and guide you 
                through difficult moments with compassion and wisdom.
              </p>
              <p>
                But we're more than just an AI. NeuraMed is a holistic wellness platform that brings 
                together journaling, mindfulness, peer support, professional therapy, and curated 
                resources—all in one calming, user-friendly space.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center shadow-lg"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 rounded-3xl p-1 shadow-2xl">
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 flex items-center justify-center shadow-xl"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(168, 85, 247, 0.3)",
                        "0 0 40px rgba(168, 85, 247, 0.6)",
                        "0 0 20px rgba(168, 85, 247, 0.3)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-10 h-10 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="text-2xl font-bold text-slate-800">CereSukh</h4>
                    <p className="text-sm text-slate-600">Your AI Companion</p>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-4 relative"
                >
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-purple-50 to-pink-50 rotate-45" />
                  <p className="text-slate-700 italic leading-relaxed">
                    "I'm here to listen and support you. How are you feeling today? Remember, it's okay to not be okay sometimes. Let's work through this together."
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 text-right relative ml-8"
                >
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-blue-50 to-cyan-50 rotate-45" />
                  <p className="text-slate-700 italic leading-relaxed">
                    "Thank you for being here. I feel safe talking to you. You really understand what I'm going through."
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl font-bold text-slate-800 mb-12 text-center">
            What We Stand For
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-white text-center group"
              >
                <motion.div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mx-auto mb-6 shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                >
                  <value.icon className="w-10 h-10 text-white" />
                </motion.div>
                <h4 className="text-2xl font-bold text-slate-800 mb-4">
                  {value.title}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
