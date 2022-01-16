import React from "react";
// import { fetchInstagranData } from "../../Services/instagramService";
// import { useQuery } from "react-query";
import { QueryClient } from "react-query";

const Analytics = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  const instagramData = queryClient.getQueryData("instagramData");

  console.log("instagramData - analytics", instagramData);
  return <div>analytics {JSON.stringify(instagramData)}</div>;
};

export default Analytics;
