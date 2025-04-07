"use client";
import * as React from "react";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileCard } from "./ProfileCard";

const ProfileSection: React.FC = () => {
  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-[#0f1e29] to-[#1b2a36] px-6 py-12">
      <ProfileHeader />
      <div className="mt-14 flex justify-center gap-4 flex-wrap">
        <ProfileCard
          number="01"
          role="FOUNDER"
          name="ESEP"
          image="https://cdn.builder.io/api/v1/image/assets/TEMP/882051ba27f15ed53453465cbc616628ff866c34"
        />
        <ProfileCard
          number="02"
          role="CO-FOUNDER"
          name="AIM"
          image="https://cdn.builder.io/api/v1/image/assets/TEMP/5510dcde2345b794952e2b819506c51a44b0fb59"
        />
        <ProfileCard
          number="03"
          role="FINANCIAL"
          name="STEVE"
          image="https://cdn.builder.io/api/v1/image/assets/TEMP/cb49ed1807339492bb4a8c3d599ac0e47ae2e26d"
        />
      </div>
    </section>
  );
};

export default ProfileSection;
