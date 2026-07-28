export default function SectionHeading({ eyebrow, title, center = false }) {
  return (
    <div className={`mb-14 ${center ? "text-center" : ""}`}>
      <p className={`text-xs font-semibold tracking-widest uppercase
        text-indigo-600 dark:text-indigo-400 mb-3
        ${center ? "justify-center" : ""} flex items-center gap-2`}
        style={center ? { justifyContent: "center" } : {}}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
        {eyebrow}
      </p>
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight
        text-slate-900 dark:text-white leading-tight">
        {title}
      </h2>
      <div className={`mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500
        ${center ? "mx-auto" : ""}`} />
    </div>
  );
}
