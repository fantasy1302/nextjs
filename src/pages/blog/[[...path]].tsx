import React, { useEffect, useState } from 'react';
import {
	fetchHookData,
	addHookData,
	handleError,
	useAppSettings,
	usePosts,
	HeadlessGetServerSideProps,
} from '@headstartwp/next';
import { Link } from '../../components/Link';
import { blogParams } from '../../params';
import { resolveBatch } from '../../utils/promises';

const Archive = () => {
	const [postsWithImages, setPostsWithImages] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('all');

	useEffect(() => {
		getAllNews(selectedCategory);
	}, [selectedCategory]);

	const getAllNews = async (category) => {
		let url = 'http://localhost:10073/wp-json/custom/v1/news';
		if (category !== 'all') {
			url += `?category=${category}`;
		}

		try {
			const response = await fetch(url);
			const data = await response.json();
			console.log('data', data);
			setPostsWithImages(data);
		} catch (error) {
			console.error('Error fetching news:', error);
		}
	};

	const handleCategoryChange = (category) => {
		setSelectedCategory(category);
	};

	return (

		<div className="archive container">
			<h1 className="archive__title">Все новости</h1>
			<div className="archive__filters">
				<button className="btn" onClick={() => handleCategoryChange('all')}>Все</button>
				<button className="btn" onClick={() => handleCategoryChange('grantix-news')}>Новости</button>
				<button className="btn" onClick={() => handleCategoryChange('charity')}>Благотворительные проекты
				</button>
				<button className="btn" onClick={() => handleCategoryChange('technologies')}>Технологии</button>
			</div>
			<div className="archive__content container">
				{postsWithImages.map((post) => (

					<a href={'/' + post.name} className="archive__card" key={post.id}>
						{post.image_url && (
							<img
								className="archive__card-image"
								src={post.image_url}
								alt={post.title}
							/>
						)}
						<div className="archive__card-meta">
                            <span className="archive__card-date">
                                {new Date(post.date).toLocaleDateString('ru-RU')}
                            </span>
							<span className="archive__card-author">
                                {post.author}
                            </span>
							<span className="archive__card-category">
                                {post.categories.length > 0 ? post.categories[0] : 'News'}
                            </span>
						</div>
						<div className="archive__card-content">
							<a href={post.slug} className="archive__card-link">
								<h2 className="archive__title">{post.title}</h2>
							</a>
							<div
								className="archive__card-excerpt"
								dangerouslySetInnerHTML={{ __html: post.excerpt }}
							/>
						</div>
					</a>
				))}
			</div>
		</div>
	);
};

export default Archive;

export const getServerSideProps = async (context) => {
	try {
		const settledPromises = await resolveBatch([
			{
				func: fetchHookData(usePosts.fetcher(), context, { params: blogParams.archive }),
			},
			{ func: fetchHookData(useAppSettings.fetcher(), context), throw: false },
		]);

		return addHookData(settledPromises, {});
	} catch (e) {
		return handleError(e, context);
	}
};
