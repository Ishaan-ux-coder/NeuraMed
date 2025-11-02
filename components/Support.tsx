import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Users, Video, UserCheck, Calendar, Clock, ArrowRight, Shield } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link } from "react-router-dom";

const peerGroups = [
	{
		name: "Anxiety Support Circle",
		members: 24,
		nextSession: "Today, 6:00 PM",
		color: "from-purple-500 to-pink-500",
		online: 8,
	},
	{
		name: "Mindful Living Group",
		members: 18,
		nextSession: "Tomorrow, 3:00 PM",
		color: "from-blue-500 to-cyan-500",
		online: 5,
	},
	{
		name: "Stress Management",
		members: 31,
		nextSession: "Friday, 7:00 PM",
		color: "from-emerald-500 to-teal-500",
		online: 12,
	},
	{
		name: "Young Adults Wellness",
		members: 22,
		nextSession: "Saturday, 4:00 PM",
		color: "from-pink-500 to-rose-500",
		online: 6,
	},
];

export function Support() {
	return (
		<section id="support" className="py-32 px-6 bg-gradient-to-b from-purple-50 via-white to-blue-50 relative overflow-hidden">
			{/* Background decoration */}
			<motion.div
				className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"
				animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
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
						className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-4"
					>
						🤝 Community & Professional Care
					</motion.span>
					<h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
						Peer & Therapist Support
					</h2>
					<p className="text-xl text-slate-600 max-w-3xl mx-auto">
						You're not alone. Connect with others who understand, or speak with professional therapists.
					</p>
				</motion.div>

				{/* Professional Support Section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="mb-16"
				>
					<div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-0">
							<div className="p-10 md:p-14 flex flex-col justify-center relative">
								{/* Trust badge */}
								<motion.div
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.3 }}
									viewport={{ once: true }}
									className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-blue-700 mb-6 w-fit"
								>
									<Shield className="w-4 h-4" />
									Licensed Professionals
								</motion.div>

								<h3 className="text-4xl font-bold text-slate-800 mb-4">
									Talk to a Professional
								</h3>
								<p className="text-lg text-slate-600 mb-8 leading-relaxed">
									Our licensed therapists are here to provide confidential, compassionate support.
									Schedule a video session or connect with someone who can help.
								</p>

								{/* Stats */}
								<div className="grid grid-cols-2 gap-4 mb-8">
									<div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
										<p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
											200+
										</p>
										<p className="text-sm text-slate-600">Therapists</p>
									</div>
									<div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
										<p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
											4.9★
										</p>
										<p className="text-sm text-slate-600">Avg Rating</p>
									</div>
								</div>

								<div className="flex flex-col sm:flex-row gap-4">
									<motion.div
										className="flex-1"
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										<Link to="/support/video-call" className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition">
											<Video className="w-5 h-5 mr-2" />
											Schedule Session
										</Link>
									</motion.div>
									<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
										<Button
											variant="outline"
											className="rounded-full border-2 border-purple-300 hover:bg-white/80 py-6 px-6"
										>
											<Calendar className="w-5 h-5 mr-2" />
											View Available
										</Button>
									</motion.div>
								</div>
							</div>

							<div className="relative h-96 md:h-auto">
								<ImageWithFallback
									src="https://images.unsplash.com/photo-1758273240360-76b908e7582a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVyYXB5JTIwY291bnNlbGluZyUyMHN1cHBvcnR8ZW58MXx8fHwxNzYxODQ5ODMyfDA&ixlib=rb-4.1.0&q=80&w=1080"
									alt="Professional support"
									className="w-full h-full object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent" />
							</div>
						</div>
					</div>
				</motion.div>

				{/* Peer Support Groups */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
				>
					<h3 className="text-4xl font-bold text-slate-800 mb-10 text-center">
						Join a Peer Support Group
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{peerGroups.map((group, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								viewport={{ once: true }}
								whileHover={{ y: -5 }}
								className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all border border-white"
							>
								<div className="flex items-start gap-4 mb-5">
									<motion.div
										className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${group.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
										whileHover={{ rotate: [0, -10, 10, 0] }}
									>
										<Users className="w-8 h-8 text-white" />
									</motion.div>

									<div className="flex-grow">
										<h4 className="text-xl font-bold text-slate-800 mb-2">
											{group.name}
										</h4>
										<div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
											<div className="flex items-center gap-1">
												<UserCheck className="w-4 h-4" />
												<span>{group.members} members</span>
											</div>
											<div className="flex items-center gap-1">
												<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
												<span className="text-green-600 font-semibold">{group.online} online</span>
											</div>
										</div>
									</div>
								</div>

								{/* Next session */}
								<div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-4">
									<div className="flex items-center gap-2 text-sm text-slate-600">
										<Clock className="w-4 h-4 text-purple-600" />
										<span className="font-medium">Next session:</span>
										<span className="font-bold text-purple-700">{group.nextSession}</span>
									</div>
								</div>

								{group.name === "Anxiety Support Circle" ? (
									<Link
										to="/support/peer/anxiety"
										className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
									>
										Join Group
									</Link>
								) : group.name === "Mindful Living Group" ? (
									<Link
										to="/support/peer/mindful-living"
										className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
									>
										Join Group
									</Link>
								) : group.name === "Stress Management" ? (
									<Link
										to="/support/peer/stress-management"
										className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
									>
										Join Group
									</Link>
								) : group.name === "Young Adults Wellness" ? (
									<Link
										to="/support/peer/young-adults"
										className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
									>
										Join Group
									</Link>
								) : (
									<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
										<Button
											variant="outline"
											className="w-full rounded-full border-2 border-purple-300 hover:bg-purple-50 py-6"
										>
											Join Group
											<ArrowRight className="w-4 h-4 ml-2" />
										</Button>
									</motion.div>
								)}
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* 1-on-1 Peer Call Option */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="mt-16 bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white text-center relative overflow-hidden"
				>
					<motion.div
						className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"
						animate={{ scale: [1, 1.2, 1] }}
						transition={{ duration: 5, repeat: Infinity }}
					/>

					<h3 className="text-3xl font-bold text-slate-800 mb-4 relative z-10">
						Need someone to talk to right now?
					</h3>
					<p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto relative z-10">
						Connect with a peer supporter for a one-on-one conversation. Sometimes just talking helps.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Link to="/support/peer-quick/anxiety" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700">
								Start Peer Call Now
							</Link>
						</motion.div>
						<p className="text-sm text-slate-500">
							<span className="inline-flex items-center gap-1">
								<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
								14 supporters online
							</span>
						</p>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
