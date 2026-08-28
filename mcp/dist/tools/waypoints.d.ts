import { z } from "zod";
export declare const searchWaypointsSchema: z.ZodObject<{
    query: z.ZodString;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    query: string;
}, {
    query: string;
    limit?: number | undefined;
}>;
export declare const getWaypointSchema: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
export type SearchWaypointsInput = z.infer<typeof searchWaypointsSchema>;
export type GetWaypointInput = z.infer<typeof getWaypointSchema>;
export declare function handleSearchWaypoints(input: SearchWaypointsInput): Promise<string>;
export declare function handleGetWaypoint(input: GetWaypointInput): Promise<string>;
export declare const waypointToolDefinitions: ({
    name: string;
    description: string;
    inputSchema: z.ZodObject<{
        query: z.ZodString;
        limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        limit: number;
        query: string;
    }, {
        query: string;
        limit?: number | undefined;
    }>;
    handler: typeof handleSearchWaypoints;
} | {
    name: string;
    description: string;
    inputSchema: z.ZodObject<{
        id: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: number;
    }, {
        id: number;
    }>;
    handler: typeof handleGetWaypoint;
})[];
//# sourceMappingURL=waypoints.d.ts.map