//loading page to display if its still loading

import { Spinner } from "@nextui-org/spinner";

function Loading() {
  return (
    <div className="h-96 flex justify-center w-full">
      <Spinner color="primary" className="scale-150 my-auto" />
    </div>
  );
}

export default Loading;
