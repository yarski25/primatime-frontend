import axios, { baseURL } from "./axiosConfig";

//const query = `search?country=Czech+Republic&name=`;

export type Dictionary = { [key: string]: string };

const queries: Dictionary = {};
queries["country"] = "Czech+Republic";
// queries["name"] = "Czech+Technical";
queries["name"] = "";

// function to create query for endpoint
const createQuery = (queries: Dictionary, name: string) => {
  if (name) queries["name"] = name;
  let query = "search?";
  for (const key in queries) {
    if (query.slice(-1) === "?") query += key + `=` + queries[key];
    else query += `&` + key + `=` + queries[key];
  }
  return query;
};

export default class UniService {
  static async getUnisByName(name: string) {
    const query = createQuery(queries, name);
    console.log(query);
    const response = await axios.get(baseURL + `/` + query);

    return response;
    //   const response = await axios.get(
    //     // baseURL +
    //     //   `search?` +
    //     //   `country` +
    //     //   `=` +
    //     //   queries["country"] +
    //     //   `&` +
    //     //   `name` +
    //     //   `=` +
    //     //   queries["name"]
    //   );
  }
}
