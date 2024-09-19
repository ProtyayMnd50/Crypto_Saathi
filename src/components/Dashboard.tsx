import { div } from "framer-motion/client";
import React from "react";
import DetailsView from "./DetailsView";
type Props = {};

const Dashboard = ({}: Props) => {
  return (
    <div className="space-y-5 myauto">
      <div className="text-white text-md text-left font-bold mb-3">
        DetailsView
      </div>
      <div className="rounded-3xl p-5 bg-main-darker">
        {/* DetailsView component here */}
        <DetailsView></DetailsView>
      </div>
      <div className="text-white text-md text-left font-bold mb-3">
        Market Coins
      </div>
      {/* Marketcurrencies */}
    </div>
  );
};

export default Dashboard;
