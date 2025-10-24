import { create } from 'zustand';
export type PlataformSocial = 'facebook' | 'instagram' | 'twitter' | 'linkedin';

export type SocialMedia = {
  id: string;
  type: PlataformSocial;
  username: string;
};

interface SocialNetworksState {
  socialAccounts: SocialMedia[];
  addSocial: (account: SocialMedia) => void;
  removeSocial: (id: string) => void;
  setSocials: (accounts: SocialMedia[]) => void;
}

export const useSocialNetworksStore = create<SocialNetworksState>((set) => ({
  socialAccounts: [],
  addSocial: (account) =>
    set((state) => ({ socialAccounts: [...state.socialAccounts, account] })),
  removeSocial: (id) =>
    set((state) => ({
      socialAccounts: state.socialAccounts.filter((a) => a.id !== id),
    })),
  setSocials: (accounts) => set({ socialAccounts: accounts }),
}));
