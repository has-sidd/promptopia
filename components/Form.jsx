import {
	setProject,
	toggleArchive,
	toggleCompletion,
} from '@features/projects/projectSlice';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from './DatePicker';
import ImagePicker from './ImagePicker';

const Form = ({ type, submitting, handleSubmit }) => {
	const _project = useSelector((state) => state.project);
	const dispatch = useDispatch();

	return (
		<section className="w-full max-w-full flex-start flex-col">
			<h1 className="head_text text-left">
				<span className="blue_gradient">{type} Post</span>
			</h1>
			<p className="desc text-left max-w-md">
				{type} and manage amazing projects, and let your imagination run wild.
			</p>
			<form
				onSubmit={handleSubmit}
				className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
			>
				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Name
					</span>
					<input
						className="form_input"
						placeholder="Project Name"
						value={_project.name}
						onChange={(e) => dispatch(setProject({ name: e.target.value }))}
						required
					/>
				</label>

				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Description
					</span>
					<textarea
						className="form_textarea"
						placeholder="Write your description here..."
						value={_project.description}
						onChange={(e) =>
							dispatch(setProject({ description: e.target.value }))
						}
						required
					/>
				</label>
				<div className="flex">
					<label>
						<span className="font-satoshi font-semibold text-base text-gray-700 w-full">
							Start Date
						</span>
						<DatePicker />
					</label>
					<label>
						<span className="font-satoshi font-semibold text-base text-gray-700 w-full">
							Image
						</span>
						<ImagePicker />
					</label>
				</div>
				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Tags {` `}
						<span className="font-normal">(product, webdevelopment, idea)</span>
					</span>
					<input
						className="form_input"
						placeholder="tag"
						value={_project.tags}
						onChange={(e) => dispatch(setProject({ tags: e.target.value }))}
						required
					/>
				</label>
				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						GitHub Repo Link
					</span>
					<input
						className="form_input"
						placeholder="Link"
						value={_project.github}
						onChange={(e) => dispatch(setProject({ github: e.target.value }))}
						required
					/>
				</label>
				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Live URL
					</span>
					<input
						className="form_input"
						placeholder="Link"
						value={_project.url}
						onChange={(e) => dispatch(setProject({ url: e.target.value }))}
						required
					/>
				</label>
				<label className="label cursor-pointer">
					<span className="label-text font-satoshi font-semibold text-sm text-gray-700">
						Completed
					</span>
					<input
						type="checkbox"
						checked={_project.completed}
						onChange={() => dispatch(toggleCompletion())}
						className="toggle"
					/>
				</label>
				<label className="label cursor-pointer">
					<span className="label-text font-satoshi font-semibold text-sm text-gray-700">
						Archived
					</span>
					<input
						type="checkbox"
						checked={_project.archived}
						onChange={() => dispatch(toggleArchive())}
						className="toggle"
					/>
				</label>
				<div className="flex-end mx-3 mb-5 gap-4">
					<Link href="/" className="text-gray-500 text-sm">
						Cancel
					</Link>
					<button
						type="submit"
						className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
						disabled={submitting}
					>
						{submitting ? `${type}...` : type}
					</button>
				</div>
			</form>
		</section>
	);
};

export default Form;
