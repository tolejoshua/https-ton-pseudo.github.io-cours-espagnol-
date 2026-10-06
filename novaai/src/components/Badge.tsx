/** Badge en verre avec accent à gauche. */
export function Badge({ children }: { children: string }) {
  return (
    <span className="inline-block border-l-2 border-white bg-white/15 px-3 py-1.5 font-mono text-[11px] tracking-[0.15em] text-white uppercase backdrop-blur-md">
      {children}
    </span>
  );
}
