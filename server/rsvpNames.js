/**
 * Normalize a name for duplicate comparison (trim, collapse spaces, lowercase).
 * @param {string} s
 */
export function normalizeName(s) {
    return String(s)
        .trim()
        .replace(/\s+/g, ' ')
        .toLowerCase();
}

/**
 * @param {string} s
 * @returns {boolean}
 */
export function isValidFullName(s) {
    const t = String(s).trim();
    if (t.length < 2 || t.length > 120) return false;
    // At least two letters (any script)
    const letters = t.match(/\p{L}/gu);
    return Boolean(letters && letters.length >= 2);
}

/**
 * Collect normalized name keys from all RSVP rows (comma-separated names per row).
 * @param {{ name?: string }[]} rows
 * @returns {Set<string>}
 */
export function buildRegisteredNameSet(rows) {
    const set = new Set();
    for (const row of rows) {
        if (!row?.name) continue;
        for (const part of String(row.name).split(',')) {
            const n = normalizeName(part);
            if (n.length >= 2) set.add(n);
        }
    }
    return set;
}
