import { trpc } from '@/lib/trpc';
import { FC, Fragment } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export const Profile: FC = () => {
    const { data: profiles, isLoading, isError } = trpc.profile.getProfile.useQuery();

    return (
        <div className="space-y-8 max-w-md w-full border rounded-md px-8 py-10">
            <h2 className="text-xl">Profile Info</h2>
            {isError ? <p>Error fetching profile</p> : ''}
            {isLoading ? <p>Loading......</p> : ''}
            {profiles &&
                profiles.map((profile, key) => {
                    return (
                        <Fragment key={key}>
                            <p>
                                <Avatar className="AvatarRoot">
                                    <AvatarImage className="AvatarImage" src={`/uploads/${profile.pfp}`} />
                                    <AvatarFallback className="AvatarFallback" delayMs={600}>
                                        CT
                                    </AvatarFallback>
                                </Avatar>
                            </p>
                            <div>
                                <div>Bio:</div>
                                <p>{profile.bio}</p>
                            </div>

                            <div>
                                <div>Username:</div>
                                <p>{profile.username}</p>
                            </div>
                        </Fragment>
                    );
                })}
        </div>
    );
};
