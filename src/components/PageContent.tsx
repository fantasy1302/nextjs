import type { PostParams } from '@headstartwp/core';

import { usePost } from '@headstartwp/next';
import dynamic from 'next/dynamic';
import { HtmlDecoder } from '@headstartwp/core/react';

const Blocks = dynamic(() => import('./Blocks').then((mod) => mod.default));

type PageContentProps = {
	params: PostParams;
};

/**
 * This is an example of how an inner component can access the data without explicitly passing the data to it.
 * This reduces prop drilling but creates an implicit dependency with its parent. Use this strategy with caution and on components that are tied to a particular route.
 *
 * @param {*} props Props object
 *
 * @returns
 */
export const PageContent = ({ params }: PageContentProps) => {
	// This won't require a refetch as long as the data has already been fetched at the page level.
	// additionally, if the request has not been SSR'd, it will be fetched on the client only once, regardless of how many call to usePost (with the same params) you make
	const { data } = usePost(params);

	if (!data) {
		return null;
	}

	return (
		<div className="post">
			<div className="post__inner container">
				{data.post.author_photo && (
					<div className="post__intro">
						<h1>{data.post.title.rendered}</h1>
						<div className="post__author">
							<img src={data.post.author_photo} />
							<span>{data.post.author_name}</span>
						</div>
						<div className="post__cover">
							<img src={data.post._embedded['wp:featuredmedia'][0].source_url} />
						</div>
						<div className="post__meta">
							<span className="post__category">{data.post.terms.category[0].name}</span>
							<span className="post__date">{new Date(data.post.date).toLocaleDateString('ru-RU')}</span>
							<span className="post__time">Время прочтения - {data.post.time}</span>
						</div>
					</div>
				)}
				<Blocks html={data.post.content.rendered ?? ''} />

				{data.post.similar && (
					<div className="post__recent">
						<h2>Последние новости</h2>
						<div className="post__recent-cards">
							{data.post.similar.map((post) => (
								<a href={'/' + post.post_name}>
									<div className="post__recent-card" key={post.ID}>
										<div className="post__recent-card-cover">
											<img src={post.featured_image_url} />
										</div>
										<div className="post__recent-card-meta">
											<span>{new Date(post.post_date).toLocaleDateString('ru-RU')}</span>
											<span>{post.author}</span>
											<span>{post.categories[0]}</span>
										</div>
										<div className="post__recent-card-content">
											<h2>{post.post_title}</h2>
											<p>{post.post_excerpt}</p>
										</div>
									</div>
								</a>
							))}

						</div>
					</div>
				)}
			</div>
		</div>
	);
};
