'use client';

import {
	toggleArchived,
	toggleCompleted,
	updateProjectInDatabase,
} from '@features/projects/projectsSlice';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

const ProjectCard = ({ project, handleEdit }) => {
	const { data: session } = useSession();
	const dispatch = useDispatch();
	const _tags = project.tags.replace(/ /g, '').split(',');

	const handleToggleCompleted = () => {
		const changes = {
			completed: !project.completed,
			archived: project.archived,
		};

		dispatch(toggleCompleted(project._id));
		dispatch(updateProjectInDatabase({ id: project._id, changes }));
	};

	const handleToggleArchived = () => {
		const changes = {
			completed: !project.completed,
			archived: !project.archived,
		};
		if (changes.archived) {
			changes.completed = true;
		}
		dispatch(toggleArchived(project._id));
		dispatch(updateProjectInDatabase({ id: project._id, changes }));
	};

	return (
		<div className="prompt_card">
			<div className="flex justify-between items-start">
				<div className="flex-2 flex justify-start items-center gap-3">
					<Image
						src={project.image}
						alt={project.name}
						width={80}
						height={80}
						className="rounded-md object-contain"
					/>
					<div className="flex flex-col">
						<h3 className="font-satoshi font-semibold text-gray-900">
							{project.name}
						</h3>
						<p className="font-inter text-xs text-gray-500">
							{project.date.split(' ').splice(0, 4).join(' ')}
						</p>
					</div>
				</div>
			</div>
			<p className="my-4 font-satoshi text-sm text-gray-700">
				{project.description}
			</p>
			<label className="my-2 flex gap-2">
				<span className="font-satoshi font-semibold text-xs text-gray-700">
					GitHub:
				</span>
				<p className="font-satoshi text-xs text-gray-700">{project.github}</p>
			</label>
			<label className="my-2 flex gap-2">
				<span className="font-satoshi font-semibold text-xs text-gray-700">
					URL:
				</span>
				<p className="font-satoshi text-xs text-gray-700">{project.url}</p>
			</label>
			<p
				className="font-inter text-sm blue_gradient cursor-pointer"
				onClick={() => handleTagClick && handleTagClick(project.tags)}
			>
				{_tags.map((tag) => '#' + tag + ' ')}
			</p>
			<div className="justify-between md:flex">
				<label className="label cursor-pointer gap-2">
					<span className="label-text font-satoshi font-semibold text-xs text-gray-700">
						Completed
					</span>
					<input
						type="checkbox"
						checked={project.completed}
						onChange={handleToggleCompleted}
						className="toggle toggle-sm"
					/>
				</label>
				<label className="label cursor-pointer gap-2">
					<span className="label-text font-satoshi font-semibold text-xs text-gray-700">
						Archived
					</span>
					<input
						type="checkbox"
						checked={project.archived}
						onChange={handleToggleArchived}
						className="toggle toggle-sm"
					/>
				</label>
			</div>

			{session?.user.id === project.creator._id && (
				<div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
					<p
						className="font-inter text-sm green_gradient cursor-pointer"
						onClick={() => handleEdit(project)}
					>
						Edit
					</p>
				</div>
			)}
		</div>
	);
};

export default ProjectCard;
