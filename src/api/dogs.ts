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

    return await response.json().then((data: any) => {
      console.log("data", data);
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
      size: 10,
    });
    console.log(zipcodes, "zipcodes returned");
    return zipcodes;
  } catch (error) {
    console.error(error);
  }
};

export const getDogMatches = async (params) => {
  // need a query string for the data...if not null, include in query string ?breeds=[xyzxy, 23232]&ageMin=0
  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}=[${value.join(",")}]`;
      }
      return `${key}=${value}`;
    })
    .join("&");

  try {
    const dogsResponse = await request(`/dogs/search?${queryString}`, "GET");
    console.log(dogsResponse, "dogs returned");
    return dogsResponse.resultIds;
  } catch (err) {
    console.error(err);
  }
};

export const getDogsByIds = async (params) => {
  const dogResponse = await request("/dogs", "POST", params);
  console.log(dogResponse);
  return dogResponse;
};

// locations search to be used in get dogs
// get dogs - filters included, if location is included get zipcodes and then get dogs
