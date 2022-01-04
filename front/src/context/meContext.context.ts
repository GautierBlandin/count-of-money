import { createContext } from "react";

export interface Profile {
    email: string;
    currency: string;
    cryptos: string[];
    press_keywords: string[];
}

export interface MeContextInterface {
  profile?: Profile;
  setProfile: (profilte: Profile) => void;
  updateWatchlist: (cryptos: string[]) => void;
}

const defaultValue: MeContextInterface = {
  profile: undefined,
  setProfile: () => {},
    updateWatchlist: () => {},
};

export const MeContext = createContext<MeContextInterface>(defaultValue);
