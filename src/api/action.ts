import { hostConfig } from "../config";

export const postAPI = async (url: string, values: any) => {
  try {
    return await fetch(`${hostConfig.API}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.log(error);
  }
};

export const getAPI = async (url: string, params?: any) => {
  let getParams = "?";
  if (
    params &&
    params.limit &&
    params.limit !== null &&
    params.limit !== undefined
  ) {
    getParams += `&limit=${params.limit}`;
  }
  if (
    params.offset &&
    params &&
    params.offset !== null &&
    params.offset !== undefined
  ) {
    getParams += `&offset=${params.offset}`;
  }
  if (params && params.page !== null && params.page !== undefined) {
    getParams += `&page=${params.page}`;
  }
  if (params && params.per_page !== null && params.per_page !== undefined) {
    getParams += `&per_page=${params.per_page}`;
  }
  if (
    params &&
    params.search !== null &&
    params.search !== "" &&
    params.search !== undefined
  ) {
    getParams += `&search=${params.search}`;
  }

  if (getParams === "?") {
    getParams = "";
  }
  try {
    return await fetch(`${hostConfig.API}${url}${getParams}`)
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.log(error);
  }
};

export const putAPI = async (url: string, id: any, values: any) => {
  try {
    return await fetch(`${hostConfig.API}${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAPI = async (url: string, id: any) => {
  try {
    return await fetch(`${hostConfig.API}${url}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.log(error);
  }
};
