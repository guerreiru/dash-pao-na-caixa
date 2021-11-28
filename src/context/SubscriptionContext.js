import React from "react";
import { api } from "../services/api";

export const SubscriptionContext = React.createContext();

export const SubscriptionStorage = ({ children }) => {
  const [subscriptions, setSubscription] = React.useState([]);

  React.useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const res = await api.get("subscription-plans");
    const subscriptions = await res.data.data;
    setSubscription(subscriptions);
  }

  function subscriptionOptions() {
    return subscriptions.map((value) => {
      return {
        label: value.name,
        id: value.id,
      };
    });
  }

  return (
    <SubscriptionContext.Provider value={{ subscriptions, subscriptionOptions }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
