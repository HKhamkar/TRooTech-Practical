"use client";

/* Core */
import { Provider } from "react-redux";
import store from "../src/redux/store";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export const Providers = (props) => {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {props.children}
      </LocalizationProvider>
    </Provider>
  );
};
