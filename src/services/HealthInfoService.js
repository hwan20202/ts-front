const serverUrl = import.meta.env.VITE_APP_SERVER_URL || "";

export class HealthInfoService {
  static async isSetHealthInfo() {
    const path = "/api/userinfo/me/health/status";
    const response = await fetch(`${serverUrl}${path}`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to get is set health");
    }
    const result = await response.json();
    return result.is_checked;
  }

  static async putUserHealthInfo(healthInfo) {
    healthInfo.gender = healthInfo.gender.toUpperCase();

    const path = `/api/userinfo/setting/physical`;
    const response = await fetch(`${serverUrl}${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...healthInfo,
        gender: healthInfo.gender.toLowerCase(),
      }),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to post user health info");
    }
    return response.ok;
  }
}
