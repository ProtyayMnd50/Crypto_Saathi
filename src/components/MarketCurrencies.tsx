import React from "react";
import MarketCurrencyCard from "./MarketCurrencyCard";
const MarketCurrencies = () => {
  return (
    <MarketCurrencyCard
      image={sample.image}
      changeIn24h={sample.price_change_percentage_24h}
      currentPrice={sample.current_price}
      name={sample.name}
      chartData={[]}
      id={"bitcoin"}
    />
  );
};

export default MarketCurrencies;

const sample = {
  id: "bitcoin",
  symbo: "btc",
  name: "Bitcoin",
  image:
    "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696581400",
  current_price: 44958,
  market_cap: 875582800730,
  market_cap_rank: 1,
  filly_diluted_valuation: 93890119514,
  total_volume: 41082415169,
  high_24h: 47600,
  loh_24h: 44591,
  price_change_24h: -1579.9151999991518,
  price_change_percentage_24h: -31441192896.38611,
  market_cap_change_percentage_24h: -3.46641,
  circulating_supply: 19594637.0,
};
