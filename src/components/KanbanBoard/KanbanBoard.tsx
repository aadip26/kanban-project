import React from "react";
import { KanbanColumn } from "./KanbanColumn";

export const KanbanBoard = () => {
  const columns = [
    { id: "todo", title: "To Do" },
    { id: "progress", title: "In Progress" },
    { id: "done", title: "Done" },
  ];

  return (
    <div style={{ display: "flex", gap: "16px", padding: "20px" }}>
      {columns.map((col) => (
        <KanbanColumn key={col.id} column={col} />
      ))}
    </div>
  );
};

export default KanbanBoard;
