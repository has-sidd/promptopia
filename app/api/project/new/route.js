import Project from '@models/project';
import { connectToDB } from '@utils/database';

export const POST = async (req, res) => {
	const {
		userId,
		name,
		description,
		date,
		image,
		tags,
		github,
		url,
		completed,
		archived,
	} = await req.json();

	try {
		await connectToDB();
		const newProject = new Project({
			creator: userId,
			name,
			description,
			date,
			image,
			tags,
			github,
			url,
			completed,
			archived,
		});
		await newProject.save();
		return new Response(JSON.stringify(newProject), { status: 201 });
	} catch (error) {
		return new Response('failed to create new project', { status: 500 });
	}
};
