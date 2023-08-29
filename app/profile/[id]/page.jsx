'use client';

import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const UserProfile = ({ params }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const userName = searchParams.get('username');

	const { data: session } = useSession();
	const [posts, setPosts] = useState([]);

	const handleEdit = (post) => {
		router.push(`/update-prompt?id=${post._id}`);
	};
	const handleDelete = async (post) => {
		const hasConfirmed = confirm('Are you sure you want to delete this post?');
		if (hasConfirmed) {
			try {
				await fetch(`/api/prompt/${post._id.toString()}`, {
					method: 'DELETE',
				});
				const filteredPosts = posts.filter((p) => p._id !== post._id);
				setPosts(filteredPosts);
			} catch (error) {
				console.log(error);
			}
		}
	};

	useEffect(() => {
		// fetch data from server
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${params.id}/posts`);
			const data = await response.json();
			setPosts(data);
		};

		// if (userId) fetchUser();
		// if (session?.user.id)
		fetchPosts();
	}, []);

	return (
		<Profile
			name={userName ? `${userName}'s` : 'My'}
			desc={
				userName
					? `Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination.`
					: 'Welcome to your personalized profile page!'
			}
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default UserProfile;
