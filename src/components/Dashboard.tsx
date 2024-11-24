// import components
import DetailsView from "./DetailsView";
import MarketCurrencies from "./MarketCurrencies";

const Dashboard = () => {
  return (
    <div className="space-y-5 myauto">
      <div className="text-white text-md text-left font-bold mb-3">
        DetailedView
      </div>
      <div className="rounded-3xl p-5 bg-main-darker">
        {/* DetailsView component here */}
        <DetailsView></DetailsView>
      </div>
      <div className="text-white text-md text-left font-bold mb-3">
        Market Coins
      </div>
      <MarketCurrencies />
    </div>
  );
};

export default Dashboard;
