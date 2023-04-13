import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { ghPages } from "vite-plugin-gh-pages";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/connect-four-react/",
    plugins: [react(), ghPages()],
});
