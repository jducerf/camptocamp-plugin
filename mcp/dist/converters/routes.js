const ACTIVITY_ALIASES = {
    rock_climbing: "rock_climbing",
    climbing: "rock_climbing",
    escalade: "rock_climbing",
    rock: "rock_climbing",
    trad: "rock_climbing",
    multipitch: "rock_climbing",
    grande_voie: "rock_climbing",
    "grande voie": "rock_climbing",
    mountain_climbing: "mountain_climbing",
    mountaineering: "mountain_climbing",
    alpinism: "mountain_climbing",
    alpinisme: "mountain_climbing",
    hiking: "hiking",
    hike: "hiking",
    randonnée: "hiking",
    randonnee: "hiking",
    skitouring: "skitouring",
    ski_touring: "skitouring",
    "ski touring": "skitouring",
    ski_de_randonnée: "skitouring",
    ski_de_randonnee: "skitouring",
    "ski de randonnée": "skitouring",
    "ski de randonnee": "skitouring",
    snow_ice_mixed: "snow_ice_mixed",
    mixed: "snow_ice_mixed",
    mixte: "snow_ice_mixed",
    neige_glace_mixte: "snow_ice_mixed",
    ice_climbing: "ice_climbing",
    cascade_de_glace: "ice_climbing",
    "cascade de glace": "ice_climbing",
};
const ORIENTATION_ALIASES = {
    n: "N",
    north: "N",
    nord: "N",
    ne: "NE",
    northeast: "NE",
    "north-east": "NE",
    nordest: "NE",
    "nord-est": "NE",
    e: "E",
    east: "E",
    est: "E",
    se: "SE",
    southeast: "SE",
    "south-east": "SE",
    sudest: "SE",
    "sud-est": "SE",
    s: "S",
    south: "S",
    sud: "S",
    sw: "SW",
    southwest: "SW",
    "south-west": "SW",
    sudouest: "SW",
    "sud-ouest": "SW",
    w: "W",
    west: "W",
    ouest: "W",
    nw: "NW",
    northwest: "NW",
    "north-west": "NW",
    nordouest: "NW",
    "nord-ouest": "NW",
};
const GLOBAL_RATINGS = new Set([
    "F-",
    "F",
    "F+",
    "PD-",
    "PD",
    "PD+",
    "AD-",
    "AD",
    "AD+",
    "D-",
    "D",
    "D+",
    "TD-",
    "TD",
    "TD+",
    "ED-",
    "ED",
    "ED+",
    "ABO-",
    "ABO",
    "ABO+",
]);
function normalizeAliasKey(value) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLocaleLowerCase("fr")
        .replace(/\s+/g, " ");
}
export function normalizeActivities(activities) {
    if (!activities?.length) {
        return undefined;
    }
    const normalized = activities.map((activity) => {
        const key = normalizeAliasKey(activity);
        const underscoredKey = key.replace(/\s+/g, "_");
        const resolved = ACTIVITY_ALIASES[key] ??
            ACTIVITY_ALIASES[underscoredKey];
        if (!resolved) {
            throw new Error(`Unsupported activity "${activity}". ` +
                "Use a Camptocamp activity such as rock_climbing, " +
                "mountain_climbing, hiking, skitouring, " +
                "snow_ice_mixed or ice_climbing.");
        }
        return resolved;
    });
    return [...new Set(normalized)];
}
export function normalizeOrientations(orientations) {
    if (!orientations?.length) {
        return undefined;
    }
    const normalized = orientations.map((orientation) => {
        const key = normalizeAliasKey(orientation).replace(/\s+/g, "");
        const resolved = ORIENTATION_ALIASES[key];
        if (!resolved) {
            throw new Error(`Unsupported orientation "${orientation}". ` +
                "Use N, NE, E, SE, S, SW, W or NW.");
        }
        return resolved;
    });
    return [...new Set(normalized)];
}
export function validateGlobalRating(value, fieldName) {
    if (value === undefined) {
        return undefined;
    }
    const normalized = value.trim().toUpperCase();
    if (!GLOBAL_RATINGS.has(normalized)) {
        if (/^[3-9][abc][+-]?$/i.test(normalized)) {
            throw new Error(`${fieldName} must contain an alpine global rating. ` +
                `Received "${value}", which looks like a free-climbing grade. ` +
                `Use rock_free_rating_min or rock_free_rating_max instead.`);
        }
        throw new Error(`Invalid ${fieldName} "${value}". ` +
            "Expected an alpine grade such as PD, AD+, D-, TD or ED+.");
    }
    return normalized;
}
export function validateRockFreeRating(value, fieldName) {
    if (value === undefined) {
        return undefined;
    }
    const normalized = value.trim().toLowerCase();
    if (!/^[3-9][abc][+-]?$/.test(normalized)) {
        if (GLOBAL_RATINGS.has(value.trim().toUpperCase())) {
            throw new Error(`${fieldName} must contain a free-climbing grade. ` +
                `Received "${value}", which looks like an alpine global rating. ` +
                `Use global_rating_min or global_rating_max instead.`);
        }
        throw new Error(`Invalid ${fieldName} "${value}". ` +
            "Expected a free-climbing grade such as 5a, 5c+, 6a or 6b+.");
    }
    return normalized;
}
//# sourceMappingURL=routes.js.map