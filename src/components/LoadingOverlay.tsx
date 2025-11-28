import { Spinner } from "./Spinner";

export function LoadingOverlay({ text }: { text: string }) {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50">
      <div className="flex flex-col items-center gap-4">
        <Spinner className="h-24 w-24 text-white" />
        <p className="text-xl font-bold text-white">{text}</p>
      </div>
    </div>
  );
}
