"use client"

import React, { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import CountUp from 'react-countup';
import { ThumbsUp } from "lucide-react";
import { toast } from "sonner";

import { getImageUrl } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import socket from "@/lib/socket";

export default function Duel({duel}: {duel: DuelTypes}) {

    const [duelComment, setDuelComment ] = useState(duel.DuelComment);
    const [duelItems, setDuelItems ] = useState(duel.DuelItem);
    const [comment, setComment ] = useState("");
    const [hideVote, setHideVote] = useState(false);

    const handleVote = (id: string) => {
        if(duelItems && duelItems.length > 0) {
            setHideVote(true);
            updateCounter(id);

            // socket list
            socket.emit(`duel-${duel.id}`, {
                duelID: duel.id,
                duelItemId: id
            })
        }
    };

    const updateCounter = (id: string) => {
        const items = [...duelItems];
        const findIndex = duelItems.findIndex((item) => item.id === id );

        if(findIndex !== -1) {
            items[findIndex].count +=1
        }
    };

    const updateComment= (payload: any) => {
       if(duelComment && duelComment.length > 0) {
        setDuelComment([payload, ...duelComment])
       } else {
        setDuelComment([payload])
       }
    };

    const handleComment = (event: React.FormEvent) => {
        event.preventDefault();

        if(comment.length > 2) {
            const payload = {
                id: duel.id,
                comment: comment,
                create_at: new Date().toISOString()
            };

            socket.emit(`duel_comment-${duel.id}`, payload);
            updateComment(payload);
            setComment('')
            toast.success("Comment submitted")
        } else {
            toast.warning("Please type at least 2 words or more!")
        }
    }


    // update live for other users
    useEffect(() => {
        socket.on(`duel-${duel.id}`, (data) => {
            updateCounter(data?.duelItemId)
        });

        socket.on(`duel_comment-${duel.id}`, (data) => {
            updateComment(data)
        });
    }, []);
    

    return (
        <div className="mt-10 px-16">
            {/* Duel images */}
            <div className="flex flex-wrap lg:flex-nowrap justify-between items-center">
                {
                    duelItems && duelItems.length > 0 && duelItems.map((item, index) => {
                        return (
                            <Fragment key={index}>
                                <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
                                    <div className="cursor-pointer w-full flex justify-center items-center rounded-md p-2 h-[300px]">
                                        {/* image preview */}
                                            <Image 
                                                className="w-full h-[300px] object-contain " 
                                                src={getImageUrl(duel.image)} 
                                                alt="image" width={500} 
                                                height={500} 
                                            />
                                    </div>

                                    {/* vote count */}
                                    { hideVote 
                                        ? 
                                            <CountUp 
                                                start={0}
                                                end={item.count}
                                                duration={1}
                                                className="text-4xl font-extrabold bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 bg-clip-text text-transparent"
                                            /> 
                                        :
                                            <Button onClick={() => handleVote(item.id)}>
                                                <span className="mr-2 text-lg">Vote</span>
                                                <ThumbsUp />
                                            </Button>
                                    }
                                </div>

                                { index % 2 === 0  && (
                                    <div className="w-full flex lg:w-auto justify-center items-center">
                                        <h1 className="text-2xl md:text-2xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-blue-900 text-transparent bg-clip-text">Vs</h1>
                                    </div>
                                )}
                            </Fragment>
                        )
                    })
                }
            </div>

            {/* Comment input */}
            <form onSubmit={handleComment} className="mt-4 w-full">
                <Textarea 
                    placeholder="Share your thoughts"  
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button className="w-full mt-2">Submit</Button>
            </form>

            {/* Comments */}
            <div className="mt-6">
                <span className="mt-2 font-bold text-2xl">Comments :</span>
                {
                    duelComment && duelComment.length > 0 && duelComment.map((item, index) => (
                        <div key={index} className="w-full md:w-[600px] rounded-lg p-4 bg-muted mb-4">
                            <p className="font-bold">{item.comment}</p>
                            <p>{new Date(item.created_at).toDateString()}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
} 