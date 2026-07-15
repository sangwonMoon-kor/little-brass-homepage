import { spawnSync } from 'node:child_process'

const executable = process.platform === 'win32'
  ? 'node_modules/.bin/tailwindcss.cmd'
  : 'node_modules/.bin/tailwindcss'
const result = spawnSync(
  executable,
  [
    '-c',
    'tailwind.config.cjs',
    '-i',
    'styles/tailwind.css',
    '-o',
    'public/static/tailwind.css',
    '--minify',
  ],
  { stdio: 'inherit' },
)

process.exit(result.status ?? 1)
