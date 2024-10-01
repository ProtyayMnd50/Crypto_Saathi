import { Spinner } from "@nextui-org/spinner";
import React from "react";

type Props = {};

const Loading = ({}: Props) => {
  return <Spinner color="primary" className="scale-150 my-auto" />;
};

export default Loading;
