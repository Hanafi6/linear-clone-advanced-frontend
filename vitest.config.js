import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom', // دي أهم حتة عشان الـ render يشتغل
        globals: true,
        // setupFiles: './vitest.setup.js',
    },
})