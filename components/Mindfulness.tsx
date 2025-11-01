import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Wind, BookHeart, Sparkles, Save, Play, Pause } from "lucide-react";
import { useState } from "react";

export function Mindfulness() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [journalText, setJournalText] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const dailyQuote = {
    text: "In the midst of movement and chaos, keep stillness inside of you.",
    author: "Deepak Chopra",
  };

  const handleSaveJournal = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <section id="mindfulness" className="py-32 px-6 bg-gradient-to-b from-blue-50 via-green-50 to-teal-50 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-20 left-0 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], x: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

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
            className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full text-sm font-semibold mb-4"
          >
            🧘 Inner Peace & Reflection
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Mindfulness & Journaling
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Take a moment to breathe, reflect, and connect with your inner self.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Journaling Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white"
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg"
                whileHover={{ rotate: [0, -10, 10, 0] }}
              >
                <BookHeart className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800">Daily Journal</h3>
                <p className="text-sm text-slate-500">Express your thoughts freely</p>
              </div>
            </div>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              Express your thoughts and feelings. Writing helps process emotions and track your growth.
            </p>
            
            <Textarea
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              placeholder="What's on your mind today? How are you feeling?"
              className="min-h-56 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 focus:border-purple-400 rounded-2xl resize-none mb-4 text-base"
            />
            
            <div className="flex gap-3">
              <motion.div
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleSaveJournal}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full py-6"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {isSaved ? "Saved!" : "Save Entry"}
                </Button>
              </motion.div>
            </div>

            {/* Entry count */}
            <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
              <span>📝 {journalText.length} characters</span>
              <span>✍️ 23 entries this month</span>
            </div>
          </motion.div>

          {/* Breathing Exercise Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Breathing Animation */}
            <div className="bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white">
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                >
                  <Wind className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">Breathing Exercise</h3>
                  <p className="text-sm text-slate-600">4-7-8 Breathing Technique</p>
                </div>
              </div>
              
              <p className="text-slate-600 mb-8 leading-relaxed">
                Follow the circle. Breathe in as it expands, hold, then breathe out as it contracts.
              </p>
              
              <div className="flex flex-col items-center justify-center py-16 relative">
                {/* Outer ring */}
                <motion.div
                  className="absolute w-56 h-56 rounded-full border-4 border-emerald-300/30"
                  animate={isBreathing ? {
                    scale: [1, 1.3, 1.3, 1],
                    opacity: [0.3, 0.6, 0.6, 0.3],
                  } : {}}
                  transition={{
                    duration: 19,
                    repeat: isBreathing ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Main breathing circle */}
                <motion.div
                  className="w-40 h-40 rounded-full bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 shadow-2xl flex items-center justify-center"
                  animate={isBreathing ? {
                    scale: [1, 1.5, 1.5, 1],
                  } : { scale: 1 }}
                  transition={{
                    duration: 19,
                    repeat: isBreathing ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                >
                  <motion.p
                    className="text-white font-bold text-xl"
                    animate={isBreathing ? {
                      opacity: [1, 1, 0, 1],
                    } : {}}
                    transition={{
                      duration: 19,
                      repeat: isBreathing ? Infinity : 0,
                      times: [0, 0.21, 0.58, 1],
                    }}
                  >
                    {isBreathing ? "Breathe" : "Ready"}
                  </motion.p>
                </motion.div>

                {/* Instruction text */}
                <motion.p
                  className="mt-8 text-slate-700 font-medium text-lg"
                  animate={isBreathing ? {
                    opacity: [1, 1, 1, 1],
                  } : {}}
                >
                  {isBreathing ? (
                    <motion.span
                      animate={{
                        opacity: [1, 1, 0, 0, 1],
                      }}
                      transition={{
                        duration: 19,
                        repeat: Infinity,
                        times: [0, 0.21, 0.21, 0.58, 1],
                      }}
                    >
                      Inhale 4s • Hold 7s • Exhale 8s
                    </motion.span>
                  ) : (
                    "Click to begin"
                  )}
                </motion.p>
              </div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => setIsBreathing(!isBreathing)}
                  variant="outline"
                  className="w-full rounded-full border-2 border-emerald-300 hover:bg-emerald-50 py-6"
                >
                  {isBreathing ? (
                    <>
                      <Pause className="w-5 h-5 mr-2" />
                      Pause Breathing
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Start Breathing
                    </>
                  )}
                </Button>
              </motion.div>
            </div>

            {/* Daily Quote */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white relative overflow-hidden"
            >
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <Sparkles className="absolute top-4 right-4 w-6 h-6 text-purple-400" />
              
              <h4 className="text-lg font-semibold text-purple-700 mb-4 flex items-center gap-2">
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨
                </motion.span>
                Daily Inspiration
              </h4>
              
              <p className="text-2xl text-slate-800 italic mb-4 leading-relaxed font-serif">
                "{dailyQuote.text}"
              </p>
              
              <p className="text-slate-600 font-medium">— {dailyQuote.author}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
