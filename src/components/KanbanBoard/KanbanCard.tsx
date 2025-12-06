import React from "react";

interface CardProps {
  card: {
    id: number;
    title: string;
  };
}

export function KanbanCard({ card }: CardProps) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    // Safe check (fixes red underline)
    if (e.dataTransfer) {
      e.dataTransfer.setData("text/plain", card.title);
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{
        background: "white",
        padding: "10px",
        margin: "8px 0",
        borderRadius: "6px",
        boxShadow: "0 0 5px rgba(0,0,0,0.2)",
        cursor: "grab"
      }}
    >
      {card.title}
    </div>
  );
}
