import { Spinner } from "@nextui-org/spinner";
import React from "react";

type Props = {};

function Loading({}: Props) {
  return (
    <div className="h-96 flex justify-center w-full">
      <Spinner color="primary" className="scale-150 my-auto" />
    </div>
  );
}

export default Loading;
