import { Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";

export default function Home() {
	return (
		<Layout>
			<div className="text-center space-y-4">
				<h1 className="text-2xl font-bold">Welcome to Quizzer</h1>
				<p className="text-slate-300">
					Quick, mobile-friendly quizzes. Timed questions, instant feedback, and
					saved results.
				</p>
				<div className="flex items-center justify-center">
					<Link
						to="/quiz"
						className="mt-2 inline-flex items-center rounded-lg bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 font-medium"
					>
						Start Quiz
					</Link>
				</div>
			</div>
		</Layout>
	);
}
