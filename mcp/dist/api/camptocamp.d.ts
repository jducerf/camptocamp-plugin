export interface RouteSearchResult {
    document_id: number;
    locales: Array<{
        lang: string;
        title: string;
        title_prefix?: string;
    }>;
    activities: string[];
    elevation_max?: number;
    height_diff_difficulties?: number;
    rock_free_rating?: string;
    global_rating?: string;
}
export interface RouteSearchResponse {
    documents: RouteSearchResult[];
    total: number;
}
export interface RouteSearchFilters {
    query?: string;
    activities?: string[];
    waypointIds?: number[];
    globalRatingMin?: string;
    globalRatingMax?: string;
    rockFreeRatingMin?: string;
    rockFreeRatingMax?: string;
    elevationMin?: number;
    elevationMax?: number;
    heightDiffMin?: number;
    heightDiffMax?: number;
    orientations?: string[];
    bbox?: string;
    sort?: string;
    offset?: number;
    limit?: number;
}
export interface RouteDetail {
    document_id: number;
    locales: Array<{
        lang: string;
        title: string;
        description?: string;
        remarks?: string;
        gear?: string;
        route_history?: string;
    }>;
    activities: string[];
    elevation_max?: number;
    elevation_min?: number;
    height_diff_up?: number;
    height_diff_down?: number;
    rock_free_rating?: string;
    rock_required_rating?: string;
    global_rating?: string;
    engagement_rating?: string;
    equipment_rating?: string;
    durations?: string[];
    main_waypoint_id?: number;
    geometry?: {
        geom_detail?: string;
    };
}
export interface WaypointSearchResult {
    document_id: number;
    locales: Array<{
        lang: string;
        title: string;
    }>;
    waypoint_type: string;
    elevation?: number;
}
export interface WaypointSearchResponse {
    documents: WaypointSearchResult[];
    total: number;
}
export interface WaypointDetail {
    document_id: number;
    locales: Array<{
        lang: string;
        title: string;
        description?: string;
        access?: string;
    }>;
    waypoint_type: string;
    elevation?: number;
    geometry?: {
        geom?: string;
    };
}
export declare function searchRoutes(queryOrFilters: string | RouteSearchFilters, limit?: number, lang?: string): Promise<RouteSearchResponse>;
export declare function searchRoutesAdvanced(filters: RouteSearchFilters, lang?: string): Promise<RouteSearchResponse>;
export declare function getRoute(id: number, lang?: string): Promise<RouteDetail>;
export declare function searchWaypoints(query: string, limit?: number, lang?: string): Promise<WaypointSearchResponse>;
export declare function getWaypoint(id: number, lang?: string): Promise<WaypointDetail>;
export interface OutingSearchResult {
    document_id: number;
    locales: Array<{
        lang: string;
        title: string;
    }>;
    activities: string[];
    date_start?: string;
    date_end?: string;
    elevation_max?: number;
    height_diff_up?: number;
    global_rating?: string;
    hiking_rating?: string;
    rock_free_rating?: string;
    author?: {
        name: string;
        user_id: number;
    };
}
export interface OutingSearchResponse {
    documents: OutingSearchResult[];
    total: number;
}
export interface OutingDetail {
    document_id: number;
    locales: Array<{
        lang: string;
        title: string;
        description?: string;
        conditions?: string;
        participants?: string;
        route_description?: string;
        timing?: string;
        weather?: string;
    }>;
    activities: string[];
    date_start?: string;
    date_end?: string;
    elevation_max?: number;
    elevation_min?: number;
    height_diff_up?: number;
    height_diff_down?: number;
    global_rating?: string;
    engagement_rating?: string;
    equipment_rating?: string;
    hiking_rating?: string;
    rock_free_rating?: string;
    condition_rating?: string;
    participant_count?: number;
    author?: {
        name: string;
        user_id: number;
    };
    associations?: {
        routes?: Array<{
            document_id: number;
            locales: Array<{
                lang: string;
                title: string;
            }>;
        }>;
    };
}
export declare function searchUserOutings(userId: number, limit?: number, lang?: string): Promise<OutingSearchResponse>;
export declare function getOuting(id: number, lang?: string): Promise<OutingDetail>;
//# sourceMappingURL=camptocamp.d.ts.map