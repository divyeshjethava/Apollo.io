export default function Tabs({ active, setActive }) {
  const tabClass = (id) =>
    `px-4 py-2 cursor-pointer text-sm border-b-2 ${
      active === id
        ? "border-black text-black"
        : "border-transparent text-gray-600 hover:text-black"
    }`;

  return (
    <div className="flex gap-6 border-b border-gray-300 bg-white px-4 py-2 rounded-t-md">
      <div onClick={() => setActive("all")} className={tabClass("all")}>
        All Sequences
      </div>

      <div
        onClick={() => setActive("analytics")}
        className={tabClass("analytics")}
      >
        Analytics
      </div>

      <div
        onClick={() => setActive("diagnostics")}
        className={tabClass("diagnostics")}
      >
        Diagnostics
      </div>
    </div>
  );
}
