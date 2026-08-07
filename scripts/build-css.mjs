import { spawnSync } from 'node:child_process'

const isWindows = process.platform === 'win32'

// Node 18.20 / 20.12 이후로는 .cmd 를 shell 없이 spawn 하면 EINVAL 로 막힌다(CVE-2024-27980 대응).
// 그동안 윈도우에서 npm run build / npm run deploy 가 원인 표시 없이 exit 1 로 죽고 있었다.
// shell 을 거치면 cmd.exe 가 경로를 해석하므로 윈도우에서는 역슬래시로 넘긴다.
const executable = isWindows
  ? 'node_modules\\.bin\\tailwindcss.cmd'
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
  { stdio: 'inherit', shell: isWindows },
)

if (result.error) {
  console.error(`[build-css] Tailwind 실행 실패: ${result.error.message}`)
  process.exit(1)
}

process.exit(result.status ?? 1)
