"use client";
import * as React from "react";

interface ProfileCardProps {
  number: string;
  role: string;
  name: string;
  image: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  number,
  role,
  name,
  image,
}) => {
  return (
    <article className="relative w-[214px] h-[533px] overflow-hidden shadow-lg">
      {/* Background Image */}
      <img
        src={image}
        alt={`${role} - ${name}`}
        className="absolute inset-0 w-full h-full object-cover brightness-75"
      />

      {/* Vertical line and name */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-[2px] h-[80px] bg-white mx-auto" />
        <div className="mt-2 transform rotate-90 origin-top-left text-white text-xl font-bold tracking-widest">
          {name}
        </div>
      </div>

      {/* Number */}
      <div className="absolute bottom-[100px] w-full text-center text-[64px] font-extrabold text-white tracking-[15px] drop-shadow">
        {number}
      </div>

      {/* Role */}
      <div className="absolute bottom-[30px] w-full text-center text-white text-xl font-semibold tracking-[3px]">
        {role}
      </div>
    </article>
  );
};
