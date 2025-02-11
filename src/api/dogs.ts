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

    if (!response.ok) {
      throw new Error("Error with request");
    }

    return await response.json().then((data: any) => {
      return data;
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getBreeds = async () => {
  let breeds = await request("/dogs/breeds");
  return breeds;
};

export const getZipCodes = async (params) => {
  try {
    const zipcodes = await request("/locations/search", "POST", {
      ...params,
      size: 20,
    });
    return zipcodes;
  } catch (error) {
    console.error(error);
  }
};

export const getDogMatches = async (params) => {
  const queryString = Object.entries(params)
    .filter(([x, value]) => value !== null && value !== undefined)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((val) => `${key}=${val}`).join("&");
      }
      return `${key}=${value}`;
    })
    .join("&");
  try {
    const dogsResponse = await request(`/dogs/search?${queryString}`, "GET");
    if (!dogsResponse || !dogsResponse.resultIds) {
      throw new Error(
        `Invalid response structure: ${JSON.stringify(dogsResponse)}`
      );
    }

    return dogsResponse;
  } catch (err) {
    console.error(err);
    return { resultIds: [] };
  }
};

export const getFavoriteMatch = async (favoriteDogIds) => {
  try {
    const response = await request("/dogs/match", "POST", favoriteDogIds);
    return response;
  } catch (error) {
    console.error("Error fetching favorite match:", error);
    return null;
  }
};

export const getDogsByIds = async (dogIds) => {
  const dogResponse = await request("/dogs", "POST", dogIds);
  return dogResponse;
};

export const getLocationByZip = async (zipCode) => {
  const locationResponse = await request("/locations", "POST", [zipCode]);
  return locationResponse;
};
