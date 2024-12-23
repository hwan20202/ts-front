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

  static async getUserHealthInfo() {
    const path = `/api/userinfo`;
    const response = await fetch(`${serverUrl}${path}`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to get user health info");
    }
    const { gender, activity_level, height, weight, age } =
      await response.json();
    console.log(gender, activity_level, height, weight, age);
    return { gender, activity_level, height, weight, age };
  }

  static async putUserHealthInfo(healthInfo) {
    console.log(healthInfo);
    const path = `/api/userinfo/setting/physical`;
    const response = await fetch(`${serverUrl}${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...healthInfo }),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to post user health info");
    }
    return response.ok;
  }
}
