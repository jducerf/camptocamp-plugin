const BASE_URL = "https://api.camptocamp.org";
const DEFAULT_LANG = "fr";
const DEFAULT_LIMIT = 10;
export async function searchRoutes(queryOrFilters, limit = DEFAULT_LIMIT, lang = DEFAULT_LANG) {
    if (typeof queryOrFilters === "string") {
        return searchRoutesAdvanced({
            query: queryOrFilters,
            limit,
        }, lang);
    }
    return searchRoutesAdvanced(queryOrFilters, lang);
}
function createRangeValue(minimum, maximum) {
    if (minimum === undefined && maximum === undefined) {
        return undefined;
    }
    return `${minimum ?? ""},${maximum ?? ""}`;
}
export async function searchRoutesAdvanced(filters, lang = DEFAULT_LANG) {
    const params = new URLSearchParams({
        lang,
        limit: String(filters.limit ?? DEFAULT_LIMIT),
    });
    if (filters.offset !== undefined) {
        params.set("offset", String(filters.offset));
    }
    if (filters.query?.trim()) {
        params.set("q", filters.query.trim());
    }
    if (filters.activities?.length) {
        params.set("act", filters.activities.join(","));
    }
    if (filters.waypointIds?.length) {
        params.set("w", filters.waypointIds.join(","));
    }
    const globalRating = createRangeValue(filters.globalRatingMin, filters.globalRatingMax);
    if (globalRating) {
        params.set("grat", globalRating);
    }
    const rockFreeRating = createRangeValue(filters.rockFreeRatingMin, filters.rockFreeRatingMax);
    if (rockFreeRating) {
        params.set("frat", rockFreeRating);
    }
    const elevation = createRangeValue(filters.elevationMin, filters.elevationMax);
    if (elevation) {
        params.set("ele", elevation);
    }
    const heightDiff = createRangeValue(filters.heightDiffMin, filters.heightDiffMax);
    if (heightDiff) {
        params.set("hdif", heightDiff);
    }
    if (filters.orientations?.length) {
        params.set("fac", filters.orientations.join(","));
    }
    if (filters.bbox?.trim()) {
        params.set("bbox", filters.bbox.trim());
    }
    if (filters.sort?.trim()) {
        params.set("sort", filters.sort.trim());
    }
    const response = await fetch(`${BASE_URL}/routes?${params}`);
    if (!response.ok) {
        throw new Error(`Camptocamp API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
}
export async function getRoute(id, lang = DEFAULT_LANG) {
    const params = new URLSearchParams({ lang });
    const response = await fetch(`${BASE_URL}/routes/${id}?${params}`);
    if (!response.ok) {
        throw new Error(`Camptocamp API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
}
export async function searchWaypoints(query, limit = DEFAULT_LIMIT, lang = DEFAULT_LANG) {
    const params = new URLSearchParams({ q: query, limit: String(limit), lang });
    const response = await fetch(`${BASE_URL}/waypoints?${params}`);
    if (!response.ok) {
        throw new Error(`Camptocamp API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
}
export async function getWaypoint(id, lang = DEFAULT_LANG) {
    const params = new URLSearchParams({ lang });
    const response = await fetch(`${BASE_URL}/waypoints/${id}?${params}`);
    if (!response.ok) {
        throw new Error(`Camptocamp API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
}
export async function searchUserOutings(userId, limit = DEFAULT_LIMIT, lang = DEFAULT_LANG) {
    const params = new URLSearchParams({ u: String(userId), limit: String(limit), lang });
    const response = await fetch(`${BASE_URL}/outings?${params}`);
    if (!response.ok) {
        throw new Error(`Camptocamp API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
}
export async function getOuting(id, lang = DEFAULT_LANG) {
    const params = new URLSearchParams({ lang });
    const response = await fetch(`${BASE_URL}/outings/${id}?${params}`);
    if (!response.ok) {
        throw new Error(`Camptocamp API error: ${response.status} ${response.statusText}`);
    }
    return response.json();
}
//# sourceMappingURL=camptocamp.js.map