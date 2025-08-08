import Layout from "../components/Layout.jsx";
import QuestionCard from "../components/QuestionCard.jsx";
import { useQuiz } from "../context/QuizContext.jsx";

export default function Quiz() {
	const { current } = useQuiz();

	if (!current) {
		return (
			<Layout>
				<p>Loading questions…</p>
			</Layout>
		);
	}

	return (
		<Layout>
			<QuestionCard />
		</Layout>
	);
}
