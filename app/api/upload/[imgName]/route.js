import fs from 'fs';
import path from 'path';

export const POST = async (req, { params }) => {
	const { data, ext } = await req.json();

	try {
		const imageBuffer = Buffer.from(data, 'base64');
		const imagePath = path.join(
			process.cwd(),
			'public/assets/images',
			`${params.imgName}.${ext}`
		);

		fs.writeFileSync(imagePath, imageBuffer);

		return new Response(
			JSON.stringify({ path: `/assets/images/${params.imgName}.${ext}` }),
			{
				status: 201,
			}
		);
	} catch (error) {
		return new Response('failed to upload img', { status: 500 });
	}
};
