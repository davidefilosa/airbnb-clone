"use client";
interface MenuItemProps {
  onClick: () => void;
  label: string;
}

import React from "react";

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      className="px-4 py-3 hover:bg-neutral-100 transiction font-semibold"
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default MenuItem;
