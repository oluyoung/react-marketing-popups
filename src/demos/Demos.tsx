import { useEffect, useState } from "react";
import { Popout } from "../components/Popout/Popout";
import { useTimerTrigger } from "../hooks/useTimerTrigger";

export function ExampleWithoutPersistence() {
  const [open, setOpen] = useState(false);
  const [ok, setOk] = useState(false);
  const [fired] = useTimerTrigger();

  useEffect(() => {
    if (fired && !open) setOpen(true);
    if (ok) setOpen(false);
  }, [fired, ok]);

  console.log(open)
  return (
    <Popout
      id="popout-test"
      open={fired && open}
      onOpenChange={(val) => {
        setOpen(val)
      }}
    >
      <div style={{ padding: 20 }}>
        <h4>

        Special Offer: 10% Off Today Only!
        </h4>
        <button onClick={() => setOk(true)}>Claim offer</button>
      </div>
    </Popout>
  );
}