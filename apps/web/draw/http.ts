import axios from "axios";
import { shape } from "./shapesTypes";

const HTTP_URL = process.env.NEXT_PUBLIC_HTTP_URL || "http://localhost:3001";

export async function getExistingShapes(roomId: string): Promise<shape[]> {
    try {
        const res = await axios.get(`${HTTP_URL}/api/room/chats/${roomId}`);
        const messages = res.data.message || res.data.messages || [];
        const shapes: shape[] = [];

        for (const item of messages) {
            try {
                const parsed = typeof item.message === "string" ? JSON.parse(item.message) : item.message;
                if (parsed && parsed.type) {
                    shapes.push(parsed);
                }
            } catch (err) {
                console.error("Failed to parse shape message", err);
            }
        }
        return shapes;
    } catch (error) {
        console.error("Error fetching existing shapes:", error);
        return [];
    }
}