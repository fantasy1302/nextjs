const { withHeadstartWPConfig } = require('@headstartwp/next/config');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

/**
 * Update whatever you need within the nextConfig object.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
};
// if you are not using polylang integration you can remove this code
// if you are replace the locales with the ones you are using
if (process.env?.NEXT_PUBLIC_ENABLE_POLYLANG_INTEGRATION === 'true') {
	nextConfig.i18n = {
		locales: ['en','ru', 'pt'],
		defaultLocale: 'ru',
	};
}

/**
 * You only need this if you want to use Next.js ISR outside of hosting platforms
 * that do not natively support Next.js ISR.
 */
if (process.env.NEXT_REDIS_URL || process.env.VIP_REDIS_PRIMARY) {
	// eslint-disable-next-line global-require
	const { initRedisClient } = require('@10up/next-redis-cache-provider');
	initRedisClient();
	nextConfig.cacheHandler = require.resolve('@10up/next-redis-cache-provider');
}
module.exports = withBundleAnalyzer(withHeadstartWPConfig(nextConfig));
