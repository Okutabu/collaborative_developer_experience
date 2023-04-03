import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import * as path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    include: ['htpp'],
  },
  plugins: [ vue() ],
	build  : {
		sourcemap    : true,
		lib          : {
			entry   : path.resolve(__dirname, 'src/index.ts'),
			name    : 'CalendarHeatmap',
			fileName: format => `vue3-calendar-heatmap.${format}.js`
		},
		rollupOptions: {
			// make sure to externalize deps that shouldn't be bundled
			// into your library
			external: [ 'vue', 'tippy.js' ],
			output  : {
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {
					vue       : 'Vue',
					'tippy.js': 'tippy'
				}
			}
		}
	},
});
