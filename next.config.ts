import { resolve } from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ['192.168.1.68'],
  turbopack: {
    root: resolve(__dirname),
  },
  output: 'export',
}

export default nextConfig
