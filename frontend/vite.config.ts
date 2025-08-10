import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { tanstackRouter } from '@tanstack/router-vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      generatedRouteTree: './src/routeTree.gen.ts',
      target: 'react',
      autoCodeSplitting: true,
    }),
    react({
      jsxImportSource: '@emotion/react',
      plugins: [
        [
          '@swc/plugin-emotion',
          {
            sourceMap: true,
            autoLabel: 'dev-only',
            labelFormat: '[local]',
          },
        ],
      ],
    }),
    tsconfigPaths(),
  ],
})
