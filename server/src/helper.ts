import ejs from "ejs";
import path from "path";
import { ZodError } from "zod";

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
}