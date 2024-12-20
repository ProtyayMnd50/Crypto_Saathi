//use of useQuery from Tanstack
import { useQuery } from "@tanstack/react-query";
import { fetchMarketChart } from "../service";

type Props = {
  id: string;
  days: number;
};

function useMarketChart({ id, days }: Props) {
  const result = useQuery({
    queryFn: async () => await fetchMarketChart(id, days),
    queryKey: ["marketChart", id, days],
  });
  return result;
}

export default useMarketChart;
