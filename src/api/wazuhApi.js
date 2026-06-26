import api from "./axios";

export const getRules = () => api.get("/wazuh/rules");

export const getManager = () => api.get("/wazuh/manager");

export const getAlerts = ({
                              page = 1,
                              size = 20,
                              level = "",
                              levelGte = "",
                              severity = "",
                              search = "",
                              agent = "",
                              ruleId = "",
                              mitre = "",
                              group = "",
                              timeRange = "24h",
                              dateFrom = "",
                              dateTo = "",
                              sortBy = "timestamp",
                              sortOrder = "desc",
                              includeSoc = 0,
                              alertView = "incident",
                          } = {}) =>
    api.get("/wazuh/alerts", {
        params: {
            page,
            size,
            level,
            level_gte: levelGte,
            severity,
            search,
            agent_id: agent,
            rule_id: ruleId,
            mitre,
            group,
            time_range: timeRange,
            date_from: dateFrom,
            date_to: dateTo,
            sort_by: sortBy,
            sort_order: sortOrder,
            include_soc: includeSoc,
            alert_view: alertView,
        },
    });

export const getAlertDetail = (id) => api.get(`/wazuh/alerts/${id}`);

export const getAgents = ({
                              page = 1,
                              size = 20,
                              search = "",
                              status = "",
                          } = {}) =>
    api.get("/wazuh/agents", {
        params: {
            page,
            size,
            search,
            status,
        },
    });

export const getLogs = ({
                            page = 1,
                            size = 20,
                            search = "",
                            agentId = "",
                            location = "",
                            decoder = "",
                            program = "",
                            timeRange = "24h",
                            dateFrom = "",
                            dateTo = "",
                            logType = "",
                        } = {}) =>
    api.get("/wazuh/logs", {
        params: {
            page,
            size,
            search,
            agent_id: agentId,
            location,
            decoder,
            program,
            time_range: timeRange,
            date_from: dateFrom,
            date_to: dateTo,
            log_type: logType,
        },
    });

export const getLogFilters = () => api.get("/wazuh/logs/filters");