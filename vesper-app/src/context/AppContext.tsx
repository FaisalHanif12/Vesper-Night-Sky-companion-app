import { createContext, useContext, useState } from 'react';

interface AppState {
  location: { city: string; lat: number; lng: number } | null;
  setLocation: (loc: { city: string; lat: number; lng: number }) => void;
}

const AppContext = createContext<AppState>({
  location: { city: 'Austin, TX', lat: 30.2672, lng: -97.7431 },
  setLocation: () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<{ city: string; lat: number; lng: number } | null>(
    { city: 'Austin, TX', lat: 30.2672, lng: -97.7431 }
  );

  return (
    <AppContext.Provider value={{ location, setLocation }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
