"use client"

import { ChangeEvent, useRef, useState } from "react";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import axios, { AxiosError } from "axios";
import { DUEL_ITEMS_URL } from "@/lib/apiEndPoints";
import { toast } from "sonner";

export default function AddDuelItems({token, duelId}: {token: string, duelId: string}) {

    // - Two items (image obj) as the array contains two images
    const [items, setItems] = useState<Array<DuelItemForm>>([{image: null}, {image: null}]);
    const [urls, setUrls] = useState(["", ""]);
    const [loading, setLoading] = useState(false);

    const imageRef1 = useRef<HTMLInputElement | null>(null)
    const imageRef2 = useRef<HTMLInputElement | null>(null)

    const router = useRouter();

    // - Handle images
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const file = event.target.files?.[0]

        if(file) {
            const updatedItems = [...items]
            updatedItems[index].image = file
            setItems(updatedItems);

            const imageUrl = URL.createObjectURL(file);
            const updatedUrl = [...urls]
            updatedUrl[index] = imageUrl
            setUrls(updatedUrl)
        }
    }

    // - Handle submit
    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append("id", duelId);
            items.map((items) => {
                if(items.image) formData.append(`image[]`, items.image)
            });

            if(formData.get("image[]")) {
                setLoading(true);
                const {data} = await axios.post(DUEL_ITEMS_URL, formData, {
                    headers: {
                        Authorization: token
                    }
                })

                // toast
                if(data?.message) {
                    toast.success(data?.message)
                };

                setTimeout(() => {
                    router.push("/dashboard");
                }, 1000);

                setLoading(false);
            } else {
                toast.warning("Please upload both images!")
            }
        } catch (error) {
            setLoading(false);

            if(error instanceof AxiosError) {
                if(error.response?.status === 422) {
                    if(error?.response?.data?.errors) {
                        error?.response?.data?.errors?.map((err: string) => toast.error(err))
                    }
                }
            } else {
                toast.error("Something went wrong, please try again")
            }
        }
    }

    return (
        <div className="mt-10 px-14">

            <div className="flex flex-wrap lg:flex-nowrap justify-between items-center">
                {/* First Block */}
                <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
                    <input 
                        type="file" 
                        className="hidden" 
                        ref={imageRef1} 
                        onChange={(e) => 
                            handleImageChange(e, 0)
                        }
                    />
                    <div onClick={() => imageRef1?.current?.click()} className="cursor-pointer w-full flex justify-center items-center rounded-md border-2 border-dashed p-2 h-[300px]">
                        {/* image preview = 1 */}
                        {
                            urls.length > 0 && urls?.[0] ? <Image className="w-full h-[300px] object-contain " src={urls?.[0]} alt="preview_image_1" width={500} height={500} /> 
                                :
                            <h1 className="flex items-center space-x-2 text-xl">
                                <Upload /> <span>Upload file</span>
                            </h1>
                        }
                    </div>
                </div>

                <div className="w-full flex lg:w-auto justify-center items-center">
                    <h1 className="text-2xl md:text-2xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-900 text-transparent bg-clip-text">Vs</h1>
                </div>

                {/* Second Block */}
                <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
                    <input 
                        onChange={(e) => 
                            handleImageChange(e, 1)
                        } 
                        type="file" 
                        className="hidden"
                        ref={imageRef2} 
                    />
                    <div onClick={() => imageRef2?.current?.click()} className="cursor-pointer w-full flex justify-center items-center rounded-md border-2 border-dashed p-2 h-[300px]">
                        {/* image preview = 2 */}
                        {
                            urls.length > 0 && urls?.[1] ? <Image className="w-full h-[300px] object-contain " src={urls?.[1]} alt="preview_image_1" width={500} height={500} /> 
                                :
                            <h1 className="flex items-center space-x-2 text-xl">
                                <Upload /> <span>Upload file</span>
                            </h1>
                        }
                    </div>
                </div>
            </div>

            <div className="text-center">
                <Button onClick={handleSubmit} disabled={loading} className="w-52 mt-10 text-white bg-gradient-to-r from-blue-950 via-blue-800 to-blue-950">
                    {
                        loading ? "Processing..." : "Submit"
                    }
                </Button>
            </div>
        </div>
    )
};