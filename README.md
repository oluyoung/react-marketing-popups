# react-marketing-popups

[![NPM Version](https://img.shields.io/npm/v/react-marketing-popups.svg)](https://www.npmjs.com/package/react-marketing-popups)
[![NPM Downloads](https://img.shields.io/npm/dm/react-marketing-popups.svg)](https://www.npmjs.com/package/react-marketing-popups)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/react-marketing-popups.svg)](https://bundlephobia.com/package/react-marketing-popups)

A lightweight, framework-agnostic **React UX library** for high-converting popouts, banners, slide-ins, and timed/behaviour-based triggers.

Designed for modern React apps and built around **smooth animations**, **configurable triggers**, and **persistent behaviour** (per-user seen states).

Perfect for marketing teams, e-commerce flows, onboarding funnels, exit-intent modals, upsells, and announcements.

Storybook demo: https://oluyoung.github.io/react-marketing-popups

---

## Features

- **Popouts (Modal)**
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

# Installation

```bash
npm install react-marketing-popups
# or
yarn add react-marketing-popups

```

---

# Quick Start Example

### High-level components with built-in trigger and persistence

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

### Core components (manual)

#### With persistence

```tsx
import { useEffect, useState } from "react";
import { PopoutCore, useTimerTrigger, usePersistence } from "react-marketing-popups";

export default function Example() {
  const [open, setOpen] = useState(false);
  const [ok, setOk] = useState(false);
  const [fired] = useTimerTrigger();
  const { hasSeen, markSeen } = usePersistence('popout-test');

  useEffect(() => {
    if (fired && !hasSeen()) setOpen(true);
    if (ok) markSeen();
    if (fired && !open) markSeen();
  }, [fired, ok]);

  return (
    <Popout
      id="popout-test"
      open={open}
      onOpenChange={(val) => setOpen(val)}
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
```

#### Without persistence

```tsx
import { useEffect, useState } from "react";
import { Popout, useTimerTrigger, usePersistence } from "react-marketing-popups";

export function Example() {
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
```

You can see more demos using storybook or if you need an advanced demo, please create an issue.

---

# Components Overview

The library includes **three components**:

1. **Popout** – modal centered on screen
2. **Banner** – full-width horizontal banner (top or bottom) or full-height vertical banner (left or right)
3. **SlideIn** – horizontal panel sliding in from left or right

Each has:

- A Core Component (manual control; no triggers or persistence)
- A set of Trigger Components (auto-controlled via behaviour and coupled with persistence)
  - All components have these exportable as `import { PopoutByTimer } from 'react-marketing-popups`, we will use Popout for the examples.
- A general `<ComponentIndex>` component that is defined with a trigger and a wrapper around the components

---

### Shared Props Table

All components share these props. *Asterisked props are required*

| Prop | Type | Description | Default |
| --- | --- | --- | --- |
| `id`* | `string` | Unique key for persistence tracking |
| `open`* | `boolean` | Control whether the popout is visible | false
| `onOpenChange`* | `(open: boolean) => void` | Called when the popout opens/closes |
| `children`* | `ReactNode` | Content inside the modal |
| `trigger` | `"timer"`, `"scroll"`, `"exit"`, `"inactivity"` | Selects a trigger component |
| `triggerProps` | Varies per trigger | Configuration for the selected trigger |
| `isOk` | `boolean` | Signals the user took desired action | false |
| `closeOnOk` | `boolean` | Duration of animation in ms | false |
| `duration` | `number` | Duration of animation in ms | 300 |
| `closeBtnClassname` | `string` | Duration of animation in ms |

---

# 1. Popout (Modal)

### Import

```tsx
import { Popout } from "react-marketing-popups";
```

### Description

A smooth animated modal that can open manually or via a marketing trigger (timer, scroll, inactivity, exit intent).

### Props Table

| Prop | Type | Description | Default |
| --- | --- | --- | --- |
| `lockScroll` | `boolean` | Locks body scroll while open | false
| `closeOnOverlay` | `boolean` | Close modal on overlay click | true
| `overlayClassName` | `boolean` | className for overlay element | true
| `contentClassName` | `boolean` | className for content container element | true
| `elemProps` | `{ overlayElProps?: typeof HTMLDivElement, containerElProps?: typeof HTMLDivElement }` | Props for overlay element and content container element | true
| `animation` | `"fade"`, `"zoom"`, `"bounce"` | Animation effect used for open and close of component | "zoom"


## Popout Core Component (No Triggers)

```tsx
import { PopoutCore } from "react-marketing-popups";

<PopoutCore open={open} onOpenChange={setOpen}>
  Content
</PopoutCore>
```

Use this when you want to control the trigger, and the persistence manually.

---

## Popout Trigger Wrapper Components

### 1. `PopoutByTimer`

Opens after a specified delay.

```tsx
import { PopoutByTimer } from "react-marketing-popups";

<PopoutByTimer
  {...props}
  triggerProps={{ ms: 3000, enabled: true }}
>
  Timer Popout
</PopoutByTimer>
```

### Trigger Props

| Key | Type | Description | Default |
| --- | --- | --- | --- |
| `ms` | `number` | Delay before firing | 3000
| `enabled` | `boolean` | Whether timer should run | true

---

### 2. `PopoutByScroll`

Opens when user scrolls past a percentage of the page.

```tsx
import { PopoutByScroll } from "react-marketing-popups";

<PopoutByScroll
  {...props}
  triggerProps={50}
>
  Scroll Offer
</PopoutByScroll>
```

### Trigger Props

| Key | Type | Description | Default |
| --- | --- | --- | --- |
| `percent` | `number` | Scroll depth threshold | 50

---

### 3. `PopoutByExit`

Opens when the user shows exit-intent.

```tsx
<PopoutByExit {...props}>
  Are you leaving already?
</PopoutByExit>
```

*No triggerProps required.*

---

### 4. `PopoutByInactivity`

Opens after inactivity timeout.

```tsx
<PopoutByInactivity
  {...props}
  triggerProps={{ ms: 10000 }}
>
  Still there? Here's a bonus!
</PopoutByInactivity>
```

### Trigger Props

| Key | Type | Description | Default |
| --- | --- | --- | --- |
| `ms` | `number` | Inactivity duration | 30000

---

# 2. Banners

Full-width horizontal or full-height vertical marketing banners.

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

| Prop | Type | Description | Default |
| --- | --- | --- | --- |
| `position` | `"top"`, `"bottom"`, `"left"` or `"right"` | Banner placement | "bottom" |
| `animation` | `"fade"`, `"slide"` or `"bounce"` | Animation effect | "slide" |
| `containerClassName` | `boolean` | className for root element |
| `contentClassName` | `boolean` | className for content container element |
| `elemProps` | `{ containerElProps?: typeof HTMLDivElement, containerElProps?: typeof HTMLDivElement }` | Props for overlay element and content container element |

---

# 3. SlideIn

A fixed left or right panel.

### Import

```tsx
import { SlideIn } from "react-marketing-popups";
```

### Example

```tsx
<SlideIn open={open} onOpenChange={setOpen} position="right">
  Checkout our new feature!
</SlideIn>
```

### Props Table

| Prop | Type | Description | Default |
| --- | --- | --- | ---|
| `position` | `"left" or "right"` | Slide direction | "left" |
| `animation` | `"fade"`, `"slide"` or `"bounce"` | Animation effect | "slide" |
| `wrapperClassName` | `boolean` | className for root element |
| `containerClassName` | `boolean` | className for container element |
| `contentClassName` | `boolean` | className for content container element |
| `elemProps` | `{ wrapperElProps?: typeof HTMLDivElement; containerElProps?: typeof HTMLDivElement, containerElProps?: typeof HTMLDivElement }` | Props for overlay element and content container element |

---

# Hooks

The library exports several standalone hooks that can be used directly.

---

## `useTimerTrigger(ms, enabled)`

Triggers once after timeout.

| Arg | Type | Description | Default |
| --- | --- | --- | --- |
| `ms` | `number` | Time before firing | 3000
| `enabled` | `boolean` | Should it run | true

### Example

```tsx
const [fired] = useTimerTrigger(3000, true);
```

---

## `useScrollTrigger(percent)`

Triggers on scroll %.

| Arg | Type | Description | Default
| --- | --- | --- | --- |
| `percent` | number | Scroll depth threshold | 50

### Example

```tsx
const [fired] = useScrollTrigger(60);
```

---

## `useInactivityTrigger(ms)`

Triggers after inactivity.

| Arg | Type | Description | Default
| --- | --- | --- | --- |
| `ms` | number | Time for user to be inactive before displaying | 30000

### Example

```tsx
const [fired] = useInactivityTrigger(10000);
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

| Arg | Type | Description | Default
| --- | --- | --- | --- |
| `key` | string | Id | 

### Returned API

| Method | Description |
| --- | --- |
| `hasSeen()` | Returns true if key marked as seen |
| `markSeen()` | Marks key as seen |
| `clear()` | Removes key |

### Example

```tsx
const { hasSeen, markSeen, clear } = usePersistence("popout-1");
```

---

# Storybook

Launch storybook with `npm run storybook`

# License

N/A

# Contributions

PRs, issues, feature requests, and improvements are welcome!

Implement tree-shaking

---
