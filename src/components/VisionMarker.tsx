import type { JSX, ReactNode } from "react";

export default function VisionMarker({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <aside className="vision-marker">
      <p className="vision-marker__label">Direction of travel</p>
      {children}
    </aside>
  );
}
