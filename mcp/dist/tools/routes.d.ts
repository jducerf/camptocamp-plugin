import { z } from "zod";
export declare const searchRoutesSchema: z.ZodObject<{
    query: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    activities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    global_rating_min: z.ZodOptional<z.ZodString>;
    global_rating_max: z.ZodOptional<z.ZodString>;
    rock_free_rating_min: z.ZodOptional<z.ZodString>;
    rock_free_rating_max: z.ZodOptional<z.ZodString>;
    elevation_min: z.ZodOptional<z.ZodNumber>;
    elevation_max: z.ZodOptional<z.ZodNumber>;
    height_diff_min: z.ZodOptional<z.ZodNumber>;
    height_diff_max: z.ZodOptional<z.ZodNumber>;
    orientations: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    bbox: z.ZodOptional<z.ZodString>;
    sort: z.ZodOptional<z.ZodString>;
    offset: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    offset: number;
    bbox?: string | undefined;
    sort?: string | undefined;
    query?: string | undefined;
    location?: string | undefined;
    activities?: string[] | undefined;
    global_rating_min?: string | undefined;
    global_rating_max?: string | undefined;
    rock_free_rating_min?: string | undefined;
    rock_free_rating_max?: string | undefined;
    elevation_min?: number | undefined;
    elevation_max?: number | undefined;
    height_diff_min?: number | undefined;
    height_diff_max?: number | undefined;
    orientations?: string[] | undefined;
}, {
    limit?: number | undefined;
    offset?: number | undefined;
    bbox?: string | undefined;
    sort?: string | undefined;
    query?: string | undefined;
    location?: string | undefined;
    activities?: string[] | undefined;
    global_rating_min?: string | undefined;
    global_rating_max?: string | undefined;
    rock_free_rating_min?: string | undefined;
    rock_free_rating_max?: string | undefined;
    elevation_min?: number | undefined;
    elevation_max?: number | undefined;
    height_diff_min?: number | undefined;
    height_diff_max?: number | undefined;
    orientations?: string[] | undefined;
}>;
export declare const getRouteSchema: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
export type SearchRoutesInput = z.infer<typeof searchRoutesSchema>;
export type GetRouteInput = z.infer<typeof getRouteSchema>;
export declare function handleSearchRoutes(input: SearchRoutesInput): Promise<string>;
export declare function handleGetRoute(input: GetRouteInput): Promise<string>;
export declare const routeToolDefinitions: ({
    name: string;
    description: string;
    inputSchema: z.ZodObject<{
        query: z.ZodOptional<z.ZodString>;
        location: z.ZodOptional<z.ZodString>;
        activities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        global_rating_min: z.ZodOptional<z.ZodString>;
        global_rating_max: z.ZodOptional<z.ZodString>;
        rock_free_rating_min: z.ZodOptional<z.ZodString>;
        rock_free_rating_max: z.ZodOptional<z.ZodString>;
        elevation_min: z.ZodOptional<z.ZodNumber>;
        elevation_max: z.ZodOptional<z.ZodNumber>;
        height_diff_min: z.ZodOptional<z.ZodNumber>;
        height_diff_max: z.ZodOptional<z.ZodNumber>;
        orientations: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        bbox: z.ZodOptional<z.ZodString>;
        sort: z.ZodOptional<z.ZodString>;
        offset: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        limit: number;
        offset: number;
        bbox?: string | undefined;
        sort?: string | undefined;
        query?: string | undefined;
        location?: string | undefined;
        activities?: string[] | undefined;
        global_rating_min?: string | undefined;
        global_rating_max?: string | undefined;
        rock_free_rating_min?: string | undefined;
        rock_free_rating_max?: string | undefined;
        elevation_min?: number | undefined;
        elevation_max?: number | undefined;
        height_diff_min?: number | undefined;
        height_diff_max?: number | undefined;
        orientations?: string[] | undefined;
    }, {
        limit?: number | undefined;
        offset?: number | undefined;
        bbox?: string | undefined;
        sort?: string | undefined;
        query?: string | undefined;
        location?: string | undefined;
        activities?: string[] | undefined;
        global_rating_min?: string | undefined;
        global_rating_max?: string | undefined;
        rock_free_rating_min?: string | undefined;
        rock_free_rating_max?: string | undefined;
        elevation_min?: number | undefined;
        elevation_max?: number | undefined;
        height_diff_min?: number | undefined;
        height_diff_max?: number | undefined;
        orientations?: string[] | undefined;
    }>;
    handler: typeof handleSearchRoutes;
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
    handler: typeof handleGetRoute;
})[];
//# sourceMappingURL=routes.d.ts.map