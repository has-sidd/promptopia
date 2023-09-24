import Project from '@models/project';
import { connectToDB } from '@utils/database';

//GET
export const GET = async (req, { params }) => {
	try {
		await connectToDB();
		const project = await Project.findById(params.id).populate('creator');
		if (!project) return new Response('project not found', { status: 404 });

		return new Response(JSON.stringify(project), { status: 200 });
	} catch (error) {
		return new Response('failed to get project', { status: 500 });
	}
};

//PATCH
export const PATCH = async (request, { params }) => {
	const {
		name,
		description,
		date,
		image,
		tags,
		github,
		url,
		completed,
		archived,
	} = await request.json();

	try {
		await connectToDB();
		const existingProject = await Project.findById(params.id);
		if (!existingProject)
			return new Response('Project not found', { status: 404 });

		existingProject.name = name;
		existingProject.description = description;
		existingProject.date = date;
		existingProject.image = image;
		existingProject.tags = tags;
		existingProject.github = github;
		existingProject.url = url;
		existingProject.completed = completed;
		existingProject.archived = archived;

		await existingProject.save();

		return new Response(JSON.stringify(existingProject), { status: 200 });
	} catch (error) {
		return new Response('failed to update project', { status: 500 });
	}
};
