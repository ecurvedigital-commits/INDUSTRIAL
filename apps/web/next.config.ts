import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
                unoptimized: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
		],
	},
	async redirects() {
		return [
			{
				source: "/products/category-01",
				destination: "/products?category=category-01",
				permanent: true,
			},
			{
				source: "/products/category-02",
				destination: "/products?category=category-02",
				permanent: true,
			},
			{
				source: "/products/category-03",
				destination: "/products?category=category-03",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
