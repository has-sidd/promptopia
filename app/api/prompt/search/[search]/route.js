import Prompt from '@models/prompt';
import User from '@models/user';
import { connectToDB } from '@utils/database';

export const GET = async (req, { params }) => {
	try {
		await connectToDB();
		const prompts = await Prompt.find({
			$or: [
				{ prompt: { $regex: params.search.toString(), $options: 'i' } },
				{ tag: { $regex: params.search.toString(), $options: 'i' } },
			],
		}).populate('creator');
		return new Response(JSON.stringify(prompts), { status: 200 });
	} catch (error) {
		return new Response('failed to get prompts', { status: 500 });
	}
};
