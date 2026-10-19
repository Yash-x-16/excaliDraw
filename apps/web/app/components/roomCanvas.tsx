"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Canvas from "./canvas";

export default function RoomCanvas({ roomId }: { roomId: string }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push(`/signin?redirect=/canvas/${encodeURIComponent(roomId)}`);
            return;
        }
        setIsAuthenticated(true);
    }, [roomId, router]);

    if (isAuthenticated === null) {
        return (
            <div className="w-screen h-screen bg-black flex flex-col items-center justify-center gap-3 text-zinc-400">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs">Checking authorization...</span>
            </div>
        );
    }

    return <Canvas roomId={roomId} />;
}