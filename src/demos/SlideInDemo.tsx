import React from "react";
import { SlideIn } from "../components/SlideIn/SlideIn";

export default function SlideInDemo() {
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState<"top" | "bottom" | "left" | "right">("bottom");

  return (
    <div style={{ padding: "2rem" }}>
      <h2>SlideIn Demo</h2>
      <div style={{ marginBottom: "1rem" }}>
        <select onChange={(e) => setPosition(e.target.value as any)} value={position}>
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </div>
      <button onClick={() => setOpen(!open)}>Show Slide-In</button>

      <SlideIn open={open} position={position} onOpenChange={setOpen}>
        <h3>Subscribe to Our Newsletter</h3>
        <p>Get updates, deals, and insider tips — straight to your inbox.</p>
      </SlideIn>
    </div>
  );
}