"use client";
import { Provider } from "react-redux";
import { store } from "./store";

// Redux Provider component
const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
