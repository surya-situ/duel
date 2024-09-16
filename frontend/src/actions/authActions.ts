"use server"

import { CHECK_CREDENTIAL_URL, FORGET_PASSWORD_URL, LOGIN_URL, REGISTER_URL, RESET_PASSWORD_URL } from "@/lib/apiEndPoints"
import axios, { AxiosError } from "axios"

// - User registration action
export async function registerAction(prevState: any, formData: FormData ) {

    try {
        const { data } = await axios.post(REGISTER_URL, {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
        });
        console.log(data)
        return {
           status: 200,
           message: data?.message ??  "Account cerated successfully, please check your email and verify your email",
           errors: {}
        }
    } catch (error) {
       if(error instanceof AxiosError) {
        if(error.response?.status === 422) {
            return {
                status: 422,
                message: error.response?.data?.message,
                errors: error.response?.data?.errors,
            }
        }
       }

        return {
            status: 500,
            message: "Something went wrong, please try again",
            errors: {}
        }
    };
};


// - User login action
export async function loginAction(prevState: any, formData: FormData ) {

    try {
        const { data } = await axios.post(CHECK_CREDENTIAL_URL, {
            email: formData.get("email"),
            password: formData.get("password"),
        });
        console.log(data)
        return {
           status: 200,
           message: data?.message ??  "Login successfully",
           errors: {},
           data: {
            email: formData.get("email"),
            password: formData.get("password")
           }
        }
    } catch (error) {
       if(error instanceof AxiosError) {
        if(error.response?.status === 422) {
            return {
                status: 422,
                message: error.response?.data?.message,
                errors: error.response?.data?.errors,
                data: {}
            }
        }
       }

        return {
            status: 500,
            message: "Something went wrong, please try again",
            errors: {},
            data: {}
        }
    };
};

// - User forget password action
export async function forgetPasswordAction(prevState: any, formData: FormData ) {

    try {
        const { data } = await axios.post(FORGET_PASSWORD_URL, {
            email: formData.get("email")
        });
        console.log(data)
        return {
           status: 200,
           message: data?.message ??  "Link has been sent to your email",
           errors: {}
        }
    } catch (error) {
       if(error instanceof AxiosError) {
        if(error.response?.status === 422) {
            return {
                status: 422,
                message: error.response?.data?.message,
                errors: error.response?.data?.errors,
            }
        }
       }

        return {
            status: 500,
            message: "Something went wrong, please try again",
            errors: {},
        }
    };
};

// - User reset password action
export async function resetPasswordAction(prevState: any, formData: FormData ) {

    try {
        const { data } = await axios.post(RESET_PASSWORD_URL, {
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
            token: formData.get("token"),
        });
        return {
           status: 200,
           message: data?.message ??  "Password update successfully",
           errors: {}
        }
    } catch (error) {
       if(error instanceof AxiosError) {
        if(error.response?.status === 422) {
            return {
                status: 422,
                message: error.response?.data?.message,
                errors: error.response?.data?.errors,
            }
        }
       }

        return {
            status: 500,
            message: "Something went wrong, please try again",
            errors: {},
        }
    };
};