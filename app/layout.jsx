import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/globals.css';

export const metdata = {
	title: 'Promptopia',
	description: 'Discover & Share AI Prompts',
};

const RootLayout = ({ children }) => {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<body>
				<Provider>
					<div className="main">
						<div className="gradient"></div>
					</div>

					<main className="app">
						<Nav />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	);
};

export default RootLayout;
