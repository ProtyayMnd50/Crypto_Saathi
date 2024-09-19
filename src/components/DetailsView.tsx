import React from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
const DetailsView = () => {
  return (
    <>
      {/* filters */}
      <div className="flex-gap-5 justify-end">
        <ButtonGroup variant="bordered" color="primary" className="my-auto">
          <Button>7d</Button>
          <Button>1 yr</Button>
          <Button>1 yr</Button>
        </ButtonGroup>
      </div>
      {/* charts */}

      {/* details */}
    </>
  );
};

export default DetailsView;
