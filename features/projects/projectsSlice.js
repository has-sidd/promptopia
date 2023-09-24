import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchProjects = createAsyncThunk(
	'projects/fetchProjects',
	async (type) => {
		const response = await fetch(`/api/project/${type}`);
		const data = await response.json();

		return data;
	}
);

export const updateProjectInDatabase = createAsyncThunk(
	'projects/updateInDatabase',
	async ({ id, changes }) => {
		const response = await fetch(`/api/project/toggle/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(changes),
		});

		if (!response.ok) {
			throw new Error('Failed to update project');
		}

		return { id, changes };
	}
);

const initialState = {
	projects: [],
};

const projectsSlice = createSlice({
	name: 'projects',
	initialState: initialState,
	reducers: {
		setProjects: (state, action) => {
			return action.payload;
		},
		toggleCompleted: (state, action) => {
			const project = state.projects.find(
				(proj) => proj._id === action.payload
			);
			if (project) {
				project.completed = !project.completed;
			}
		},
		toggleArchived: (state, action) => {
			const project = state.projects.find(
				(proj) => proj._id === action.payload
			);
			if (project) {
				project.archived = !project.archived;
				if (project.archived) {
					project.completed = true;
				}
			}
		},
	},
	extraReducers: {
		[fetchProjects.fulfilled]: (state, { payload }) => {
			return { ...state, projects: payload };
		},
		[fetchProjects.rejected]: () => {
			console.log('Rejected');
		},

		[updateProjectInDatabase.fulfilled]: (state, action) => {
			const project = state.projects.find(
				(proj) => proj.id === action.payload.id
			);
			if (project) {
				Object.assign(project, action.payload.changes);
			}
		},
	},
});

export const { setProjects, toggleCompleted, toggleArchived } =
	projectsSlice.actions;
export default projectsSlice.reducer;
