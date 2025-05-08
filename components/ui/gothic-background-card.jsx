import { BgGradient } from "./bg-gradient";

export function GothicBackgroundCard({ children }) {
  return (
    <div className="relative z-10">
      <BgGradient className="-z-10" />
      <div
        role="presentation"
        className="pointer-events-none absolute inset-0 opacity-35 z-10 texture-fade bg-[url('/textures/grunge-frame-3.1.png')] bg-cover bg-center rounded invert"
      ></div>
      <div
        role="presentation"
        className="pointer-events-none absolute inset-0 bg-[url('/textures/stiff-paint-opt.jpg')] bg-cover opacity-100 -z-20"
      ></div>
      {children}
    </div>
  );
}
