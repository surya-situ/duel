import { Server } from "socket.io";
import { votingQueue, votingQueueName } from "./jobs/votingJob";
import { commentQueueName, commentQueue } from "./jobs/commentJob";

export function setupSocket(io: Server) {
    io.on("connection", (socket) => {
        console.log("User connected", socket.id);
        
        // Disconnect
        socket.on("disconnect", () => {
            console.log("User disconnected!");
            
        });

        // Listen
        socket.onAny(async (eventNames: string, data: any) => {
            if(eventNames.startsWith("duel-")) {
                await votingQueue.add(votingQueueName, data);
                socket.broadcast.emit(`duel-${data?.duelId}`, data);
            } else if(eventNames.startsWith("duel_comment-")) {
                await commentQueue.add(commentQueueName, data)
                socket.broadcast.emit(`duel_comment-${data?.id}`, data);
            }
        })
    })
};