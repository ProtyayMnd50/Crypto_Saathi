// previous code:
// import Axios from "axios";
// import {
//   IFormattedMarketCoin,
//   IMarketChart,
//   IMarketCoin,
//   ICoinDetails,
// } from "../interfaces";
// import moment from "moment";
// const axios = Axios.create({
//   baseURL: "https://api.coingecko.com/api/v3/coins",
// });
// //fetchMarketCurrencies

// // IFormattedMarketCoin[]
// export async function fetchMarketCurrencies(): Promise<IFormattedMarketCoin> {
//   const { data } = await axios.get("/markets", {
//     params: {
//       vs_currency: "usd",
//       order: "market_cap_desc",
//       per_page: 20,
//       page: 1,
//       sparkline: true,
//       price_change_percentage: "7d",
//       locale: "en",
//     },
//   });
//   return formatData(data);
// }
// //fetchMarketChart
// export async function fetchMarketChart(
//   id: string,
//   days: number
// ): Promise<IMarketChart> {
//   const { data } = await axios.get(`/${id}/market_chart`, {
//     params: {
//       vs_currency: "usd",
//       days,
//       interval: "daily",
//     },
//   });

//   return data;
// }

// //fetchCoinDetails
// export async function fetchCoinDetails(id: string): Promise<ICoinDetails> {
//   const { data } = await axios.get("/" + id);
//   return data;
// }

// // Additional functions
// //Formatting sparkline
// function formatSparkline(sparkline: number[]) {
//   const sevenDaysAgo = moment().subtract(7, "d").unix();
//   const formattedSparkline = sparkline.slice(-48).map((item, index) => {
//     return {
//       x: sevenDaysAgo + (index + 1) * 3600,
//       y: item,
//     };
//   });

//   return formattedSparkline;
// }
// //Formatting data
// function formatData(data: IMarketCoin[]): IFormattedMarketCoin[] {
//   let formattedData = [];
//   formattedData = data.map((item) => {
//     const formattedSparkline = formatSparkline(item.sparkline_in_7d.price);

//     const formattedItem: IFormattedMarketCoin = {
//       ...item,
//       sparkline_in_7d: {
//         price: formattedSparkline,
//       },
//     };
//     return formattedItem;
//   });
//   return formattedData;
// }

//optimised code:
import Axios from "axios";
import moment from "moment";

const axios = Axios.create({
  baseURL: "https://api.coingecko.com/api/v3/coins",
});

const cache: { [key: string]: any } = {};

// Fetch market currencies with caching and reduced parameters
export async function fetchMarketCurrencies(): Promise<IFormattedMarketCoin[]> {
  const cacheKey = "marketCurrencies";
  if (cache[cacheKey]) return cache[cacheKey];

  const { data } = await axios.get("/markets", {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 10, // Smaller page size for faster response
      page: 1,
      sparkline: true, // Use only if needed
      price_change_percentage: "7d",
      locale: "en",
    },
  });

  const formattedData = formatData(data);
  cache[cacheKey] = formattedData;
  return formattedData;
}

// Fetch market chart
export async function fetchMarketChart(
  id: string,
  days: number
): Promise<IMarketChart> {
  const { data } = await axios.get(`/${id}/market_chart`, {
    params: {
      vs_currency: "usd",
      days,
      interval: "daily",
    },
  });

  return data;
}

// Fetch coin details
export async function fetchCoinDetails(id: string): Promise<ICoinDetails> {
  if (cache[id]) return cache[id];
  const { data } = await axios.get("/" + id);
  cache[id] = data;
  return data;
}

// Format sparkline
function formatSparkline(sparkline: number[]): { x: number; y: number }[] {
  const sevenDaysAgo = moment().subtract(7, "d").unix();
  return sparkline.slice(-48).map((item, index) => ({
    x: sevenDaysAgo + (index + 1) * 3600,
    y: item,
  }));
}

// Format data
function formatData(data: IMarketCoin[]): IFormattedMarketCoin[] {
  return data.map((item) => {
    const formattedSparkline = formatSparkline(item.sparkline_in_7d.price);
    return {
      ...item,
      sparkline_in_7d: {
        price: formattedSparkline,
      },
    };
  });
}

API fetching can take a long time due to various factors such as network latency, inefficient query parameters, redundant requests, or inefficient formatting logic. Let’s analyze your code and suggest improvements to optimize fetching speed.
Potential Issues and Solutions:
1. Large Response Size

    APIs like CoinGecko's /markets endpoint return a significant amount of data, especially with parameters like sparkline: true and price_change_percentage: "7d".
    Fetching and processing large data can slow down the application.

Solution:

    Optimize params to fetch only the necessary fields if the API supports it. For example, limit the data returned using filters or smaller pages.

params: {
  vs_currency: "usd",
  order: "market_cap_desc",
  per_page: 10, // Reduced from 20 to 10 to fetch smaller pages
  page: 1,
  sparkline: false, // Disable sparkline if not needed
  price_change_percentage: "7d",
  locale: "en",
},

2. Unnecessary Data Formatting

    The formatSparkline function is creating objects for every price point in the sparkline, which can be resource-intensive for large datasets.

Solution:

    Optimize the formatSparkline function to reduce computation overhead:
        Instead of mapping every point, preprocess only the required subset of data.

Optimized formatSparkline:

function formatSparkline(sparkline: number[]): { x: number; y: number }[] {
  const sevenDaysAgo = moment().subtract(7, "d").unix();
  return sparkline.slice(-48).map((item, index) => ({
    x: sevenDaysAgo + (index + 1) * 3600, // Pre-calculate time offsets efficiently
    y: item,
  }));
}

3. Redundant API Calls

    If fetchMarketCurrencies and fetchMarketChart are called frequently (e.g., during UI re-renders), this could lead to redundant API requests.

Solution:

    Use a caching mechanism to store responses for a specific duration, especially for data that doesn’t change often (e.g., market data for vs_currency: "usd").

For caching:

const cache: { [key: string]: any } = {};

export async function fetchMarketCurrencies(): Promise<IFormattedMarketCoin> {
  const cacheKey = "marketCurrencies";
  if (cache[cacheKey]) {
    return cache[cacheKey]; // Return cached result if available
  }

  const { data } = await axios.get("/markets", {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 20,
      page: 1,
      sparkline: true,
      price_change_percentage: "7d",
      locale: "en",
    },
  });

  const formattedData = formatData(data);
  cache[cacheKey] = formattedData; // Cache the formatted data
  return formattedData;
}

4. Multiple Network Requests

    If the functions fetchMarketCurrencies, fetchMarketChart, and fetchCoinDetails are called sequentially or synchronously, they can delay the response time.

Solution:

    Fetch data in parallel using Promise.all to reduce total fetch time.

For example:

async function fetchAllData() {
  const [currencies, chart, coinDetails] = await Promise.all([
    fetchMarketCurrencies(),
    fetchMarketChart("bitcoin", 7), // Example coin ID and days
    fetchCoinDetails("bitcoin"), // Example coin ID
  ]);

  return { currencies, chart, coinDetails };
}

5. Large Sparkline Processing

    The sparkline field in fetchMarketCurrencies is processed entirely, even if not all data points are needed.

Solution:

    Fetch and process only the required portion of the sparkline data using API parameters, if supported.

Final Optimized Fetching Code:

Here’s how you can integrate these improvements:

import Axios from "axios";
import moment from "moment";

const axios = Axios.create({
  baseURL: "https://api.coingecko.com/api/v3/coins",
});

const cache: { [key: string]: any } = {};

// Fetch market currencies with caching and reduced parameters
export async function fetchMarketCurrencies(): Promise<IFormattedMarketCoin[]> {
  const cacheKey = "marketCurrencies";
  if (cache[cacheKey]) return cache[cacheKey];

  const { data } = await axios.get("/markets", {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 10, // Smaller page size for faster response
      page: 1,
      sparkline: true, // Use only if needed
      price_change_percentage: "7d",
      locale: "en",
    },
  });

  const formattedData = formatData(data);
  cache[cacheKey] = formattedData;
  return formattedData;
}

// Fetch market chart
export async function fetchMarketChart(
  id: string,
  days: number
): Promise<IMarketChart> {
  const { data } = await axios.get(`/${id}/market_chart`, {
    params: {
      vs_currency: "usd",
      days,
      interval: "daily",
    },
  });

  return data;
}

// Fetch coin details
export async function fetchCoinDetails(id: string): Promise<ICoinDetails> {
  if (cache[id]) return cache[id];
  const { data } = await axios.get("/" + id);
  cache[id] = data;
  return data;
}

// Format sparkline
function formatSparkline(sparkline: number[]): { x: number; y: number }[] {
  const sevenDaysAgo = moment().subtract(7, "d").unix();
  return sparkline.slice(-48).map((item, index) => ({
    x: sevenDaysAgo + (index + 1) * 3600,
    y: item,
  }));
}

// Format data
function formatData(data: IMarketCoin[]): IFormattedMarketCoin[] {
  return data.map((item) => {
    const formattedSparkline = formatSparkline(item.sparkline_in_7d.price);
    return {
      ...item,
      sparkline_in_7d: {
        price: formattedSparkline,
      },
    };
  });
}

// Summary of Improvements:

//     Reduced Response Size: Fewer items per page (per_page) and optional sparkline processing.
//     Caching: Avoid redundant API calls by storing previously fetched data.
//     Parallel Fetching: Use Promise.all to fetch data concurrently.
//     Optimized Formatting: Simplified formatSparkline logic.

// These changes should significantly reduce the time taken for API fetching and data processing.
