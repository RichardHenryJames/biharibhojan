/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Emit a self-contained server build for small, fast container images.
  output: "standalone",
  // Don't advertise the framework/version to attackers.
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    // Baseline hardening: clickjacking, MIME sniffing, referrer leakage,
    // HTTPS pinning and a locked-down permissions policy. CSP is limited to
    // frame-ancestors (safe) so we don't break Next.js inline runtime.
    const securityHeaders = [
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
      { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
    ];
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
