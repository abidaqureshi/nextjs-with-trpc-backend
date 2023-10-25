import { withFileUpload, getConfig } from 'next-multiparty';
import fs from 'fs';
import path from 'path';

export const config = getConfig();

const profilePictureUploadHandler = withFileUpload(async (req, res) => {
    // TODO: save file either locally or to a file storage of your choosing
    // and return the url to store it in the submit process

    const { files } = req; // This will contain the uploaded files
    const uploadDir = path.join(process.cwd(), 'public/uploads'); // This will save the file in the 'public/uploads' folder

    // Ensure the 'uploads' folder exists
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadedFile = files[0]; // Assuming the field name is "file"

    // Generate a unique file name (e.g., to avoid overwriting existing files)
    const uniqueFileName = `${Date.now()}-${uploadedFile.originalFilename}`;

    // Create a write stream to save the file to the destination

    const writeStream = fs.createWriteStream(path.join(uploadDir, uniqueFileName.replaceAll(' ', '')));

    // Pipe the uploaded file to the write stream
    fs.createReadStream(uploadedFile.filepath).pipe(writeStream);

    writeStream.on('finish', () => {
        // You can send a response to the client or perform additional processing
        return res.status(201).json({ message: 'File uploaded and saved successfully', pfp: uniqueFileName });
    });

    writeStream.on('error', () => {
        // Handle errors during file save
        return res.status(500).json({ error: 'File save failed' });
    });
    // Process the uploaded files, e.g., save them to a location
    // and return a response to the client
});

export default profilePictureUploadHandler;
