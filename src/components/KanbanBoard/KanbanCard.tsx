import React from "react";
import { Task } from "./KanbanBoard";

type Props = {
  task: Task;
  columnId: string;
};

export function KanbanCard({ task, columnId }: Props) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (!e.dataTransfer) return;
    const payload = JSON.stringify({ taskId: task.id, fromColumnId: columnId });
    // use a custom mime type for clarity
    e.dataTransfer.setData("application/json", payload);
    // show copy/move cursor
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      tabIndex={0}
      role="button"
      aria-label={`Task: ${task.title}`}
      style={{
        background: "white",
        padding: 10,
        marginBottom: 6,
        borderRadius: 6,
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        cursor: "grab"
      }}
    >
      <div style={{ fontWeight: 600 }}>{task.title}</div>
      {task.description && <div style={{ fontSize: 13, color: "#444" }}>{task.description}</div>}
    </div>
  );
}
