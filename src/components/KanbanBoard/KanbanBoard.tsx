import React, { useState, useCallback } from "react";
import { KanbanColumn } from "./KanbanColumn";

export type Task = {
  id: string;
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high" | "urgent";
};

export type Column = {
  id: string;
  title: string;
  taskIds: string[];
};

const initialTasks: Record<string, Task> = {
  "1": { id: "1", title: "Sample Task A" },
  "2": { id: "2", title: "Sample Task B" },
  "3": { id: "3", title: "Sample Task C" }
};

const initialColumns: Column[] = [
  { id: "todo", title: "To Do", taskIds: ["1"] },
  { id: "inprogress", title: "In Progress", taskIds: ["2"] },
  { id: "done", title: "Done", taskIds: ["3"] }
];

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Record<string, Task>>(initialTasks);
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  const moveCard = useCallback(
    (taskId: string, fromColumnId: string, toColumnId: string, toIndex: number) => {
      setColumns((prev) => {
        // clone
        const clone = prev.map((c) => ({ ...c, taskIds: [...c.taskIds] }));
        const fromCol = clone.find((c) => c.id === fromColumnId);
        const toCol = clone.find((c) => c.id === toColumnId);
        if (!fromCol || !toCol) return prev;

        // remove from source
        const srcIndex = fromCol.taskIds.indexOf(taskId);
        if (srcIndex === -1) return prev;
        fromCol.taskIds.splice(srcIndex, 1);

        // insert into destination at toIndex
        if (toIndex < 0 || toIndex > toCol.taskIds.length) {
          toCol.taskIds.push(taskId);
        } else {
          toCol.taskIds.splice(toIndex, 0, taskId);
        }

        return clone;
      });
    },
    []
  );

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start", overflowX: "auto" }}>
        {columns.map((col) => (
          <KanbanColumn
            key={col.id}
            column={col}
            tasks={col.taskIds.map((id) => tasks[id])}
            onMoveCard={moveCard}
          />
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
