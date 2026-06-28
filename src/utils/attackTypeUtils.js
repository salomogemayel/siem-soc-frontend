export const ATTACK_TYPES = {
    bruteForce: "Brute Force",
    unauthorizedAccess: "Unauthorized Access",
    dos: "DoS / DDoS",
    sqlInjection: "SQL Injection",
    webAttack: "Web Attack / Exploit", // Kategori baru
    unusualIp: "Unusual IP Login",
    integrity: "File Integrity",
    system: "System Activity",
    authSuccess: "Authentication Success", // Kategori baru yang sering memenuhi log
    privilegeEscalation: "Privilege Escalation", // Kategori baru
    unknown: "Other Alert",
};

export const getAttackType = (alert) => {
    const description = String(alert.description || "").toLowerCase();

    // Pertahankan format array dari groups untuk dynamic fallback nanti
    const groupsArray = Array.isArray(alert.groups) ? alert.groups : [];
    const groupsString = groupsArray.join(" ").toLowerCase();

    const ruleId = String(alert.rule_id || "");

    // 1. Brute Force & Failed Logins
    if (
        ruleId === "100101" ||
        description.includes("brute") ||
        description.includes("failed login") ||
        description.includes("authentication failed") ||
        groupsString.includes("authentication_failed")
    ) {
        return ATTACK_TYPES.bruteForce;
    }

    // 2. Authentication Success (Sangat umum dan sering membuat "Other Alert" membengkak)
    if (
        description.includes("successful login") ||
        description.includes("login session opened") ||
        groupsString.includes("authentication_success")
    ) {
        return ATTACK_TYPES.authSuccess;
    }

    // 3. Privilege Escalation / Sudo
    if (
        description.includes("incorrect password attempt") ||
        description.includes("user not in sudoers") ||
        groupsString.includes("sudo") ||
        groupsString.includes("privilege_escalation")
    ) {
        return ATTACK_TYPES.privilegeEscalation;
    }

    // 4. Unauthorized Access
    if (
        ["100210", "100211", "100212", "100220", "100221"].includes(ruleId) ||
        description.includes("forbidden") ||
        description.includes("unauthorized") ||
        description.includes("403") ||
        description.includes("sensitive")
    ) {
        return ATTACK_TYPES.unauthorizedAccess;
    }

    // 5. DoS / DDoS
    if (
        ["100200", "100201"].includes(ruleId) ||
        description.includes("ddos") ||
        description.includes("dos") ||
        description.includes("high request") ||
        description.includes("request flood")
    ) {
        return ATTACK_TYPES.dos;
    }

    // 6. SQL Injection
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

    // 7. Web Attacks Lainnya (XSS, LFI, RFI)
    if (
        description.includes("xss") ||
        description.includes("cross site scripting") ||
        description.includes("local file inclusion") ||
        groupsString.includes("web_attack") ||
        groupsString.includes("web_scan")
    ) {
        return ATTACK_TYPES.webAttack;
    }

    // 8. Unusual IP Login
    if (
        alert.soc_alert_type === "unusual_ip" ||
        description.includes("unusual ip") ||
        description.includes("new ip")
    ) {
        return ATTACK_TYPES.unusualIp;
    }

    // 9. File Integrity
    if (
        groupsString.includes("syscheck") ||
        description.includes("integrity checksum") ||
        description.includes("file added") ||
        description.includes("file modified")
    ) {
        return ATTACK_TYPES.integrity;
    }

    // 10. System Activity
    if (
        description.includes("listened ports") ||
        description.includes("netstat") ||
        description.includes("system") ||
        groupsString.includes("ossec") ||
        groupsString.includes("wazuh")
    ) {
        return ATTACK_TYPES.system;
    }

    // ==========================================
    // DYNAMIC FALLBACK (Mencegah Other Alert)
    // ==========================================
    // Jika tidak masuk ke kategori statis di atas, kita gunakan nama grup bawaan Wazuh
    if (groupsArray.length > 0) {
        // Cari grup spesifik (abaikan grup generik seperti 'syslog' jika ada yang lebih spesifik)
        const specificGroup = groupsArray.find(g =>
            g.toLowerCase() !== 'syslog' &&
            g.toLowerCase() !== 'ossec'
        );

        const targetGroup = specificGroup || groupsArray[0];

        if (targetGroup) {
            // Ubah format string (contoh: "authentication_failures" menjadi "Authentication Failures")
            return targetGroup
                .split(/[_,-]/)
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
        }
    }

    // Jika semua cara gagal dan alert.groups kosong, barulah diklasifikasikan sebagai Other Alert
    return ATTACK_TYPES.unknown;
};