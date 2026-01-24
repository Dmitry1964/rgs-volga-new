import { defineConfig } from 'vite'
import { resolve } from 'path'
import fg from 'fast-glob'

function resolveEntries(patterns = ['*.html']) {
  const files = fg.sync(patterns, { dot: false })
  return files.reduce((acc, p) => {
    const name = p.replace(/\.html$/, '')
    acc[name] = resolve(__dirname, p)
    return acc
  }, {})
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: resolveEntries(['*.html', 'pages/**/*.html'])
    }
  }
})
