import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import { FileArray, UploadedFile } from "express-fileupload";
import { PrismaClient } from "@prisma/client";

import { deleteImages, formatError, imageValidator, removeImages, uploadFile } from "../helper";
import { duelSchema } from "../validation/duelValidation";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();
const prisma = new PrismaClient();

// - Create duel post
router.post("/", authMiddleware,  async (req: Request, res: Response) => {
    try {

        const body = req.body;
        const payload = duelSchema.parse(body);

        // - Check for files
        if(req.files?.image) {
            const image = req.files?.image as UploadedFile
            const validationMsg = imageValidator(image.size, image.mimetype);

            if(validationMsg) {
                return res.status(422).json({
                    errors: {image:validationMsg}
                });
            };

            payload.image = await uploadFile(image);

        } else {
            return res.status(422).json({
                errors: { image: "image field is required." }
            });
        };

        // `user_id` and `image` is always a string
        const payloadWithImage = {
            ...payload,
            user_id: req.user?.id?.toString() || "", // user_id is a string
            image: payload.image || "", // image is a string
            expire_at: new Date(payload.expire_at)
        };

        // - create duel
        await prisma.duel.create({
            data: payloadWithImage
        });

        return res.status(200).json({
            message: "Duel created successfully"
        })
        
    } catch (error) {
        if(error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({
                message: "Invalid Data",
                errors
            })
        };

        return res.status(500).json({
            message: "Something went wrong",
            data: error
        });
    }
});

// - Get duels
router.get("/", authMiddleware, async ( req: Request, res: Response ) => {
    try {
        const userId = req.user?.id?.toString(); // Convert user ID to a string

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }
 
        const duels = await prisma.duel.findMany({
            where: {
                user_id: userId // user ID as string
            },
            orderBy: {
                id: "desc"
            }
        });

        return res.status(200).json({
            data: duels
        })
 
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            data: error
        });
    }
});

// - Get selected duel
router.get("/:id", async ( req: Request, res: Response ) => {
    try {
        const {id} = req.params;

        const duel = await prisma.duel.findUnique({
            where: {
                id: id
            }
        })

        return res.status(200).json({
            data: duel
        })
 
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            data: error
        });
    }
});

// - Update duel
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const payload = duelSchema.parse(body);

        // - Check for files
        if(req.files?.image) {
            const image = req.files?.image as UploadedFile
            const validationMsg = imageValidator(image.size, image.mimetype);

            if(validationMsg) {
                return res.status(422).json({
                    errors: {image:validationMsg}
                });
            };

            // - get old image
            const duelImage = await prisma.duel.findUnique({
                select: {
                    image: true,
                    id: true
                },
                where: {
                    id: id
                }
            });

            //  - remove old image
            if(duelImage) {
                removeImages(duelImage?.image)
            };

            payload.image = await uploadFile(image);

        };

        // `user_id` and `image` is always a string
        const payloadWithImage = {
            ...payload,
            user_id: req.user?.id?.toString() || "", // user_id is a string
            image: payload.image || "", // image is a string
            expire_at: new Date(payload.expire_at)
        };

        // - create duel
        await prisma.duel.update({
            where: {
                id: id
            },
            data: payloadWithImage
        });

        return res.status(200).json({
            message: "Duel updated successfully"
        })
        
    } catch (error) {
        if(error instanceof ZodError) {
            const errors = formatError(error);
            return res.status(422).json({
                message: "Invalid Data",
                errors
            })
        };

        return res.status(500).json({
            message: "Something went wrong",
            data: error
        });
    }
});

// - Delete selected duel
router.delete("/:id", authMiddleware, async ( req: Request, res: Response ) => {
    try {
        const {id} = req.params;

        // - get old image
        const duelImage = await prisma.duel.findUnique({
            select: {
                image: true,
                id: true
            },
            where: {
                id: id
            }
        });

        //  - remove old image
        if(duelImage) {
            deleteImages(duelImage?.image)
        };

        // - delete duel
        await prisma.duel.delete({
            where: {
                id: id
            }
        })

        return res.status(200).json({
            message: "Duel deleted successfully",
        })
 
    } catch (error) {
        console.error("Error deleting duel:", error); // Log the error for debugging
        return res.status(500).json({
            message: "Something went wrong",
            error: error // Provide a more specific error message
        });
    }
});


//? ------------------------------------------------------------------------------- //
// ! ------------ I DO NOT UNDERSTAND THIS LOGIC BUT SOMEHOW IT WORKS ------------- //
// ! ----------- DO NOT MODIFY ANYTHING UNTIL YOU CHANGES UPLOAD LOGIC ------------ //
//? ------------------------------------------------------------------------------- //
// - Duel items route
router.post("/items", authMiddleware, async (req: Request, res: Response) => {
    const {id} = req.body;
    const files:FileArray | null | undefined = req.files;

    let imageErrors : Array<string> = [];
    const images = files?.["image[]"] as UploadedFile[];

    // Log the files object to verify the key
    console.log('Files received:', files);

    if(images.length >= 2) {
        console.log("images length" + images.length)
        // - check validation
        images.map((img) => {
            const validMsg = imageValidator(img?.size, img?.mimetype);
            if(validMsg) imageErrors.push(validMsg)
        });

        if(imageErrors.length > 0) {
            return res.status(422).json({
                errors: imageErrors
            })
        };

        // - upload images
        let uploadedImages: string[] = [];
        images.map((img) => {
            uploadedImages.push(uploadFile(img));
        });

        // - Update database
        uploadedImages.map(async (item) => {
            await prisma.duelItem.create({
                data: {
                    image:item,
                    duel_id: id
                }
            })
        })

        return res.status(200).json({
           message: "Duel image updated"
        })

    };

    return res.status(422).json({
        errors: ["please select at least 2 images for duel"]
    })
});

export default router;