import React from 'react';
import {StarRating} from './StarRating';
import {TokoMiringLogo} from './TokoMiringLogo'
import {TestimonialSection} from './TestimonialSection';
// Import komponen lain yang diperlukan

export default function TestimoniPage() {
  return (
    <div className="container mx-auto p-4">
      <StarRating />
      <h1 className="text-2xl font-bold mb-4">Testimoni</h1>
      <TokoMiringLogo/>
      <TestimonialSection />
      
      {/* Tambahkan komponen lain sesuai kebutuhan */}
    </div>
  );
}