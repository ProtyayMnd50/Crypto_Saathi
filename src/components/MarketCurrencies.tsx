// import React, { useEffect } from "react";
// import MarketCurrencyCard from "./MarketCurrencyCard";
// import useMarketCoins from "../queries/useMarketCoins";
// import Loading from "./Loading";
// import toast from "react-hot-toast";

// type Props={};
// function MarketCurrencies({}:Props){
//   const { data: coins, isLoading, isError } = useMarketCoins();
//   useEffect(() => {
//     if (isError) toast("Failed to load market currencies!");
//   }, [isError]);

//   if (isError) return null;

//   if (isLoading) return <Loading />;
//   // return (
//   //   <MarketCurrencyCard
//   //     image={sample.image}
//   //     changeIn24h={sample.price_change_percentage_24h}
//   //     currentPrice={sample.current_price}
//   //     name={sample.name}
//   //     chartData={[]}
//   //     id={"bitcoin"}
//   //   />
//   // );
//   return (
//     <div className="w-full gap-5 grid md:grid-cols-2 lg:grid-cols-3">
//       {coins &&
//         coins.map((item) => (
//           <MarketCurrencyCard
//             key={item.id}
//             changeIn24h={item.price_change_percentage_24h}
//             id={item.id}
//             chartData={item.sparkline_in_7d.price}
//             image={item.image}
//             name={item.name}
//             currentPrice={item.current_price}
//           />
//         ))}
//     </div>
// };

// export default MarketCurrencies;

// // const sample = {
// //   id: "bitcoin",
// //   symbo: "btc",
// //   name: "Bitcoin",
// //   image:
// //     "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696581400",
// //   current_price: 44958,
// //   market_cap: 875582800730,
// //   market_cap_rank: 1,
// //   filly_diluted_valuation: 93890119514,
// //   total_volume: 41082415169,
// //   high_24h: 47600,
// //   loh_24h: 44591,
// //   price_change_24h: -1579.9151999991518,
// //   price_change_percentage_24h: -31441192896.38611,
// //   market_cap_change_percentage_24h: -3.46641,
// //   circulating_supply: 19594637.0,
// // };

import { useEffect } from "react";
import useMarketCoins from "../queries/useMarketCoins";
import Loading from "./Loading";
import MarketCurrencyCard from "./MarketCurrencyCard";
import toast from "react-hot-toast";

type Props = {};

function MarketCurrencies({}: Props) {
  const { data: coins, isLoading, isError } = useMarketCoins();

  useEffect(() => {
    if (isError) toast("Failed to load market currencies!");
  }, [isError]);

  if (isError) return null;

  if (isLoading) return <Loading />;

  return (
    <div className="w-full gap-5 grid md:grid-cols-2 lg:grid-cols-3">
      {coins &&
        coins.map((item) => (
          <MarketCurrencyCard
            key={item.id}
            changeIn24h={item.price_change_percentage_24h}
            id={item.id}
            chartData={item.sparkline_in_7d.price}
            image={item.image}
            name={item.name}
            currentPrice={item.current_price}
          />
        ))}
    </div>
  );
}
export default MarketCurrencies;
