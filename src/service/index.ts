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

//optimsed code :

import moment from "moment";

import Axios from "axios";
import {
  IFormattedMarketCoin,
  IMarketChart,
  IMarketCoin,
  ICoinDetails,
} from "../interfaces";

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
