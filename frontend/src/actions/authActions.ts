"use server"

import { REGISTER_URL } from "@/lib/apiEndPoints"
import axios from "axios"

export async function registerAction(prevState: any, formData: FormData) {
    try {
        await axios.post(REGISTER_URL, {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirm_password: formData.get("confirm_password")
        })
    } catch (error) {
        
    }
}