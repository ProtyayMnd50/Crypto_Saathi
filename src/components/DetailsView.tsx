import { useState, useEffect } from "React";
// import { Button, ButtonGroup } from "@nextui-org/button";
import MarketChart from "./MarketChart";
import PriceChange24h from "./PriceChange24h";
import Loading from "./Loading";
import useMarketChart from "../queries/useMarketChart";
import useCoinDetails from "../queries/useCoinDetails";
import toast from "react-hot-toast";
import { useGlobalStore } from "../store/useGlobalStore";
import { Button, ButtonGroup } from "@nextui-org/button";

const daysFilters = [7, 30, 365];
type DaysType = keyof typeof daysFilters;

const DetailsView = () => {
  // Fetch the selected cryptocurrency ID from the global store.
  const coinId = useGlobalStore((state) => state.detailsId);

  // State to manage the selected time period for data display.
  const [days, setDays] = useState<DaysType>(365);

  //useMarketChart ,useCoinDetails is a custom hook

  const {
    data: chartData,
    isLoading: isChartDataLoading,
    isError: isChartDataError,
  } = useMarketChart({
    id: coinId,
    days: days as number,
  });
  const {
    data: details,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
  } = useCoinDetails({
    id: coinId,
  });
  const changeIn24 = details?.market_data.price_change_percentage_24h;
  const currentPrice = details?.market_data.current_price.usd;
  const high24h = details?.market_data.high_24h.usd;
  const low24h = details?.market_data.low_24h.usd;

  // Show a toast notification if there are errors in fetching data.

  useEffect(() => {
    if (isDetailsError || isChartDataError)
      toast("Sorry! Failed to load resources!");
  }, [isDetailsError, isChartDataError]);

  // Show a loading indicator while data is being fetched.
  if (isDetailsLoading || isChartDataLoading) return <Loading />;
  return (
    <>
      {/* filters */}
      <div className="flex gap-5 justify-end">
        {/* <ButtonGroup color="primary" variant="bordered">
          <Button>one</Button>
          <Button>two</Button>
        </ButtonGroup> */}
        <ButtonGroup color="primary" variant="bordered">
          {daysFilters.map((filter) => (
            <Button key={filter} onClick={() => setDays(filter)}>
              {filter}d
            </Button>
          ))}
        </ButtonGroup>
        <div className="my-auto text-white font-bold">{details?.name}</div>
      </div>
      {/* chart */}
      <div className="mx-auto w-full min-h-96">
        {chartData && <MarketChart series={chartData.prices} />}
      </div>

      {/* details */}
      <div className="flex flex-col md:flex-row flex-wrap gap-2 flex-grow mx-auto">
        <div className="bg-indigo-900 bg-opacity-10 w-full md-full md:w-52 p-3 space-y-4 rounded-2xl h-fit text-indigo-300">
          <div className="opacity-70">Current Price</div>
          <div className="flex w-full justify-between">
            <div className="text-white">${currentPrice}</div>
            {changeIn24 && <PriceChange24h changePrice={changeIn24} />}
          </div>
        </div>
        <div className="bg-indigo-900 bg-opacity-10 w-full md-full md:w-52 p-3 space-y-4 rounded-2xl h-fit text-indigo-300">
          <div className="opacity-70">Low 24hr</div>
          <div className="flex w-full justify-between">
            <div className="text-white">${low24h}</div>
          </div>
        </div>

        <div className="bg-indigo-900 bg-opacity-10 w-full md-full md:w-52 p-3 space-y-4 rounded-2xl h-fit text-indigo-300">
          <div className="opacity-70">High 24hr</div>
          <div className="flex w-full justify-between">
            <div className="text-white">${high24h}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsView;
