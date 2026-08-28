import { z } from "zod";
import { searchRoutes, getRoute, searchWaypoints, } from "../api/camptocamp.js";
import { normalizeActivities, normalizeOrientations, validateGlobalRating, validateRockFreeRating, } from "../converters/routes.js";
export const searchRoutesSchema = z.object({
    query: z
        .string()
        .optional()
        .describe("Optional title search, for example 'Mont Blanc voie normale'. Do not use a location name here unless searching route titles."),
    location: z
        .string()
        .trim()
        .min(1)
        .optional()
        .describe("Natural geographic location or mountain sector, for example 'La Bérarde'. The tool resolves it to a Camptocamp waypoint and searches routes associated with that waypoint."),
    activities: z
        .array(z.string())
        .optional()
        .describe("Activities to search. Camptocamp identifiers and common aliases are accepted, for example ['rock_climbing'], ['escalade'], ['climbing'] or ['alpinisme']."),
    global_rating_min: z
        .string()
        .optional()
        .describe("Minimum global difficulty, for example 'PD' or 'D-'."),
    global_rating_max: z
        .string()
        .optional()
        .describe("Maximum global difficulty, for example 'D+'."),
    rock_free_rating_min: z
        .string()
        .optional()
        .describe("Minimum free-climbing grade, for example '5a'."),
    rock_free_rating_max: z
        .string()
        .optional()
        .describe("Maximum free-climbing grade, for example '6a+'."),
    elevation_min: z
        .number()
        .int()
        .nonnegative()
        .optional()
        .describe("Minimum route elevation in metres."),
    elevation_max: z
        .number()
        .int()
        .nonnegative()
        .optional()
        .describe("Maximum route elevation in metres."),
    height_diff_min: z
        .number()
        .int()
        .nonnegative()
        .optional()
        .describe("Minimum ascent elevation gain in metres."),
    height_diff_max: z
        .number()
        .int()
        .nonnegative()
        .optional()
        .describe("Maximum ascent elevation gain in metres."),
    orientations: z
        .array(z.string())
        .optional()
        .describe("Route orientations. Cardinal identifiers and common French or English names are accepted, for example ['SE'], ['sud-est'] or ['south-east']."),
    bbox: z
        .string()
        .optional()
        .describe("Advanced raw Camptocamp bounding box. Prefer location whenever possible. Use bbox only when precise API coordinates are already known."),
    sort: z
        .string()
        .optional()
        .describe("Raw Camptocamp sort expression, for example a supported field or comma-separated fields."),
    offset: z
        .number()
        .int()
        .min(0)
        .optional()
        .default(0)
        .describe("Number of matching routes to skip."),
    limit: z
        .number()
        .int()
        .min(1)
        .max(50)
        .optional()
        .default(10)
        .describe("Maximum number of results."),
});
export const getRouteSchema = z.object({
    id: z
        .number()
        .int()
        .positive()
        .describe("Route ID from Camptocamp"),
});
function formatRouteSearchResult(response) {
    if (response.documents.length === 0) {
        return "No routes found.";
    }
    const lines = [
        `Found ${response.total} route(s). Showing ${response.documents.length}:\n`,
    ];
    for (const route of response.documents) {
        const locale = route.locales.find((item) => item.lang === "fr") ??
            route.locales[0];
        const title = locale?.title ?? "Untitled";
        const activities = route.activities.join(", ");
        const elevation = route.elevation_max !== undefined
            ? ` | Max elevation: ${route.elevation_max}m`
            : "";
        const globalRating = route.global_rating
            ? ` | Rating: ${route.global_rating}`
            : "";
        const rockRating = route.rock_free_rating
            ? ` | Free grade: ${route.rock_free_rating}`
            : "";
        const difficultyHeight = route.height_diff_difficulties !== undefined
            ? ` | Difficulties height: ${route.height_diff_difficulties}m`
            : "";
        lines.push(`- [${route.document_id}] ${title} (${activities})` +
            `${elevation}${globalRating}${rockRating}${difficultyHeight}`);
    }
    return lines.join("\n");
}
function formatRouteDetail(route) {
    const locale = route.locales.find((item) => item.lang === "fr") ??
        route.locales[0];
    const lines = [];
    lines.push(`# ${locale?.title ?? "Untitled"} (ID: ${route.document_id})`);
    lines.push(`\n**Activities**: ${route.activities.join(", ")}`);
    if (route.global_rating) {
        lines.push(`**Global rating**: ${route.global_rating}`);
    }
    if (route.rock_free_rating) {
        lines.push(`**Rock free rating**: ${route.rock_free_rating}`);
    }
    if (route.rock_required_rating) {
        lines.push(`**Rock required rating**: ${route.rock_required_rating}`);
    }
    if (route.engagement_rating) {
        lines.push(`**Engagement**: ${route.engagement_rating}`);
    }
    if (route.equipment_rating) {
        lines.push(`**Equipment**: ${route.equipment_rating}`);
    }
    if (route.elevation_max !== undefined) {
        lines.push(`**Max elevation**: ${route.elevation_max}m`);
    }
    if (route.elevation_min !== undefined) {
        lines.push(`**Min elevation**: ${route.elevation_min}m`);
    }
    if (route.height_diff_up !== undefined) {
        lines.push(`**Elevation gain**: ${route.height_diff_up}m`);
    }
    if (route.height_diff_down !== undefined) {
        lines.push(`**Elevation loss**: ${route.height_diff_down}m`);
    }
    if (locale?.description) {
        lines.push(`\n## Description\n${locale.description}`);
    }
    if (locale?.remarks) {
        lines.push(`\n## Remarks\n${locale.remarks}`);
    }
    if (locale?.gear) {
        lines.push(`\n## Gear\n${locale.gear}`);
    }
    return lines.join("\n");
}
function normalizeLocationName(value) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLocaleLowerCase("fr");
}
async function resolveLocationWaypointId(location) {
    const response = await searchWaypoints(location, 10);
    if (response.documents.length === 0) {
        throw new Error(`No Camptocamp waypoint found for location "${location}".`);
    }
    const normalizedLocation = normalizeLocationName(location);
    const exactFrenchMatch = response.documents.find((waypoint) => waypoint.locales.some((locale) => locale.lang === "fr" &&
        normalizeLocationName(locale.title) === normalizedLocation));
    if (exactFrenchMatch) {
        return exactFrenchMatch.document_id;
    }
    const exactAnyLanguageMatch = response.documents.find((waypoint) => waypoint.locales.some((locale) => normalizeLocationName(locale.title) === normalizedLocation));
    if (exactAnyLanguageMatch) {
        return exactAnyLanguageMatch.document_id;
    }
    return response.documents[0].document_id;
}
export async function handleSearchRoutes(input) {
    const waypointIds = input.location
        ? [await resolveLocationWaypointId(input.location)]
        : undefined;
    const activities = normalizeActivities(input.activities);
    const orientations = normalizeOrientations(input.orientations);
    const globalRatingMin = validateGlobalRating(input.global_rating_min, "global_rating_min");
    const globalRatingMax = validateGlobalRating(input.global_rating_max, "global_rating_max");
    const rockFreeRatingMin = validateRockFreeRating(input.rock_free_rating_min, "rock_free_rating_min");
    const rockFreeRatingMax = validateRockFreeRating(input.rock_free_rating_max, "rock_free_rating_max");
    const response = await searchRoutes({
        query: input.query,
        activities,
        waypointIds,
        globalRatingMin,
        globalRatingMax,
        rockFreeRatingMin,
        rockFreeRatingMax,
        elevationMin: input.elevation_min,
        elevationMax: input.elevation_max,
        heightDiffMin: input.height_diff_min,
        heightDiffMax: input.height_diff_max,
        orientations,
        bbox: input.bbox,
        sort: input.sort,
        offset: input.offset,
        limit: input.limit,
    });
    return formatRouteSearchResult(response);
}
export async function handleGetRoute(input) {
    const route = await getRoute(input.id);
    return formatRouteDetail(route);
}
export const routeToolDefinitions = [
    {
        name: "search_routes",
        description: "Search Camptocamp mountain routes using natural geographic locations, activities, difficulty, climbing grades, elevation, height difference and orientation. When location is provided, the tool automatically resolves it to a Camptocamp waypoint. Common French and English aliases are accepted for activities and orientations.",
        inputSchema: searchRoutesSchema,
        handler: handleSearchRoutes,
    },
    {
        name: "get_route",
        description: "Get full details of a specific route from Camptocamp.org by its ID, including description, ratings, elevation data and gear requirements.",
        inputSchema: getRouteSchema,
        handler: handleGetRoute,
    },
];
//# sourceMappingURL=routes.js.map