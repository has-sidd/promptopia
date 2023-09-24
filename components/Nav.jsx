'use client';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
const Nav = () => {
	const { data: session } = useSession();
	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);

	useEffect(() => {
		const setUpProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		setUpProviders();
	}, []);
	return (
		<nav className="flex-between w-full mb-16 pt-3">
			<Link href="/" className="flex gap-2 flex-center">
				<p className="text-lg text-primary-orange">Projectory</p>
			</Link>

			{/* Desktop Nav */}
			<div className="sm:flex hidden">
				{session?.user ? (
					<div className="flex gap-3 md:gap-5">
						<Link href={'/completed'}>
							<Button className="bg-transparent text-black hover:text-white">
								Completed
							</Button>
						</Link>
						<Link href={'/archived'}>
							<Button className="bg-transparent text-black hover:text-white">
								Archived
							</Button>
						</Link>
						<Link href="/create-project" className="black_btn">
							Add New Project
						</Link>

						<button
							type="button"
							onClick={() =>
								signOut({ callbackUrl: `${window.location.origin}` })
							}
							className="outline_btn"
						>
							Sign Out
						</button>

						<Image
							src={session?.user.image}
							width={37}
							height={37}
							alt="Profile"
							className="rounded-full"
						/>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() =>
										signIn(provider.id, {
											callbackUrl: `${window.location.origin}`,
										})
									}
									className="black_btn"
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>

			{/* Mobile Nav */}
			<div className="sm:hidden flex relative">
				{session?.user ? (
					<div className="flex">
						<Image
							src={session?.user.image}
							width={37}
							height={37}
							alt="Profile"
							className="rounded-full"
							onClick={() => setToggleDropdown((prevState) => !prevState)}
						/>
						{toggleDropdown && (
							<div className="dropdown">
								<Link
									href="/create-project"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									Create Project
								</Link>
								<button
									type="button"
									onClick={() => {
										setToggleDropdown(false);
										signOut({ callbackUrl: `${window.location.origin}` });
									}}
									className="mt-5 w-full black_btn"
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() =>
										signIn(provider.id, {
											callbackUrl: `${window.location.origin}`,
										})
									}
									className="black_btn"
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
