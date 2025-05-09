import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-[#2B2B2B]">{title}</h2>
      <div className="bg-white rounded-lg shadow-lg p-6">
        {children}
      </div>
    </section>
  );
}; 