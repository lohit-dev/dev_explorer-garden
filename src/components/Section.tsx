import React from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  gradient: string;
}

const Section: React.FC<SectionProps> = ({
  title,
  children,
  icon,
  gradient,
}) => (
  <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl shadow-slate-900/50 transition-all duration-300 hover:shadow-slate-900/70">
    <div className={`${gradient} p-6`}>
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
    </div>
    <div className="p-6 space-y-6">{children}</div>
  </div>
);

export default Section;
