import React from 'react';
import { Popout } from '../components/Popout';
import type { Animations } from '../types';

const PopoutDemo = () => {
  const [open, setOpen] = React.useState(false);
  const [ok, setOk] = React.useState(false);
  const [animation, setAnimation] = React.useState('bounce');

  return (
    <div style={{ padding: "2rem" }}>
      <h2>SlideIn Demo</h2>
      <div style={{ marginBottom: "1rem" }}>
        <select onChange={(e) => setAnimation(e.target.value as Animations)} value={animation}>
          <option value="zoom">Zoom</option>
          <option value="right">Right</option>
        </select>
      </div>
      <button onClick={() => {
        setOpen(!open);
        setOk(false);
      }}>Show Popout</button>

      <Popout id="rmp-popout" open={open} onOpenChange={(next: boolean) => { setOpen(next); }} isOk={ok}>
        <div>
          <h1>This is a popup content</h1>
        </div>
      </Popout>
    </div>
  )
}

export default PopoutDemo;
