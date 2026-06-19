export const ATTACK_TYPES = {
    bruteForce: "Brute Force",
    unauthorizedAccess: "Unauthorized Access",
    dos: "DoS / DDoS",
    sqlInjection: "SQL Injection",
    unusualIp: "Unusual IP Login",
    integrity: "File Integrity",
    system: "System Activity",
    unknown: "Other Alert",
};

export const getAttackType = (alert) => {
    const description = String(alert.description || "").toLowerCase();
    const groups = Array.isArray(alert.groups)
        ? alert.groups.join(" ").toLowerCase()
        : "";
    const ruleId = String(alert.rule_id || "");

    if (
        ruleId === "100101" ||
        description.includes("brute") ||
        description.includes("failed login") ||
        description.includes("authentication failed")
    ) {
        return ATTACK_TYPES.bruteForce;
    }

    if (
        ["100210", "100211", "100212", "100220", "100221"].includes(ruleId) ||
        description.includes("forbidden") ||
        description.includes("unauthorized") ||
        description.includes("403") ||
        description.includes("sensitive")
    ) {
        return ATTACK_TYPES.unauthorizedAccess;
    }

    if (
        ["100200", "100201"].includes(ruleId) ||
        description.includes("ddos") ||
        description.includes("dos") ||
        description.includes("high request") ||
        description.includes("request flood")
    ) {
        return ATTACK_TYPES.dos;
    }

    if (
        description.includes("sql injection") ||
        description.includes("sqli") ||
        description.includes("select ") ||
        description.includes("union ") ||
        description.includes("drop ") ||
        description.includes("insert ") ||
        description.includes("update ") ||
        description.includes("delete ")
    ) {
        return ATTACK_TYPES.sqlInjection;
    }

    if (
        alert.soc_alert_type === "unusual_ip" ||
        description.includes("unusual ip") ||
        description.includes("new ip")
    ) {
        return ATTACK_TYPES.unusualIp;
    }

    if (
        groups.includes("syscheck") ||
        description.includes("integrity checksum") ||
        description.includes("file added") ||
        description.includes("file modified")
    ) {
        return ATTACK_TYPES.integrity;
    }

    if (
        description.includes("listened ports") ||
        description.includes("netstat") ||
        description.includes("system")
    ) {
        return ATTACK_TYPES.system;
    }

    return ATTACK_TYPES.unknown;
};