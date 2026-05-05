import api from "./axios";

export const getRules = () => api.get("/wazuh/rules");
export const getManager = () => api.get("/wazuh/manager");
export const getAlerts = ({ page = 1, size = 20, level = "", search = "" }) =>
    api.get("/wazuh/alerts", {
        params: { page, size, level,search },
    });
export const getAgents = ({ page = 1, size = 20, search = "", status = "" }) =>
    api.get("/wazuh/agents", {
        params: { page, size, search, status },
    });

