import axios from "axios";
//fetchMarketCurrencies
export async function fetchMarketCurrencies() {
  const data = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets",
    {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 20,
        page: 1,
        sparkline: true,
        price_change_percentage: "7d",
        locale: "en",
      },
    }
  );
  return data;
}
//fetchMarketChart

//fetchCoinDetails
