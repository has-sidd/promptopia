'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick, handleProfileClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
					handleProfileClick={handleProfileClick}
				/>
			))}
		</div>
	);
};

const Feed = () => {
	const { data: session } = useSession();
	const router = useRouter();

	const [searchText, setSearchText] = useState('');
	const [posts, setPosts] = useState([]);

	const handleSearchChange = (e) => {
		setSearchText(e.target.value);
	};

	const handleTagClick = (tag) => {
		setSearchText(tag);
	};

	const handleProfileClick = (post) => {
		session?.user.id !== post.creator._id
			? router.push(
					`/profile/${post.creator._id}?username=${post.creator.username}`
			  )
			: router.push(`/profile`);
	};

	useEffect(() => {
		// fetch data from server
		const fetchPosts = async () => {
			const response = await fetch(`/api/prompt/search/${searchText}`);
			const data = await response.json();
			setPosts(data);
		};

		if (searchText !== '') fetchPosts();
	}, [searchText]);

	useEffect(() => {
		// fetch data from server
		const fetchPosts = async () => {
			const response = await fetch('/api/prompt');
			const data = await response.json();
			setPosts(data);
		};

		fetchPosts();
	}, []);

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>
			<PromptCardList
				data={posts}
				handleTagClick={handleTagClick}
				handleProfileClick={handleProfileClick}
			/>
		</section>
	);
};

export default Feed;
