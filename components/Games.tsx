import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Play, Smile, Brain, Heart, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FallbackImg: React.FC<React.ImgHTMLAttributes<HTMLImageElement> & { fallbackSrc?: string }> = ({
	fallbackSrc = "https://placehold.co/800x400?text=Image",
	onError,
	...props
}) => {
	const [errored, setErrored] = useState(false);
	return (
		<img
			{...props}
			onError={(e) => {
				if (!errored) {
					setErrored(true);
					(e.currentTarget as HTMLImageElement).src = fallbackSrc!;
				}
				if (onError) onError(e);
			}}
		/>
	);
};

const games = [
	{
		title: "Sweet Candy Match",
		description: "Match candies, score points, relax and enjoy!",
		icon: Brain,
		color: "from-purple-500 to-pink-500",
		image:
			"https://images.unsplash.com/photo-1701588362547-001aaf022089?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW5keSUyMGNvbnl8ZW58MXx8fHwxNzYxODUwMDAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
		players: "12K",
		href: "/games/candy-match",
	},
	{
		title: "Heal the Depressed Avatar",
		description: "Choose wisely to lift the avatar’s mood and win!",
		icon: Heart,
		color: "from-emerald-500 to-teal-500",
		image:
			"https://images.unsplash.com/photo-1687436874174-977fdd9e2cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NjE3ODcxMDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
		players: "9K",
		href: "/games/heal-avatar",
	},
	{
		title: "Word Puzzle Game",
		description: "Pick letters to solve fun word riddles!",
		icon: Smile,
		color: "from-blue-500 to-cyan-500",
		image:
			"https://images.unsplash.com/photo-1529070538774-1843cb3265df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JkJTIwcHV6emxlfGVufDF8fHx8MTc2MTg1MDAwMHww&ixlib=rb-4.1.0&q=80&w=1080",
		players: "15K",
		href: "/games/word-puzzle",
	},
];

const moodStats = [
	{
		emoji: "😊",
		label: "Happy",
		count: 12,
		color: "from-yellow-400 to-orange-400",
		bgColor: "from-yellow-100 to-orange-100",
	},
	{
		emoji: "😌",
		label: "Calm",
		count: 18,
		color: "from-emerald-400 to-teal-400",
		bgColor: "from-emerald-100 to-teal-100",
	},
	{
		emoji: "😔",
		label: "Sad",
		count: 5,
		color: "from-blue-400 to-cyan-400",
		bgColor: "from-blue-100 to-cyan-100",
	},
	{
		emoji: "😰",
		label: "Anxious",
		count: 7,
		color: "from-purple-400 to-pink-400",
		bgColor: "from-purple-100 to-pink-100",
	},
];

export function Games() {
	return (
		<section
			id="games"
			className="py-32 px-6 bg-gradient-to-b from-teal-50 via-white to-purple-50 relative overflow-hidden"
		>
			{/* Background decoration */}
			<motion.div
				className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl"
				animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
				transition={{ duration: 30, repeat: Infinity }}
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
						className="inline-block px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-semibold mb-4"
					>
						🎮 Interactive Wellness
					</motion.span>
					<h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
						Games & Mood Tracker
					</h2>
					<p className="text-xl text-slate-600 max-w-3xl mx-auto">
						Relax through interactive games and understand your emotions better
						with mood tracking.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
					{games.map((game, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							viewport={{ once: true }}
							whileHover={{ y: -10 }}
							className="group"
						>
							<div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-purple-100">
								<div className="relative h-56 overflow-hidden">
									<FallbackImg
										src={game.image}
										alt={game.title}
										className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

									{/* Icon Badge */}
									<motion.div
										className={`absolute top-4 left-4 w-14 h-14 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center shadow-xl`}
										whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
									>
										<game.icon className="w-7 h-7 text-white" />
									</motion.div>

									{/* Players count */}
									<div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
										<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
										<span className="text-xs font-semibold text-slate-700">
											{game.players} players
										</span>
									</div>
								</div>

								<div className="p-6">
									<h3 className="text-2xl font-bold text-slate-800 mb-2">
										{game.title}
									</h3>
									<p className="text-slate-600 mb-6">
										{game.description}
									</p>
									<motion.div
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										<Link
											to={game.href}
											className="w-full inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full py-6 group/btn"
										>
											<Play className="w-5 h-5 mr-2 group-hover/btn:scale-110 transition-transform" />
											Play Now
										</Link>
									</motion.div>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* Mood Stats Section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white"
				>
					<div className="flex items-center justify-between mb-8">
						<div>
							<h3 className="text-3xl font-bold text-slate-800 mb-2">
								Your Mood This Week
							</h3>
							<p className="text-slate-600 flex items-center gap-2">
								<TrendingUp className="w-5 h-5 text-emerald-500" />
								Your wellness is improving by 23%
							</p>
						</div>
						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Button
								variant="outline"
								className="rounded-full border-2 border-purple-300 hover:bg-purple-50"
							>
								View Analytics
								<ArrowRight className="w-4 h-4 ml-2" />
							</Button>
						</motion.div>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
						{moodStats.map((mood, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, scale: 0.8 }}
								whileInView={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.4, delay: index * 0.1 }}
								viewport={{ once: true }}
								whileHover={{ scale: 1.05, y: -5 }}
								className="group cursor-pointer"
							>
								<div
									className={`bg-gradient-to-br ${mood.bgColor} rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all border border-white relative overflow-hidden`}
								>
									{/* Animated background */}
									<motion.div
										className={`absolute inset-0 bg-gradient-to-br ${mood.color} opacity-0 group-hover:opacity-10 transition-opacity`}
									/>

									<motion.div
										className="text-6xl mb-3"
										whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
									>
										{mood.emoji}
									</motion.div>

									<p className="text-lg font-semibold text-slate-800 mb-1">
										{mood.label}
									</p>

									<motion.p
										className={`text-4xl font-bold bg-gradient-to-r ${mood.color} bg-clip-text text-transparent mb-1`}
										whileHover={{ scale: 1.1 }}
									>
										{mood.count}
									</motion.p>

									<p className="text-sm text-slate-600">times</p>
								</div>
							</motion.div>
						))}
					</div>

					{/* Weekly insight */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						viewport={{ once: true }}
						className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200"
					>
						<p className="text-slate-700 text-center">
							<span className="font-semibold">💡 Insight:</span> You're feeling
							most calm on Tuesday and Wednesday. Try scheduling important tasks
							during these peak wellness days!
						</p>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
