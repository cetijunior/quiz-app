import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Quiz from "./pages/Quiz.jsx";
import Results from "./pages/Results.jsx";
import { QuizProvider } from "./context/QuizContext.jsx";

export default function App() {
	return (
		<QuizProvider>
			<div className="min-h-dvh bg-slate-950 text-slate-100">
				<header className="sticky top-0 z-10 bg-slate-900/70 backdrop-blur border-b border-slate-800">
					<nav className="mx-auto max-w-xl px-4 py-3 flex items-center justify-between">
						<NavLink to="/" className="font-semibold tracking-tight">
							Quizzer
						</NavLink>
						<div className="flex gap-4 text-sm">
							<NavLink
								to="/"
								className={({ isActive }) =>
									isActive ? "text-white" : "text-slate-300"
								}
							>
								Home
							</NavLink>
							<NavLink
								to="/quiz"
								className={({ isActive }) =>
									isActive ? "text-white" : "text-slate-300"
								}
							>
								Start
							</NavLink>
							<NavLink
								to="/results"
								className={({ isActive }) =>
									isActive ? "text-white" : "text-slate-300"
								}
							>
								Results
							</NavLink>
						</div>
					</nav>
				</header>

				<main className="mx-auto max-w-xl px-4 py-6">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/quiz" element={<Quiz />} />
						<Route path="/results" element={<Results />} />
					</Routes>
				</main>
			</div>
		</QuizProvider>
	);
}
