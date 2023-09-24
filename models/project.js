import { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema({
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	name: {
		type: String,
		required: [true, 'Name is required.'],
	},
	description: {
		type: String,
		required: [true, 'Description is required.'],
	},
	date: {
		type: String,
		required: [true, 'Date is required.'],
	},
	image: {
		type: String,
		required: [true, 'Image path is required.'],
	},
	tags: {
		type: String,
		required: [true, 'Tag is required.'],
	},
	github: {
		type: String,
		required: [true, 'GitHub link is required.'],
	},
	url: {
		type: String,
		required: [true, 'Project URL is required.'],
	},
	completed: {
		type: Boolean,
	},
	archived: {
		type: Boolean,
	},
});

const Project = models.Project || model('Project', ProjectSchema);
export default Project;
