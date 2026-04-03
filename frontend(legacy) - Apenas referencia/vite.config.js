import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Quando executarmos npm run build, o front-end será exportado
    // diretamente para o Back-End seguindo o padrão Flask:
    outDir: '../backend/templates',
    assetsDir: '../static', // Os JS e CSS irão para backend/static
    emptyOutDir: true,
  }
})
