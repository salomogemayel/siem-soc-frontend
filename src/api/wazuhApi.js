import api from "./axios";

export const getAgents = () => api.get("/wazuh/agents");
export const getRules = () => api.get("/wazuh/rules");
export const getManager = () => api.get("/wazuh/manager");