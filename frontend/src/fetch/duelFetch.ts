import { DUEL_URL } from "@/lib/apiEndPoints";

export async function fetchDuels(token: string) {
    const res = await fetch(DUEL_URL, {
        headers: {
            Authorization: token
        },
        next: {
            // fetch data again after 60 seconds
            revalidate: 60*60,
            tags: ["dashboard"]
        }
    });

    if(!res.ok) {
        throw new Error("Failed to fetch data");
    };

    const response = await res.json();

    if(response?.data) {
        return response?.data;
    };

    return [];
};

export async function fetchDuel(id: string) {
    const res = await fetch(`${DUEL_URL}/${id}`, {
        cache: "no-cache"
    });

    console.log("This is from fetchDuel" + res)

    console.log("Response Status:", res.status); // Log response status
    console.log("Response URL:", res.url); // Log response URL

    if(!res.ok) {
        throw new Error("Failed to fetch data");
    };

    const response = await res.json();

    if(response?.data) {
        return response?.data;
    };

    return null;
};