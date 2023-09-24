import { configureStore } from '@reduxjs/toolkit';
import projectSlice from './projects/projectSlice';
import projectsSlice from './projects/projectsSlice';

export const store = configureStore({
	reducer: {
		project: projectSlice,
		projects: projectsSlice,
	},
});
