import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/manage/", // 确保资源路径相对于 /manage/
  plugins: [react()],
});
