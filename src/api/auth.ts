interface User {
  name: string;
  email: string;
}

let requestURL = process.env.REACT_APP_BASE_URL;

//TODO remove this check, add test for this, add loading screen / bar on login form
if (!requestURL) {
  console.error("REACT_APP_BASE_URL is undefined");
}

const request = async (endpoint: string, method = "GET", body: any = null) => {
  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // cookies
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response: any = await fetch(`${requestURL}${endpoint}`, config);
    // const responseBody = await response.text();

    if (!response.ok) {
      throw new Error("Error with request");
    }

    const contentType = response.headers.get("Content-Type");

    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// TODO auth functions (login, logout, check status)
export const login = async (user: User) => {
  return await request("/auth/login", "POST", user);
};
export const logout = async () => {
  return request("/auth/logout", "POST");
};

export const checkAuthStatus = async () => {
  try {
    await request("/dogs/breeds");
    return true;
  } catch (err) {
    return false;
  }
};
