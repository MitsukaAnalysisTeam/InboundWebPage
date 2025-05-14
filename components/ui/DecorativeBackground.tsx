export function DecorativeBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full">
        {[...Array(15)].map((_, i) => (
          <div
            key={`curve-right-${i}`}
            className="absolute border-[1.5px] border-[#FFCDB6] rounded-full opacity-40"
            style={{
              width: `${(i + 1) * 10}%`,
              height: `${(i + 1) * 20}%`,
              top: `${10 + i * 5}%`,
              right: `-${i * 2}%`,
              borderRadius: '50% 0 0 50%',
            }}
          ></div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-1/2 h-full">
        {[...Array(15)].map((_, i) => (
          <div
            key={`curve-left-${i}`}
            className="absolute border-[1.5px] border-[#FFCDB6] rounded-full opacity-40"
            style={{
              width: `${(i + 1) * 10}%`,
              height: `${(i + 1) * 20}%`,
              bottom: `${10 + i * 5}%`,
              left: `-${i * 2}%`,
              borderRadius: '0 50% 50% 0',
            }}
          ></div>
        ))}
      </div>
    </div>
  );
} 