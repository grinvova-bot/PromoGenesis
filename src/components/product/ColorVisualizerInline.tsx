"use client";

import ColorVisualizer from "@/components/ColorVisualizer";
import { isLightColor } from "@/lib/colors";

const lightColorFilter = (c: { hex: string }) => isLightColor(c.hex);

export default function ColorVisualizerInline() {
  return <ColorVisualizer mode="inline" colorFilter={lightColorFilter} />;
}
