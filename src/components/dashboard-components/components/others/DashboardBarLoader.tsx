import React from "react";
import { BarLoader } from "react-spinners";

function BarLoaderComponent({ isLoading = false }: { isLoading: boolean }) {
  return (
    <div className="h-[5px] w-full">
      <BarLoader
        color={"black"}
        loading={isLoading}
        width={"100%"}
        height={"5px"}
        aria-label="Loading Sessions"
        data-testid="loader"
      />
    </div>
  );
}

export default BarLoaderComponent;
