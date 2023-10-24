import { withFileUpload, getConfig } from 'next-multiparty';

export const config = getConfig();

const profilePictureUploadHandler = withFileUpload(async (req, res) => {
	// TODO: save file either locally or to a file storage of your choosing
	// and return the url to store it in the submit process

	return res.status(201).json({
		pfp: 'pfp image url here',
	});
});

export default profilePictureUploadHandler;
