/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";


export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./mdx-components.tsx"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    typography,
    require("@tailwindcss/typography"),
  ],
} satisfies Config;
