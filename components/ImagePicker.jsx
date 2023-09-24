import { setProject } from '@features/projects/projectSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

const ImagePicker = () => {
	const dispatch = useDispatch();

	const handleImageChange = async (e) => {
		const file = e.target.files[0];
		if (file) {
			const filePath = `/assets/images/${file.name}`;
			// Save the file to the directory (this will be handled in the next step)
			await saveImageToFileSystem(file);
			dispatch(setProject({ image: filePath }));
		}
	};

	const saveImageToFileSystem = async (file) => {
		const data = await readFileAsDataURL(file);
		const filename = file.name.split('.');
		// console.log(data);
		const response = await fetch(`/api/upload/${filename[0]}`, {
			method: 'POST',
			body: JSON.stringify({ data: data, ext: filename[1] }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const result = await response.json();
		return result.path;
	};

	const readFileAsDataURL = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (e) => resolve(e.target.result.split(',')[1]);
			reader.onerror = (e) => reject(e);
			reader.readAsDataURL(file);
		});
	};
	return (
		<input
			className="file-input file-input-sm w-full max-w-xs"
			onChange={handleImageChange}
			required
			type="file"
		/>
	);
};

export default ImagePicker;
