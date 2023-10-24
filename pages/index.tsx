import { Profile } from '@/components/Profile';
import { ProfileForm } from '@/components/ProfileForm';
import { NextPage } from 'next';

const ProfilePage: NextPage = () => {
	return (
		<div className='mt-32 container space-x-8 flex justify-center mx-auto'>
			<Profile />
			<ProfileForm />
		</div>
	);
};

export default ProfilePage;
