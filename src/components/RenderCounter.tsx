import { useRef } from "react";

export const RenderCounter = () => {
  const renderTimes = useRef(0);
  const renderedAt = useRef<string[]>([]);

  renderTimes.current += 1;
  renderedAt.current.push(
    `[${renderTimes.current}]: ${new Date().toISOString()}`
  );

  return (
    <div className={"underline"}>
      {"Rendered: " + renderTimes.current}
    </div>
  );
};
