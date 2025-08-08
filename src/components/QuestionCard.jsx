import { useMemo } from "react";
import Timer from "./Timer.jsx";
import ProgressBar from "./ProgressBar.jsx";
import { useQuiz } from "../context/QuizContext.jsx";

export default function QuestionCard() {
	const {
		current,
		idx,
		total,
		selectOption,
		answers,
		nextQuestion,
		finishQuiz,
		timerKey,
	} = useQuiz();

	const answered = useMemo(
		() => current && answers[current.id],
		[answers, current]
	);
	const isLast = idx + 1 === total;

	if (!current) return null;

	function handleExpire() {
		// move on if time runs out (count as incorrect)
		if (!answered) {
			// mark as unanswered (no score change)
		}
		isLast ? finishQuiz() : nextQuestion();
	}

	return (
		<div className="space-y-5">
			<div className="flex items-center gap-3">
				<span className="text-xs text-slate-400">
					Question {idx + 1} / {total}
				</span>
				<div className="flex-1">
					<ProgressBar value={idx} max={total - 1} />
				</div>
			</div>

			<div className="rounded-xl border border-slate-800 p-4 bg-slate-900/40">
				<h2 className="text-lg font-semibold">{current.question}</h2>
			</div>

			<div className="grid gap-3">
				{current.options.map((opt) => {
					const chosen = answered === opt;
					const correct = answered && opt === current.answer;
					const wrong = chosen && !correct;

					return (
						<button
							key={opt}
							onClick={() => selectOption(opt)}
							disabled={Boolean(answered)}
							className={[
								"w-full text-left rounded-xl border p-3 transition",
								"border-slate-800 bg-slate-900/40 hover:bg-slate-900",
								chosen && "ring-2 ring-slate-500",
								correct && "border-emerald-500 bg-emerald-500/10",
								wrong && "border-rose-500 bg-rose-500/10",
								answered && "cursor-default",
							]
								.filter(Boolean)
								.join(" ")}
						>
							{opt}
						</button>
					);
				})}
			</div>

			<Timer
				seconds={current.timeLimit ?? 15}
				onExpire={handleExpire}
				keyProp={timerKey}
			/>

			<div className="flex justify-end">
				{isLast ? (
					<a
						href="/results"
						onClick={finishQuiz}
						className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-sm font-medium"
					>
						Finish
					</a>
				) : (
					<button
						onClick={nextQuestion}
						className="inline-flex items-center gap-2 rounded-lg bg-slate-800 hover:bg-slate-700 px-4 py-2 text-sm font-medium"
					>
						Next
					</button>
				)}
			</div>
		</div>
	);
}
