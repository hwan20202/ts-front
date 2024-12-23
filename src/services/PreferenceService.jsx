const serverUrl = import.meta.env.VITE_APP_SERVER_URL || "";

export class PreferenceService {
  static async isSetPreferences() {
    const response = await fetch(
      `${serverUrl}/api/userinfo/me/preferences/status`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get is set preferences");
    }
    const result = await response.json();
    return result.is_checked;
  }

  static async getUserPreferences() {
    const path = `/api/userinfo/me/preferences`;
    const response = await fetch(`${serverUrl}${path}`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to get user preferences");
    }
    const data = await response.json();
    return data?.prefer_type || [];
  }

  static async postUserPreferences(tags) {
    const normalizedTags = Array.isArray(tags) ? tags : [tags];
    const path = `/api/userinfo/prefer`;
    const response = await fetch(`${serverUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ types: normalizedTags }),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to post user preferences");
    }
    const data = await response.json();
    return data;
  }

  static async deleteUserPreferences(tags) {
    const normalizedTags = Array.isArray(tags) ? tags : [tags];
    const path = `/api/userinfo/preferences`;
    const response = await fetch(`${serverUrl}${path}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: normalizedTags }),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to delete user preferences");
    }
    console.log("delete user preferences", response);
  }
}
