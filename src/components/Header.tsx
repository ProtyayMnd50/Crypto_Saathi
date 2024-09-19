import React from "react";
import { IoStatsChart } from "react-icons/io5";
type Props = {};
const Header = ({}: Props) => {
  return (
    <div className="rounded-3xl flex flex-row gap-5 justify-start bg-main-darker">
      <div className="font-blod flex gap-2 text-indigo-500 pl-2">
        <div className="my-auto">
          <IoStatsChart></IoStatsChart>
          Crypto Saathi
        </div>
      </div>
    </div>
  );
};

export default Header;
