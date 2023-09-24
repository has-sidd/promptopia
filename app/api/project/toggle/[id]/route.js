import Project from '@models/project';
import { connectToDB } from '@utils/database';

//PATCH
export const PATCH = async (request, { params }) => {
	const { completed, archived } = await request.json();
	console.log(completed);

	try {
		await connectToDB();
		const existingProject = await Project.findById(params.id);
		if (!existingProject)
			return new Response('Project not found', { status: 404 });

		existingProject.completed = completed;
		existingProject.archived = archived;
		await existingProject.save();

		return new Response(JSON.stringify(existingProject), { status: 200 });
	} catch (error) {
		return new Response('failed to update Project', { status: 500 });
	}
};
