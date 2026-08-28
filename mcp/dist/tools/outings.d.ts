import { z } from "zod";
export declare const searchUserOutingsSchema: z.ZodObject<{
    user_id: z.ZodNumber;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    user_id: number;
}, {
    user_id: number;
    limit?: number | undefined;
}>;
export declare const getOutingSchema: z.ZodObject<{
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: number;
}, {
    id: number;
}>;
export type SearchUserOutingsInput = z.infer<typeof searchUserOutingsSchema>;
export type GetOutingInput = z.infer<typeof getOutingSchema>;
export declare function handleSearchUserOutings(input: SearchUserOutingsInput): Promise<string>;
export declare function handleGetOuting(input: GetOutingInput): Promise<string>;
export declare const outingToolDefinitions: ({
    name: string;
    description: string;
    inputSchema: z.ZodObject<{
        user_id: z.ZodNumber;
        limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        limit: number;
        user_id: number;
    }, {
        user_id: number;
        limit?: number | undefined;
    }>;
    handler: typeof handleSearchUserOutings;
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
    handler: typeof handleGetOuting;
})[];
//# sourceMappingURL=outings.d.ts.map