'use client';
import { fetchProjects } from '@features/projects/projectsSlice';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProjectCard from './ProjectCard';

const ProjectCardList = () => {
	const router = useRouter();
	const projects = useSelector((state) => state.projects.projects);
	const handleEdit = (post) => {
		router.push(`/update-project?id=${post._id}`);
	};

	return (
		<div className="mt-16 prompt_layout">
			{projects &&
				projects.map((project) => (
					<ProjectCard
						key={project._id}
						project={project}
						handleEdit={handleEdit}
					/>
				))}
		</div>
	);
};

const Feed = ({ type }) => {
	const { data: session } = useSession();
	const router = useRouter();
	const [searchText, setSearchText] = useState('');
	const dispatch = useDispatch();

	const handleSearchChange = (e) => {
		setSearchText(e.target.value);
	};

	useEffect(() => {
		// fetch data from server
		session?.user && dispatch(fetchProjects(type));
	}, [session?.user]);

	return (
		<section className="feed">
			{session?.user && (
				<>
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
					{type != 'all' && (
						<p className="desc text-center capitalize text-black">{type}</p>
					)}

					<ProjectCardList />
				</>
			)}
		</section>
	);
};

export default Feed;
