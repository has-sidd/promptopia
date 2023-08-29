import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

//GET
export const GET = async (req, { params }) => {
	try {
		await connectToDB();
		const prompt = await Prompt.findById(params.id).populate('creator');
		if (!prompt) return new Response('prompt not found', { status: 404 });

		return new Response(JSON.stringify(prompt), { status: 200 });
	} catch (error) {
		return new Response('failed to get prompt', { status: 500 });
	}
};
