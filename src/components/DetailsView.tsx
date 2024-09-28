import React from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import MarketChart from "./MarketChart";
import PriceChange24h from "./PriceChange24h";
const DetailsView = () => {
  return (
    <>
      {/* filters */}
      <div className="flex gap-5 justify-end">
        <ButtonGroup variant="bordered" color="primary" className="my-auto">
          <Button>7d</Button>
          <Button>1 yr</Button>
          <Button>1 yr</Button>
        </ButtonGroup>
      </div>
      {/* charts */}
      <div className="mx-auto w-full min-h-96">
        {/* Marketchart  component*/}
        <MarketChart series={[]}></MarketChart>
      </div>

      {/* details */}
      <div className="flex flex-col md:flex-row flex-wrap gap-2 flex-grow mx-auto">
        <div className="bg-indigo-900 bg-opacity-10 w-full md-full md:w-52 p-3 space-y-4 rounded-2xl h-fit text-indigo-300">
          <div className="opacity-70">Current Price</div>
          <div className="flex w-full justify-between">
            <div className="text-white">$1200</div>
            {/* PriceChange component*/}
            <PriceChange24h changePrice={40} />
          </div>
        </div>
        <div className="bg-indigo-900 bg-opacity-10 w-full md-full md:w-52 p-3 space-y-4 rounded-2xl h-fit text-indigo-300">
          <div className="opacity-70">Low 24hr</div>
          <div className="flex w-full justify-between">
            <div className="text-white">$1100</div>
          </div>
        </div>
        <div className="bg-indigo-900 bg-opacity-10 w-full md-full md:w-52 p-3 space-y-4 rounded-2xl h-fit text-indigo-300">
          <div className="opacity-70">High 24 hr</div>
          <div className="flex w-full justify-between">
            <div className="text-white">$1300</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsView;
