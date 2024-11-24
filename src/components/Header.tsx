const Header = () => {
  return (
    <div className="rounded-3xl flex flex-row gap-5 justify-start bg-main-darker mb-6">
      <div className="font-blod flex gap-2 text-indigo-500 pl-2">
        <div className="text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">CryptoSaathi</h1>
          </div>
        </div>
        {/* <div className="my-auto flex flex-row gap-3">
          <IoStatsChart></IoStatsChart>
          <p>Crypto Saathi</p>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
