import React from "react";

type SkeletonCardProps = {
  className?: string;
};

export default function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div
      className={`bg-white p-4 rounded-lg shadow animate-pulse ${className}`}
    >
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
      <div className="h-6 bg-gray-300 rounded w-full mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
    </div>
  );
}
