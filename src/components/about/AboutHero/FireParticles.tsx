import { particles } from "./particleData";

export default function FireParticles() {
  return (
    <div className="absolute inset-0 z-[3] pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.del}s`,
            width: p.size,
            height: p.size,
            opacity: p.op,
          }}
        />
      ))}
    </div>
  );
}
