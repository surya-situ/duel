"use client"

import { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import CountUp from 'react-countup';

import { getImageUrl } from "@/lib/utils";
import socket from "@/lib/socket";

export default function ViewDuelItems({duel}: {duel: DuelTypes}) {

    const [duelComment, setDuelComment ] = useState(duel.DuelComment);
    const [duelItems, setDuelItems ] = useState(duel.DuelItem);

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

     
    // update live for author
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
                                    <CountUp 
                                        start={0}
                                        end={item.count}
                                        duration={1}
                                        className="text-4xl font-extrabold bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 bg-clip-text text-transparent"
                                    />
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
