/** @type {import('next').NextConfig} */
const nextConfig = {
    modularizeImports: {
        "@mui/icons-material": {
          transform: "@mui/icons-material/{{member}}",
        },
      },
    
      images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'itgenius.co.th, www.abc.co.th',
            pathname: '**',
          },
          {
            protocol: "http",
            hostname: "*",
            pathname: "**",
          },
          {
            protocol: "http",
            hostname: "localhost",
            pathname: "**",
          },
        ],
        minimumCacheTTL: 0, // 0 second
      }
};

export default nextConfig;
