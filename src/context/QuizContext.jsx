import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { QUESTIONS } from "../data/questions";
import { shuffle } from "../utils/shuffle";
import { get, set } from "../utils/storage";

const QuizContext = createContext();

// ... other code in QuizContext.jsx

function finishQuiz() {
	const newScore = questions.reduce((acc, q) => {
		const chosenAnswer = answers[q.id];
		if (chosenAnswer === q.answer) {
			return acc + 1;
		}
		return acc;
	}, 0);

	const detailedQuestions = questions.map((q) => ({
		...q,
		chosen: answers[q.id] || null,
	}));

	const newResult = {
		score: newScore,
		total: questions.length,
		percent: Math.round((newScore / questions.length) * 100),
		date: new Date().toISOString(),
		questions: detailedQuestions, // This is the new part
	};

	const updatedHistory = [newResult, ...get("quiz_results", [])];
	set("quiz_results", updatedHistory);

	// Set state or navigate to results page here
	// For example, setQuizState({ ...quizState, status: 'finished', result: newResult });
}

// ... other code in QuizContext.jsx

export function QuizProvider({ children }) {
	const [questions, setQuestions] = useState([]);
	const [idx, setIdx] = useState(0);
	const [score, setScore] = useState(0);
	const [answers, setAnswers] = useState({});
	const [timerKey, setTimerKey] = useState(0); // force Timer reset per question

	// init on mount (shuffle)
	useEffect(() => {
		const qs = shuffle(QUESTIONS).map((q) => ({
			...q,
			options: shuffle(q.options),
		}));
		setQuestions(qs);
		setIdx(0);
		setScore(0);
		setAnswers({});
		setTimerKey((k) => k + 1);
	}, []);

	const current = questions[idx];
	const total = questions.length;

	function selectOption(option) {
		if (!current) return;
		if (answers[current.id]) return; // prevent double answer

		const correct = option === current.answer;
		setAnswers((prev) => ({ ...prev, [current.id]: option }));
		if (correct) setScore((s) => s + 1);
	}

	function nextQuestion() {
		if (idx + 1 < total) {
			setIdx((i) => i + 1);
			setTimerKey((k) => k + 1);
		}
	}

	function finishQuiz() {
		// store last result
		const results = get("quiz_results", []);
		const record = {
			date: new Date().toISOString(),
			score,
			total,
			percent: Math.round((score / total) * 100),
		};
		set("quiz_results", [record, ...results].slice(0, 20));
	}

	function resetQuiz() {
		const qs = shuffle(QUESTIONS).map((q) => ({
			...q,
			options: shuffle(q.options),
		}));
		setQuestions(qs);
		setIdx(0);
		setScore(0);
		setAnswers({});
		setTimerKey((k) => k + 1);
	}

	const value = useMemo(
		() => ({
			current,
			idx,
			total,
			score,
			answers,
			selectOption,
			nextQuestion,
			finishQuiz,
			resetQuiz,
			timerKey,
		}),
		[current, idx, total, score, answers, timerKey]
	);

	return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export const useQuiz = () => useContext(QuizContext);
