/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  // trailingSlash: true, // Optional but recommended for consistency

  ignoreDuringBuilds: true,
  images: {
    unoptimized: true, // 👈 required for static export if using <Image />
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}


export default nextConfig
