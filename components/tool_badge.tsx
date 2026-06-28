type Props = {
  tool: string;
};

const TOOL_LABELS: Record<string, { label: string; color: string }> = {
  get_channel_stats: {
    label: "Channel stats",
    color: "bg-blue-900/60 text-blue-300 border-blue-700",
  },
  get_top_videos: {
    label: "Top videos",
    color: "bg-purple-900/60 text-purple-300 border-purple-700",
  },
  compare_channels: {
    label: "Compare channels",
    color: "bg-teal-900/60 text-teal-300 border-teal-700",
  },
  list_tracked_channels: {
    label: "List channels",
    color: "bg-amber-900/60 text-amber-300 border-amber-700",
  },
};

export default function tool_badge({ tool }: Props) {
  const config = TOOL_LABELS[tool] || {
    label: tool.replace(/_/g, " "),
    color: "bg-gray-800 text-gray-400 border-gray-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${config.color}`}
    >
      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      {config.label}
    </span>
  );
}
