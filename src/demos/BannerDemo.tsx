import React from "react";
import { Banner } from "../components/Banner/Banner";
import type { AnimationPositions } from "../types";

export default function BannerDemo() {
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState<AnimationPositions>("left");
  const [ok, setOk] = React.useState(false);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Banner Demo</h2>
      <div style={{ marginBottom: "1rem" }}>
        <select onChange={(e) => setPosition(e.target.value as AnimationPositions)} value={position}>
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </div>
      <button onClick={() => {
        setOpen(!open);
        setOk(false);
      }}>Show Banner</button>

      <Banner id={`demo-banner-${position}`} open={open} position={position} onOpenChange={setOpen} isOk={ok}>
        <h3>Subscribe to Our Newsletter</h3>
        <p>Get updates, deals, and insider tips — straight to your inbox.</p>
        <button onClick={() => setOk(true)}>Set Ok</button>
      </Banner>
    </div>
  );
}