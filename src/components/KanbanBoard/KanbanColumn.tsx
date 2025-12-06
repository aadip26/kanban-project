import React, { useState } from "react";
import { Task, Column } from "./KanbanBoard";
import { KanbanCard } from "./KanbanCard";

type Props = {
  column: Column;
  tasks: Task[];
  onMoveCard: (taskId: string, fromColumnId: string, toColumnId: string, toIndex: number) => void;
};

export function KanbanColumn({ column, tasks, onMoveCard }: Props) {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragOver = (e: React.DragEvent, index: number | null) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, index: number | null) => {
    e.preventDefault();
    setDragOverIndex(null);
    const payload = e.dataTransfer?.getData("application/json");
    if (!payload) return;
    try {
      const { taskId, fromColumnId } = JSON.parse(payload) as { taskId: string; fromColumnId: string };
      const toIndex = index === null ? tasks.length : index;
      onMoveCard(taskId, fromColumnId, column.id, toIndex);
    } catch {
      return;
    }
  };

  return (
    <div
      role="region"
      aria-label={`${column.title} column`}
      style={{
        width: 280,
        minWidth: 220,
        padding: 12,
        background: "#f3f3f3",
        borderRadius: 8,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
      }}
    >
      <h3 style={{ margin: 0, marginBottom: 12 }}>{column.title}</h3>

      {/* top drop zone (before first) */}
      <div
        onDragOver={(e) => handleDragOver(e, 0)}
        onDrop={(e) => handleDrop(e, 0)}
        style={{ height: dragOverIndex === 0 ? 12 : 6, transition: "height 120ms" }}
      />

      {tasks.map((task, idx) => (
        <div key={task.id}>
          <KanbanCard task={task} columnId={column.id} />

          {/* drop zone after each card */}
          <div
            onDragOver={(e) => handleDragOver(e, idx + 1)}
            onDrop={(e) => handleDrop(e, idx + 1)}
            style={{
              height: dragOverIndex === idx + 1 ? 12 : 6,
              transition: "height 120ms"
            }}
          />
        </div>
      ))}

      {/* if column empty show empty message */}
      {tasks.length === 0 && (
        <div style={{ padding: 8, color: "#666", marginTop: 8 }}>No tasks</div>
      )}
    </div>
  );
}
