import { trpc } from '@/lib/trpc';
import { FC } from 'react';

export const Profile: FC = () => {
	const query = trpc.profile.getProfile.useQuery(); // TODO: fix the error

	return (
		<div className='space-y-8 max-w-md w-full border rounded-md px-8 py-10'>
			<h2 className='text-xl'>Profile Info</h2>
			<p>display the avatar here</p>
			<p>display the bio here</p>
			<p>display the username here</p>
		</div>
	);
};
