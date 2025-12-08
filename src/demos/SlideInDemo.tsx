import React from "react";
import { SlideIn } from "../components/SlideIn/SlideIn";
import type { AnimationPositions } from "../constants";

export default function SlideInDemo() {
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState<AnimationPositions>("left");
  const [ok, setOk] = React.useState(false);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>SlideIn Demo</h2>
      <div style={{ marginBottom: "1rem" }}>
        <select onChange={(e) => setPosition(e.target.value as AnimationPositions)} value={position}>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </div>
      <button onClick={() => {
        setOpen(!open);
        setOk(false);
      }}>Show Slide-In</button>

      <SlideIn id="rmp-slideIn-demo" open={open} position={position} onOpenChange={setOpen} isOk={ok}>
        <h3>New Deals</h3>
        <p>50% off!</p>
        <button>Submit</button>
      </SlideIn>
    </div>
  );
}