import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

export function ProfileForm() {
	// TODO: ensure the form is typesafe
	const form = useForm();

	const updateProfile = form.handleSubmit(async () => {
		// TODO: submit the values here
		// 1. upload the photo to the /api/upload route
		// 2. after storing the image return a url to it and store that into
		// the profile data
	});

	return (
		<Form {...form}>
			<form
				onSubmit={updateProfile}
				className='space-y-8 max-w-md w-full border rounded-md px-8 py-10'
			>
				<h2 className='text-xl'>Profile form</h2>

				<p>replace me with shadcn input</p>

				<p>replace me with shadcn file input</p>

				<p>replace me with shadcn textarea</p>

				<p>don&apos;t forget the error messages</p>

				<Button type='submit'>Update Profile</Button>
			</form>
		</Form>
	);
}
