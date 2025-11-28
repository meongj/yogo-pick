import { toast, useToaster } from "react-hot-toast";

export function Toaster() {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause } = handlers;

  const getToastStyle = (type: string) => {
    switch (type) {
      case "success":
        return "border-green-600 text-green-600 shadow-[4px_4px_0px_#16a34a]";
      case "error":
        return "border-red-600 text-red-600 shadow-[4px_4px_0px_#dc2626]";
      case "loading":
        return "border-blue-600 text-blue-600 shadow-[4px_4px_0px_#2563eb]";
      default:
        return "border-purple-600 text-purple-600 shadow-[4px_4px_0px_#9333ea]";
    }
  };

  const getEmoji = (type: string) => {
    switch (type) {
      case "success":
        return "✨";
      case "error":
        return "🥺";
      case "loading":
        return "⏳";
      default:
        return "💭";
    }
  };

  return (
    <div className="fixed top-4 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-4" onMouseEnter={startPause} onMouseLeave={endPause} aria-live="polite" role="status">
      {toasts
        .filter((t) => t.visible)
        .map((t) => (
          <div
            key={t.id}
            className={`mb-3 flex items-center justify-center gap-3 border-4 bg-white px-8 py-3 transition-all duration-150 ease-in-out hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px] ${getToastStyle(t.type)}`}
          >
            <span className="text-xl">{getEmoji(t.type)}</span>
            <span className="font-bold">{String(t.message)}</span>
          </div>
        ))}
    </div>
  );
}

export { toast };
