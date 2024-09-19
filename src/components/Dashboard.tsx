import { div } from "framer-motion/client";
import React from "react";

type Props = {};

const Dashboard = ({}: Props) => {
  return (
    <div className="space-y-5 myauto">
      <div className="text-white text-md text-left font-bold mb-5">
        {/* Details View component */}
        DetailsView
      </div>
      <div className="rounded-3xl p-5 bg-main-darker">{/* DetailsView */}</div>
      <div className="text-white text-md text-left font-bold mb-5">
        {/* Market Coins */}
        Market Coins
      </div>
      {/* Marketcurrencies */}
    </div>
  );
};

export default Dashboard;
