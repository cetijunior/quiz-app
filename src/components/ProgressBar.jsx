export default function ProgressBar({ value, max }) {
	const pct = max ? Math.min(100, Math.round((value / max) * 100)) : 0;
	return (
		<div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
			<div
				className="h-full bg-emerald-500 transition-[width] duration-300"
				style={{ width: `${pct}%` }}
			/>
		</div>
	);
}
