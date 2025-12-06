import React, { useState } from "react";
import { KanbanCard } from "./KanbanCard";

interface ColumnProps {
  column: {
    id: string;
    title: string;
  };
}

export const KanbanColumn: React.FC<ColumnProps> = ({ column }) => {
  const [cards, setCards] = useState([
    { id: 1, title: "Sample Task" }
  ]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.dataTransfer.getData("text/plain");
    if (!text) return;

    setCards((prev) => [...prev, { id: Date.now(), title: text }]);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      style={{
        width: "250px",
        padding: "10px",
        background: "#f1f1f1",
        borderRadius: "8px",
      }}
    >
      <h3>{column.title}</h3>

      {cards.map((card) => (
        <KanbanCard key={card.id} card={card} />
      ))}
    </div>
  );
};
