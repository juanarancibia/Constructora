import { createContext, useState, useContext } from "react";
import LoadingOverlay from "react-loading-overlay";

LoadingOverlay.propTypes = undefined;

const LoadingContext = createContext({
  loading: false,
  setLoading: (value) => {},
});

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const value = { loading, setLoading };

  return (
    <LoadingContext.Provider value={value}>
      <LoadingOverlay active={loading} spinner={true}>
        {children}
      </LoadingOverlay>
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const { loading, setLoading } = useContext(LoadingContext);

  return { loading, setLoading };
}
