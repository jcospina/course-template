import type { SandpackTheme } from "@codesandbox/sandpack-react";

/** Themes tuned to our design tokens so playgrounds feel native. */
export const lightSandpack: SandpackTheme = {
  colors: {
    surface1: "#f5f2ea",
    surface2: "#efebe2",
    surface3: "#e4ded2",
    clickable: "#6f6a62",
    base: "#211f1c",
    disabled: "#b8b2a6",
    hover: "#211f1c",
    accent: "#5a4fcf",
    error: "#b4232a",
    errorSurface: "#f8dcdc",
  },
  syntax: {
    plain: "#2c2a26",
    comment: { color: "#9c968c", fontStyle: "italic" },
    keyword: "#9333a8",
    tag: "#0d8f86",
    punctuation: "#6f6a62",
    definition: "#2563b8",
    property: "#b8590a",
    static: "#b4232a",
    string: "#1f7a4d",
  },
  font: {
    body: '"Outfit", sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
    size: "13px",
    lineHeight: "1.6",
  },
};

export const darkSandpack: SandpackTheme = {
  colors: {
    surface1: "#16161d",
    surface2: "#1d1d25",
    surface3: "#2a2a33",
    clickable: "#98948c",
    base: "#ecebe6",
    disabled: "#5a5750",
    hover: "#ffffff",
    accent: "#9d94ff",
    error: "#ff6b72",
    errorSurface: "#311a1c",
  },
  syntax: {
    plain: "#d7d5cd",
    comment: { color: "#6a6760", fontStyle: "italic" },
    keyword: "#c792ea",
    tag: "#4fd6c9",
    punctuation: "#98948c",
    definition: "#82aaff",
    property: "#f0915b",
    static: "#ff6b72",
    string: "#7fd99a",
  },
  font: {
    body: '"Outfit", sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
    size: "13px",
    lineHeight: "1.6",
  },
};
