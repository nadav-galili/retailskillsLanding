export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[80%]">
        <div className="bg-surface-card rounded-2xl rounded-br-sm px-4 py-3 flex items-center gap-1">
          <span className="typing-dot w-2 h-2 rounded-full bg-text-secondary inline-block mx-0.5" />
          <span className="typing-dot w-2 h-2 rounded-full bg-text-secondary inline-block mx-0.5" />
          <span className="typing-dot w-2 h-2 rounded-full bg-text-secondary inline-block mx-0.5" />
        </div>
      </div>
    </div>
  );
}
