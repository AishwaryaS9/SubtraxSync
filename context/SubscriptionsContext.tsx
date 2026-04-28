import { HOME_SUBSCRIPTIONS } from "@/constants/data";
import React, { createContext, useContext, useState } from "react";

interface SubscriptionsContextType {
    subscriptions: Subscription[];
    addSubscription: (subscription: Subscription) => void;
}

const SubscriptionsContext = createContext<SubscriptionsContextType | undefined>(
    undefined
);

export const SubscriptionsProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>(
        HOME_SUBSCRIPTIONS
    );

    const addSubscription = (subscription: Subscription) => {
        setSubscriptions((prev) => [subscription, ...prev]);
    };

    return (
        <SubscriptionsContext.Provider value={{ subscriptions, addSubscription }}>
            {children}
        </SubscriptionsContext.Provider>
    );
};

export const useSubscriptions = () => {
    const context = useContext(SubscriptionsContext);
    if (!context) {
        throw new Error(
            "useSubscriptions must be used within a SubscriptionsProvider"
        );
    }
    return context;
};
