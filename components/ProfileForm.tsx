import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { trpc } from '@/lib/trpc';
import { useCallback, useState } from 'react';
import axios from 'axios';

interface IProfileData {
    username: string;
    bio: string;
    pfp: string;
}

export function ProfileForm() {
    // TODO: ensure the form is typesafe
    const form = useForm();
    const utils = trpc.useUtils();
    const [profileData, setProfileData] = useState<IProfileData>({ username: '', bio: '', pfp: '' });
    const [fileUploadError, setFileUploadError] = useState('');
    const mutation = trpc.profile.updateProfile.useMutation({
        onSettled: async () => {
            utils.invalidate();
        },
    });

    const updateProfile = form.handleSubmit(async () => {
        // TODO: submit the values here
        // 1. upload the photo to the /api/upload route
        // 2. after storing the image return a url to it and store that into
        // the profile data
        setFileUploadError('');
        const formData = new FormData();
        formData.append('file', profileData.pfp);

        try {
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const { pfp } = response.data;
            mutation.mutate({ ...profileData, pfp: pfp });
            // Handle the successful upload, e.g., show a success message
        } catch (error) {
            // Handle errors
            setFileUploadError('File upload failed');
        }
    });

    const onChangeHandler = useCallback(
        (e: { target: any }) => {
            if (e.target.files) {
                setProfileData({ ...profileData, pfp: e.target.files[0] });
            } else {
                setProfileData({ ...profileData, [e.target.name]: e.target.value });
            }
        },
        [profileData, setProfileData],
    );

    return (
        <Form {...form}>
            <form onSubmit={updateProfile} className="space-y-8 max-w-md w-full border rounded-md px-8 py-10">
                <h2 className="text-xl">Profile form</h2>

                <p>
                    <Label>Username</Label>
                    <Input
                        name="username"
                        id="username"
                        onChange={(e) => onChangeHandler(e)}
                        placeholder="Enter username"
                    />
                </p>

                <p>
                    <Label>Avatar</Label>
                    <Input
                        type="file"
                        name="avatar"
                        onChange={(e) => onChangeHandler(e)}
                        id="avatar"
                        placeholder="Please select avatar"
                    />
                </p>

                <p>
                    <Label>Bio</Label>
                    <Textarea name="bio" cols={50} onChange={(e) => onChangeHandler(e)} rows={5} id="bio"></Textarea>
                </p>

                <p>{fileUploadError}</p>
                <p>{mutation.error && mutation.error.message}</p>

                <Button type="submit">Update Profile</Button>
            </form>
        </Form>
    );
}
