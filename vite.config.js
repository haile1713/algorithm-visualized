import { defineConfig } from "vite"

export default defineConfig({
	base: "/Algorithms-visualized",
	server: {
		hmr: {
			overlay: false
		}
	}
})

