"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";

const noop = () => () => {};

/**
 * Renders into <body>. Overlays must escape transformed ancestors
 * (scaled project cards, the translated journey track) or `position: fixed` breaks.
 */
export function Portal({ children }: { children: ReactNode }) {
  const isClient = useSyncExternalStore(noop, () => true, () => false);
  return isClient ? createPortal(children, document.body) : null;
}
