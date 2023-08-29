'use client';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
const Nav = () => {
	const { data: session } = useSession();
	const router = useRouter();

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
			<Link href="/" className="flex gap-2 felx-center">
				<Image
					width={30}
					height={30}
					alt="Promptopia Logo"
					className="object-contain"
					src="/assets/images/logo.svg"
				/>
				<p className="logo_text">Promptopia</p>
			</Link>

			{/* Desktop Nav */}
			<div className="sm:flex hidden">
				{session?.user ? (
					<div className="flex gap-3 md:gap-5">
						<Link href="/create-prompt" className="black_btn">
							Create Post
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

						<Link href="/profile">
							<Image
								src={session?.user.image}
								width={37}
								height={37}
								alt="Profile"
								className="rounded-full"
							/>
						</Link>
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
									href="/profile"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									My Profile
								</Link>
								<Link
									href="/create-prompt"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									Create Prompt
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
