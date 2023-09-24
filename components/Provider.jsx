'use client';
import { store } from '@features/store';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

const Provider = ({ children, session }) => {
	return (
		<ReduxProvider store={store}>
			<SessionProvider session={session}>{children}</SessionProvider>
		</ReduxProvider>
	);
};

export default Provider;
