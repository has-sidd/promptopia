import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	name: '',
	description: '',
	date: '',
	image: '',
	tags: '',
	github: '',
	url: '',
	completed: false,
	archived: false,
};

export const projectSlice = createSlice({
	name: 'project',
	initialState,
	reducers: {
		setProject: (state, action) => {
			if (action.payload?.name !== undefined) {
				state.name = action.payload.name;
			}
			if (action.payload?.description !== undefined) {
				state.description = action.payload.description;
			}
			if (action.payload?.date !== undefined) {
				state.date = action.payload.date;
			}
			if (action.payload?.image !== undefined) {
				state.image = action.payload.image;
			}
			if (action.payload?.tags !== undefined) {
				state.tags = action.payload.tags;
			}
			if (action.payload?.github !== undefined) {
				state.github = action.payload.github;
			}
			if (action.payload?.url !== undefined) {
				state.url = action.payload.url;
			}
			if (action.payload?.completed !== undefined) {
				state.completed = action.payload.completed;
			}
			if (action.payload?.archived !== undefined) {
				state.archived = action.payload.archived;
			}
		},
		toggleCompletion: (state) => {
			state.completed = !state.completed;
		},
		toggleArchive: (state) => {
			state.archived = !state.archived;
			if (state.archived) {
				state.completed = true; // Automatically mark as completed when archived
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const { setProject, toggleCompletion, toggleArchive } =
	projectSlice.actions;

export default projectSlice.reducer;
