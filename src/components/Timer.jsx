import { useEffect, useState } from "react";

export default function Timer({ seconds = 15, onExpire, keyProp }) {
	const [time, setTime] = useState(seconds);

	useEffect(() => setTime(seconds), [seconds, keyProp]);

	useEffect(() => {
		if (time <= 0) {
			onExpire?.();
			return;
		}
		const id = setTimeout(() => setTime((t) => t - 1), 1000);
		return () => clearTimeout(id);
	}, [time, onExpire]);

	const pct = Math.max(0, Math.round((time / seconds) * 100));

	return (
		<div className="flex items-center justify-between gap-3">
			<div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
				<div
					className="h-full bg-fuchsia-500 transition-[width] duration-1000"
					style={{ width: `${pct}%` }}
				/>
			</div>
			<div className="w-10 text-right tabular-nums text-sm text-slate-300">
				{time}s
			</div>
		</div>
	);
}
