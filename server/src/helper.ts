import ejs from "ejs";
import moment from "moment";
import path from "path";
import { v4 as uuid4 } from "uuid";
import { ZodError } from "zod";
import fs from "fs";

import { supportMimes } from "./config/fileSystem";
import { UploadedFile } from "express-fileupload";

export const formatError = (error: ZodError): any => {
    let errors: any = {};

    error.errors?.map((issue) => {
        errors[issue.path?.[0]] = issue.message
    });

    return errors;
};

export const renderEmailEjs = async (fileName: string, payload: any): Promise<any> => {
    const html = await ejs.renderFile(__dirname + `/views/emails/${fileName}.ejs`, payload);

    return html;
};

export const checkDateMinutesDiff = ( date: Date | string ): number => {

    const now = moment();
    const tokenSendAt = moment(date);
    const difference = moment.duration(now.diff(tokenSendAt));

    return difference.asMinutes();
};

export const imageValidator = ( size: number, mime: string ): string | null => {
    if(bytesToMb(size) > 2) {
        return "Image size must be less than 2 MB."
    } else if (!supportMimes.includes(mime)) {
        return "Image must be type of png, jpg, jpeg, webp"
    }

    return null;
};

export const bytesToMb = ( bytes:number ): number => {
    return bytes/(1024*1024);
};

export const uploadFile = (image: UploadedFile) => {
    const imageExtension = image?.name.split(".");
    const imageName = uuid4() + "." + imageExtension[1];
    const uploadPath = process.cwd() + "/public/images/" + imageName;

    // - upload image
    image.mv(uploadPath, (err) => {
        if(err) throw err
    });

    return imageName;
};

export const removeImages = (imageName: string) => {
    const path = process.cwd() + "/public/images/" + imageName;
    if(fs.existsSync(path)) {
        fs.unlinkSync(path);
    };
};

export const deleteImages = (filePath: string) => {
    const fullPath = path.join(__dirname, 'public/images', filePath);
    console.log('Attempting to delete:', fullPath);

    if (fs.existsSync(fullPath)) {
        // Check if it's a directory
        if (fs.lstatSync(fullPath).isDirectory()) {
            console.log('Removing directory:', fullPath);
            fs.rmdirSync(fullPath, { recursive: true });
        } else {
            console.log('Removing file:', fullPath);
            fs.unlinkSync(fullPath);
        }
    } else {
        console.warn('File or directory does not exist:', fullPath);
    }
}
