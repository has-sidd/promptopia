'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Form from '@components/Form';
import { initialState, setProject } from '@features/projects/projectSlice';
import { useDispatch, useSelector } from 'react-redux';

const CreatePrompt = () => {
	const project = useSelector((state) => state.project);
	const dispatch = useDispatch();
	const router = useRouter();

	const { data: session } = useSession();
	const [submitting, setSubmitting] = useState(false);

	console.log(project);

	const createProject = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const response = await fetch('/api/project/new', {
				method: 'POST',
				body: JSON.stringify({
					userId: session?.user.id,
					name: project.name,
					description: project.description,
					date: project.date,
					image: project.image,
					tags: project.tags,
					github: project.github,
					url: project.url,
					completed: project.completed,
					archived: project.archived,
				}),
			});

			if (response.ok) {
				router.push('/');
				dispatch(setProject(initialState));
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Form type="Create" submitting={submitting} handleSubmit={createProject} />
	);
};

export default CreatePrompt;
