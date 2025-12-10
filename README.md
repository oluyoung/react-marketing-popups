# react-marketing-popups

[![NPM Version](https://img.shields.io/npm/v/react-marketing-popups.svg)](https://www.npmjs.com/package/react-marketing-popups)
[![NPM Downloads](https://img.shields.io/npm/dm/react-marketing-popups.svg)](https://www.npmjs.com/package/react-marketing-popups)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/react-marketing-popups.svg)](https://bundlephobia.com/package/react-marketing-popups)

A lightweight, framework-agnostic **React marketing UX library** for high-converting popouts, banners, slide-ins, and timed/behaviour-based triggers.

Designed for modern React apps and built around **smooth animations**, **configurable triggers**, and **persistent behaviour** (per-user seen states).

Perfect for marketing teams, e-commerce flows, onboarding funnels, exit-intent modals, upsells, and announcements.

---

## ✨ Features

- **Popouts / Modals**
- **Banners** (Full-width horizontal; full-height vertical)
- **SlideIn panels**
- **Built-in triggers**
    - Timer
    - Scroll %
    - Inactivity
    - Exit Intent
- **Persistence layer** (`localStorage`)
- **“Core” components** without triggers
- **Hooks** exported for custom advanced flows

---

# 📦 Installation

```bash
npm install react-marketing-popups
# or
yarn add react-marketing-popups

```

---

# 🚀 Quick Start Example

```tsx
import { Popout } from "react-marketing-popups";

export default function Example() {
  return (
    <Popout
      trigger="timer"
      triggerProps={{ ms: 4000 }}
      open={false}
      onOpenChange={(v) => console.log("Open:", v)}
    >
      <div style={{ padding: 20 }}>Special Offer: 10% Off Today Only!</div>
    </Popout>
  );
}

```

---

# 📚 Components Overview

The library includes **three UI shells**:

1. **Popout** – modal centered on screen
2. **Banner** – full-width horizontal banner (top or bottom)
3. **SlideIn** – horizontal panel sliding in from left or right

Each has:

- A **Core Component** (manual control; no triggers)
- A set of **Trigger Components** (auto-controlled via behaviour)
- A **general `<Component index>` wrapper** that switches to correct trigger component automatically

---

# 🟦 1. Popout (Modal)

### Import

```tsx
import { Popout } from "react-marketing-popups";

```

### Description

A smooth animated modal that can open manually or via a marketing trigger (timer, scroll, inactivity, exit intent).

### Props Table

| Prop | Type | Description |
| --- | --- | --- |
| `open` | `boolean` | Control whether the popout is visible |
| `onOpenChange` | `(open: boolean) => void` | Called when the popout opens/closes |
| `trigger` | `"timer" | "scroll" | "exit" | "inactivity"` | Selects a trigger component |
| `triggerProps` | Varies per trigger | Configuration for the selected trigger |
| `children` | `ReactNode` | Content inside the modal |
| `id` | `string` | Unique key for persistence tracking |
| `isOk` | `boolean` | Signals the user took desired action |
| `lockScroll` | `boolean` | Locks body scroll while open |

---

## Popout Core Component (No Triggers)

```tsx
import { PopoutCore } from "react-marketing-popups";

<PopoutCore open={open} onOpenChange={setOpen}>
  Content
</PopoutCore>

```

Use this when **you want to control open state manually**.

---

## Popout Trigger Wrapper Components

### 1. `PopoutByTimer`

Opens after a specified delay.

```tsx
import { PopoutByTimer } from "react-marketing-popups";

<PopoutByTimer
  triggerProps={{ ms: 3000, enabled: true }}
  open={open}
  onOpenChange={setOpen}
>
  Timer Popout
</PopoutByTimer>

```

### Trigger Props

| Key | Type | Description |
| --- | --- | --- |
| `ms` | `number` | Delay before firing |
| `enabled` | `boolean` | Whether timer should run |

---

### 2. `PopoutByScroll`

Opens when user scrolls past a percentage of the page.

```tsx
<PopoutByScroll
  triggerProps={50} // percent
  onOpenChange={setOpen}
>
  Scroll Offer
</PopoutByScroll>

```

### Trigger Props

| Key | Type | Description |
| --- | --- | --- |
| `percent` | `number` | Scroll depth threshold (default: 50%) |

---

### 3. `PopoutByExit`

Opens when the user shows exit-intent.

```tsx
<PopoutByExit onOpenChange={setOpen}>
  Are you leaving already?
</PopoutByExit>

```

*No triggerProps required.*

---

### 4. `PopoutByInactivity`

Opens after inactivity timeout.

```tsx
<PopoutByInactivity
  triggerProps={{ ms: 10000 }}
  onOpenChange={setOpen}
>
  Still there? Here's a bonus!
</PopoutByInactivity>

```

### Trigger Props

| Key | Type | Description |
| --- | --- | --- |
| `ms` | `number` | Inactivity duration |

---

# 🟩 2. Banners

Horizontal or full-height marketing banners.

### Import

```tsx
import { Banner } from "react-marketing-popups";

```

### Example

```tsx
<Banner open={open} onOpenChange={setOpen} position="bottom">
  Free Shipping Ends Today!
</Banner>

```

### Props Table

| Prop | Type | Description |
| --- | --- | --- |
| `open` | `boolean` | Show/hide banner |
| `onOpenChange` | `(open: boolean) => void` | Callback |
| `position` | `"top" | "bottom"` | Banner placement |
| `trigger` | string | Same as Popout triggers |
| `triggerProps` | varies | Trigger configuration |

---

# 🟥 3. SlideIn

A horizontal marketing panel sliding in from left or right.

### Import

```tsx
import { SlideIn } from "react-marketing-popups";

```

### Example

```tsx
<SlideIn open={open} onOpenChange={setOpen} side="right">
  Checkout our new feature!
</SlideIn>

```

### Props Table

| Prop | Type | Description |
| --- | --- | --- |
| `open` | `boolean` | Whether panel is shown |
| `onOpenChange` | `(open: boolean) => void` | Called on state change |
| `side` | `"left" | "right"` | Slide direction |
| `trigger` | string | Trigger type |
| `triggerProps` | varies | Trigger configuration |

---

# 🧩 Hooks

The library exports several standalone hooks that can be used directly.

---

## `useTimerTrigger(ms, enabled)`

Triggers once after timeout.

### Arguments

| Arg | Type | Description |
| --- | --- | --- |
| `ms` | `number` | Time before firing |
| `enabled` | `boolean` | Should it run |

### Example

```tsx
const [fired] = useTimerTrigger(3000, true);

```

---

## `useScrollTrigger(percent)`

Triggers on scroll %.

| Arg | Type | Description |
| --- | --- | --- |
| `percent` | number | Scroll depth threshold |

### Example

```tsx
const [fired] = useScrollTrigger(60);

```

---

## `useInactivityTrigger({ ms })`

Triggers after inactivity.

### Example

```tsx
const [fired] = useInactivityTrigger({ ms: 10000 });

```

---

## `useExitIntentTrigger()`

Triggers when mouse leaves viewport top edge.

```tsx
const [fired] = useExitIntentTrigger();

```

---

## `usePersistence(key)`

LocalStorage "hasSeen" tracking helper.

### Returned API

| Method | Description |
| --- | --- |
| `hasSeen()` | Returns true if key marked as seen |
| `markSeen()` | Marks key as seen |
| `clear()` | Removes key |

### Example

```tsx
const { hasSeen, markSeen } = usePersistence("popout-1");

```

---

# ✨ Using the Main Component Index

Instead of importing trigger-specific components manually:

```tsx
import { Popout } from "react-marketing-popups";

```

The component automatically chooses the correct trigger:

```tsx
<Popout
  trigger="scroll"
  triggerProps={50}
  onOpenChange={setOpen}
>
  Scroll Offer
</Popout>

```

---

# 📄 License

**MIT License**

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy...

```

Full license text recommended in `/LICENSE`.

---

# 🤝 Contributions

PRs, issues, feature requests, and improvements are welcome!

---
