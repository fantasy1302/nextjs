/**
 * The shop route here exemplifies the power of the catch-all route strategy in the framework
 * This route can actually handle any taxonomy, author, pagination, date queries etc.
 *
 * In theory, you could handle multiple WordPress routes with this route, depending how you're structuring the application.
 *
 * If you wish to create specific routes for other archive pages check out the category, tag and author pages.
 *
 */
import {
	fetchHookData,
	addHookData,
	handleError,
	useAppSettings,
	usePostOrPosts,
	usePosts,
	HeadlessGetServerSideProps,
} from '@headstartwp/next';

import { Link } from '../../components/Link';
import { shopParams } from '../../params';
import { resolveBatch } from '../../utils/promises';
import { PageContent } from '../../components/PageContent';

const Shop = () => {
	const { data } = usePosts(shopParams.archive);
	console.log('data', data);
	return (
		<div>
			<ul>
				{data.posts.map((post) => (
					<li key={post.id}>
						<Link href={post.link}>{post.title.rendered}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

const ShopPage = () => {
	const { isArchive, data } = usePostOrPosts(shopParams);

	if (isArchive) {
		return <Shop />;
	}

	return (
		<PageContent params={shopParams.single} />
	);
};

export default ShopPage;

export const getServerSideProps = (async (context) => {
	try {
		const settledPromises = await resolveBatch([
			{
				func: fetchHookData(usePostOrPosts.fetcher(), context, { params: shopParams }),
			},
			{ func: fetchHookData(useAppSettings.fetcher(), context), throw: false },
		]);

		return addHookData(settledPromises, {});
	} catch (e) {
		return handleError(e, context);
	}
}) satisfies HeadlessGetServerSideProps;
