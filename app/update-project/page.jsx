'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Form from '@components/Form';
import { setProject } from '@features/projects/projectSlice';
import { useDispatch, useSelector } from 'react-redux';

const EditPrompt = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const projectId = searchParams.get('id');

	const project = useSelector((state) => state.project);
	const dispatch = useDispatch();

	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({
		prompt: '',
		tag: '',
	});

	useEffect(() => {
		const getPromptDetails = async () => {
			const response = await fetch(`/api/project/searchByID/${projectId}`);
			const data = await response.json();
			// console.log(data);
			dispatch(setProject(data));
		};
		if (projectId) getPromptDetails();
	}, [projectId]);

	const updatePrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		if (!projectId) return alert('Prompt ID not found');

		try {
			const response = await fetch(`/api/project/searchByID/${projectId}`, {
				method: 'PATCH',
				body: JSON.stringify({
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
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};
	return (
		<Form type="Edit" submitting={submitting} handleSubmit={updatePrompt} />
	);
};

export default EditPrompt;
