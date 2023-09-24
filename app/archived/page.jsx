import Feed from '@components/Feed';
import React from 'react';

const page = () => {
	return (
		<section className="w-full flex-center flex-col">
			<h1 className="head_text text-center">
				A Slate for all your <br className="max-md:hidden" />
				<span className="orange_gradient text-center">Projects</span>
			</h1>
			<p className="desc text-center">
				"Your Projects. Your Pace. Your Place."
			</p>
			<Feed type="archived" />
		</section>
	);
};

export default page;
