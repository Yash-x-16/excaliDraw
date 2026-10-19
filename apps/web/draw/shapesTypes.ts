export type shape = {
        id?: string;
        type: "rect";
        x: number;
        y: number;
        width: number;
        height: number;
        color?: string;
    }  | 
        {
            id?: string;
            type: "circle";
            startX: number;
            startY: number;
            radius: number;
            color?: string;
        }  | {
            id?: string;
            type: "line";
            startX: number;
            startY: number;
            endX: number;
            endY: number;
            color?: string;
        } | {
            id?: string;
            type: "pencil";
            points: { x: number; y: number }[];
            color?: string;
        } | {
            id?: string;
            type: "arrow";
            startX: number;
            startY: number;
            endX: number;
            endY: number;
            color?: string;
        } | {
            id?: string;
            type: "text";
            x: number;
            y: number;
            text: string;
            color?: string;
        };

export type tools = "rect" | "circle" | "pencil" | "arrow" | "line" | "text" | "select";