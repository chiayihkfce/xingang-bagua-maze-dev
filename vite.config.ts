import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import javascriptObfuscator from 'vite-plugin-javascript-obfuscator'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    javascriptObfuscator({
      options: {
        compact: true,
        controlFlowFlattening: true, 
        controlFlowFlatteningThreshold: 0.8,
        deadCodeInjection: true, // 注入死代碼
        deadCodeInjectionThreshold: 0.4,
        debugProtection: true, // 防止開發者工具調試
        debugProtectionInterval: 4000,
        numbersToExpressions: true,
        selfDefending: true, // 自我防禦，防美化運行
        simplify: true,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.8,
        splitStrings: true,
        unicodeEscapeSequence: true,
        rotateStringArray: true,
        shuffleStringArray: true
      },
    })
  ],
  base: './', // Ensures relative paths for GitHub Pages
  build: {
    sourcemap: false
  }
})
