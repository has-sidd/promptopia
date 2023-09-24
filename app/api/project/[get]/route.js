import Project from '@models/project';
import { connectToDB } from '@utils/database';

export const GET = async (req, { params }) => {
	try {
		await connectToDB();
		if (params.get == 'all') {
			const projects = await Project.find({
				completed: false,
				archived: false,
			}).populate('creator');
			return new Response(JSON.stringify(projects), { status: 200 });
		} else if (params.get == 'completed') {
			const projects = await Project.find({
				completed: true,
				archived: false,
			}).populate('creator');
			return new Response(JSON.stringify(projects), { status: 200 });
		} else if (params.get == 'archived') {
			const projects = await Project.find({
				completed: true,
				archived: true,
			}).populate('creator');
			return new Response(JSON.stringify(projects), { status: 200 });
		}
	} catch (error) {
		return new Response('failed to get projects', { status: 500 });
	}
};
