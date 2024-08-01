import type {
	PostOrPostsParams,
	PostParams,
	PostsArchiveParams,
	TaxonomyArchiveParams,
} from '@headstartwp/core';

export const singleParams: PostParams = {
	postType: ['page', 'post', 'product'],
	/**
	 * Specifying the _fields param reduces the amount of data queried and returned by the API.
	 */
};

export const indexParams: PostParams = { postType: ['page'] };

export const searchParams: PostsArchiveParams = {
	type: 'post',
	subtype: 'page, post',
};

export const blogParams: PostOrPostsParams = {
	single: {
		postType: 'post',
	},
	archive: {
		postType: 'post',
		/**
		 * Specifying the _fields param reduces the amount of data queried and returned by the API.
		 */
		_fields: ['id', 'title', 'link', 'type', 'excerpt', 'date', 'meta', 'category', 'featured_media', 'image', 'sticky'],
	},
	priority: 'single',
	routeMatchStrategy: 'single',
};


export const shopParams: PostOrPostsParams = {
	single: {
		postType: 'product',
	},
	archive: {
		postType: 'product',
		_fields: [
			'title',
			'link',
			'excerpt',
			'featured_media',
			'category',
			'tabs',
			'meta',
			'image',
			'price',
			'sale_price',
			'regular_price',
			'on_sale',
			'stock_status',
			'sku',
			'attributes',
			'variations',
			'gallery',
			'rating',
			'reviews',
			'related',
			'upsell',
			'cross_sell',
			'type',
			'date',
			'sticky',
		]
	},
	priority: 'single',
	routeMatchStrategy: 'single',
};


export const indexTermsParams: TaxonomyArchiveParams = { order: 'asc', orderby: 'count' };
