export default function Tabs({ active, setActive }) {
  const tabClass = (id) =>
    `px-4 py-2 cursor-pointer text-sm border-b-2 ${
      active === id
        ? "border-black text-black font-medium"
        : "border-transparent text-gray-500 hover:text-black"
    }`;

  return (
    <div className="flex gap-6 border-b border-gray-200">
      <div onClick={() => setActive("all")} className={tabClass("all")}>
        All emails
      </div>
      <div
        onClick={() => setActive("templates")}
        className={tabClass("templates")}
      >
        Templates
      </div>
      <div
        onClick={() => setActive("analytics")}
        className={tabClass("analytics")}
      >
        Analytics
      </div>
    </div>
  );
}
