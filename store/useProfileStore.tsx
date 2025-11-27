import { create } from 'zustand';
import { ProfileResponse } from '@/types/profileServices';
import { 
  getProfile, 
  updateProfile as updateProfileService,
  updatePhone as updatePhoneService,
  updatePicture as updatePictureService,
  updateEmail as updateEmailService,
  updateSocialAccounts as updateSocialAccountsService,
} from '@/components/profile/services/profileServices';
import { buildSocialPayload, convertSocialsToArray } from '@/utils/profileStoreHelpers';

export type PlataformSocial = 'facebook' | 'instagram' | 'twitterX' | 'linkedin' | 'whatsappNumber' | 'tiktok' | 'snapchat' | 'youtube' | 'pinterest';

export type SocialMedia = {
  id: string;
  type: PlataformSocial;
  username: string;
};

interface ProfileStore {
  // Profile data from backend
  userProfile: ProfileResponse | null;
  loading: boolean;
  error: string | null;

  // Form state - local (not persisted to backend until submitted)
  alias: string;
  phone: string;
  socialAccounts: SocialMedia[];
  formError: string;

  // Profile actions
  fetchProfile: (token: string) => Promise<void>;
  updateProfileField: (field: keyof ProfileResponse, value: any) => void;
  updateNickname: (token: string, nickname: string) => Promise<void>;
  updatePhone: (token: string, phone: string) => Promise<void>;
  updatePicture: (token: string, file: File) => Promise<void>;
  updateEmail: (token: string, email: string) => Promise<void>;

  // Form state actions
  setAlias: (alias: string) => void;
  setPhone: (phone: string) => void;
  setSocials: (accounts: SocialMedia[]) => void;
  addSocial: (token: string, account: SocialMedia) => Promise<void>;
  removeSocial: (token: string, id: string) => Promise<void>;
  setFormError: (error: string) => void;

  // Cleanup
  reset: () => void;
}

export const useProfileStore = create<ProfileStore>((set, get) => ({
  // Initial state
  userProfile: null,
  loading: false,
  error: null,
  alias: '',
  phone: '',
  socialAccounts: [],
  formError: '',

  // Profile actions
  fetchProfile: async (token: string) => {
    set({ loading: true, error: null });
    try {
      const profile = await getProfile(token);
      
      // Convertir socials de objeto a array
      const socialAccounts = convertSocialsToArray(profile.socials);
      
      set({ 
        userProfile: profile, 
        loading: false,
        // Initialize form state from profile
        alias: profile.nickName || '',
        phone: profile.phone || '',
        socialAccounts,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error fetching profile';
      set({ error: message, loading: false });
      throw error;
    }
  },

  updateProfileField: (field, value) => {
    set((state) => ({
      userProfile: state.userProfile
        ? { ...state.userProfile, [field]: value }
        : null,
    }));
  },

  updateNickname: async (token: string, nickname: string) => {
    try {
      set({ loading: true, error: null });
      const response = await updateProfileService(token, nickname);
      
      // Update store with new nickname
      const nickNameFromRes = response.nickName ?? response.nickname ?? nickname;
      set((state) => ({
        userProfile: state.userProfile
          ? { ...state.userProfile, nickName: nickNameFromRes }
          : null,
        alias: nickNameFromRes,
        loading: false,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error updating nickname';
      set({ error: message, loading: false });
      throw error;
    }
  },

  updatePhone: async (token: string, phone: string) => {
    try {
      set({ loading: true, error: null });
      const response = await updatePhoneService(token, phone);
      
      // Update store with new phone
      set((state) => ({
        userProfile: state.userProfile
          ? { ...state.userProfile, phone: response.phone || phone }
          : null,
        phone: response.phone || phone,
        loading: false,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error updating phone';
      set({ error: message, loading: false });
      throw error;
    }
  },

  updatePicture: async (token: string, file: File) => {
    try {
      set({ loading: true, error: null });
      const response = await updatePictureService(token, file);
      
      // Update store with new picture URL
      set((state) => ({
        userProfile: state.userProfile
          ? { ...state.userProfile, profilePictureUrl: response.result.imgUrl }
          : null,
        loading: false,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error updating picture';
      set({ error: message, loading: false });
      throw error;
    }
  },

  updateEmail: async (token: string, email: string) => {
    try {
      set({ loading: true, error: null });
      const response = await updateEmailService(token, email);
      
      // Update store with new email
      set((state) => ({
        userProfile: state.userProfile
          ? { ...state.userProfile, email }
          : null,
        loading: false,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error updating email';
      set({ error: message, loading: false });
      throw error;
    }
  },

  // Form state actions
  setAlias: (alias) => set({ alias }),
  
  setPhone: (phone) => set({ phone }),
  
  setSocials: (accounts) => set({ socialAccounts: accounts }),
  
  addSocial: async (token: string, account: SocialMedia) => {
    try {
      set({ loading: true, error: null });
      const newAccounts = [...get().socialAccounts, account];
      set({ socialAccounts: newAccounts });
      const socialPayload = buildSocialPayload(newAccounts);
      await updateSocialAccountsService(token, socialPayload);
      set({ loading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error adding social account';
      set({ error: message, loading: false });
      throw error;
    }
  },
  
  removeSocial: async (token: string, id: string) => {
    try {
      set({ loading: true, error: null });
      const newAccounts = get().socialAccounts.filter((a) => a.id !== id);
      set({ socialAccounts: newAccounts });
      const socialPayload = buildSocialPayload(newAccounts);
      await updateSocialAccountsService(token, socialPayload);
      set({ loading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error removing social account';
      set({ error: message, loading: false });
      throw error;
    }
  },

  setFormError: (error) => set({ formError: error }),

  // Reset all state
  reset: () => set({
    userProfile: null,
    loading: false,
    error: null,
    alias: '',
    phone: '',
    socialAccounts: [],
    formError: '',
  }),
}));
