import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import { useQuiz } from "../context/QuizContext.jsx";
import { get } from "../utils/storage.js";

function Results() {
	const { resetQuiz } = useQuiz();
	const history = Array.isArray(get("quiz_results", []))
		? get("quiz_results", [])
		: [];

	// Take the most recent result (first in array)
	const latest = history.length > 0 ? history[0] : null;

	const score = latest ? latest.score : 0;
	const total = latest ? latest.total : 0;
	const percent = latest ? latest.percent : 0;

	return (
		<div className="space-y-6">
			<Layout>
				<div className="text-center space-y-2">
					<h2 className="text-xl font-bold">Your Score</h2>
					<p className="text-4xl font-extrabold">
						{score} / {total}
					</p>
					<p className="text-slate-300">{percent}%</p>
					<div className="flex items-center justify-center gap-3 pt-3">
						<Link
							to="/quiz"
							onClick={resetQuiz}
							className="rounded-lg bg-emerald-600 hover:bg-emerald-500 px-4 py-2 font-medium"
						>
							Try Again
						</Link>
						<Link
							to="/"
							className="rounded-lg bg-slate-800 hover:bg-slate-700 px-4 py-2 font-medium"
						>
							Home
						</Link>
					</div>
				</div>
			</Layout>

			{latest && Array.isArray(latest.questions) && (
				<Layout>
					<h3 className="text-lg font-semibold mb-3">Your Answers</h3>
					<ul className="space-y-4">
						{latest.questions.map((q, i) => (
							<li key={q.id || i} className="space-y-2">
								<p className="font-medium">
									{i + 1}. {q.question || "Question not available"}
								</p>
								<div
									className={`p-3 rounded-lg border ${
										q.chosen === q.answer
											? "bg-emerald-500/10 border-emerald-500"
											: "bg-rose-500/10 border-rose-500"
									}`}
								>
									<p>
										Your Answer:{" "}
										<span className="font-semibold">
											{q.chosen || "Not Answered"}
										</span>
									</p>
									{q.chosen !== q.answer && (
										<p>
											Correct Answer:{" "}
											<span className="font-semibold">{q.answer || "N/A"}</span>
										</p>
									)}
								</div>
							</li>
						))}
					</ul>
				</Layout>
			)}

			<Layout>
				<h3 className="text-lg font-semibold mb-3">Past Results</h3>
				{!Array.isArray(history) || history.length === 0 ? (
					<p className="text-slate-400">No previous results yet.</p>
				) : (
					<ul className="space-y-2">
						{history.map((r, i) => (
							<li
								key={i}
								className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/40 px-3 py-2 text-sm"
							>
								<span className="text-slate-300">
									{r.date
										? new Date(r.date).toLocaleString()
										: "Date unavailable"}
								</span>
								<span className="font-medium">
									{r.score ?? 0}/{r.total ?? 0} ({r.percent ?? 0}%)
								</span>
							</li>
						))}
					</ul>
				)}
			</Layout>
		</div>
	);
}

export default Results;
