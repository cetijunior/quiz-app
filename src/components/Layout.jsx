export default function Layout({ children }) {
	return (
		<div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 shadow-lg">
			{children}
		</div>
	);
}
