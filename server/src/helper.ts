import ejs from "ejs";
import moment from "moment";
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
};

export const checkDateMinutesDiff = ( date: Date | string ): number => {

    const now = moment();
    const tokenSendAt = moment(date);
    const difference = moment.duration(now.diff(tokenSendAt));

    return difference.asMinutes();
};