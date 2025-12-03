import { getQueryParams } from "@utils/common";

class MFEAuthService {
  checkMFEAppsAuth() {
    const params = getQueryParams();

    if (params["spotify-auth-success"] === "true") {
      this.handleSpotifyAuth(params);
    }
  }

  private handleSpotifyAuth(params) {
    if (window.opener && params["code"]) {
      window.opener.postMessage(
        {
          authType: "spotify-auth",
          ...params,
        },
        process.env.SPOTIFY_APP_URI 
      );
      window.close();
    }
  }
}

export default new MFEAuthService();
