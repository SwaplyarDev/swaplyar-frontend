import { create } from 'zustand';

interface RequestTransactionStore {
  nameStore: string;
  lastNameStore: string;
  sendCoinStore: string;
  receiveCoinStore: string;
  sendAmountStore: string;
  receiveAmountStore: string;
  nameSendCoinStore: string;
  nameReceiveCoinStore: string;
  cuilStore: string;
  numberOfOperationStore: string;
  nameOfBankStore: string;
  selectCountryStore: string;
  telephoneStore: string;
  emailStore: string;
  emailOfPayoneerStore?: string; 
  emailOfPayPalStore?: string; 
  idOfPayPalTransactionStore: string;
  nameAndLastNameOfWiseStore: string;
  nameOfWiseStore: string;
  noteStore: string;
  requestTransaction: boolean;
  setPersonalData: (name: string, lastName: string) => void;
  setTransactionDetails: (
    sendCoin: string,
    receiveCoin: string,
    sendAmount: string,
    receiveAmount: string,
  ) => void;
  setBankData: (
    cuil: string,
    numberOfOperation: string,
    nameOfBank: string,
  ) => void;
  setContactData: (
    selectCountry: string,
    telephone: string,
    email: string,
  ) => void;
  setEmailData: (emailOfPayoneer?: string, emailOfPayPal?: string) => void;
  setPayPalTransactionId: (idOfPayPalTransaction: string) => void;
  setWiseData: (nameAndLastName: string, nameOfWise: string) => void;
  setNote: (note: string) => void;
  setRequestTransaction: (requestTransaction: boolean) => void;
  clearData: () => void;
}


const loadFromLocalStorage = (): Partial<RequestTransactionStore> => {
  const storedData = localStorage.getItem('requestTransactionStore');
  return storedData ? JSON.parse(storedData) : {};
};

const saveToLocalStorage = (state: RequestTransactionStore) => {
  localStorage.setItem('requestTransactionStore', JSON.stringify(state));
};

export const useRequestTransactionStore = create<RequestTransactionStore>(
  (set) => ({
    ...{
      nameStore: '',
      lastNameStore: '',
      sendCoinStore: '',
      receiveCoinStore: '',
      sendAmountStore: '',
      receiveAmountStore: '',
      nameSendCoinStore: '',
      nameReceiveCoinStore: '',
      cuilStore: '',
      numberOfOperationStore: '',
      nameOfBankStore: '',
      selectCountryStore: '',
      telephoneStore: '',
      emailStore: '',
      emailOfPayoneerStore: undefined,
      emailOfPayPalStore: undefined,
      idOfPayPalTransactionStore: '',
      nameAndLastNameOfWiseStore: '',
      nameOfWiseStore: '',
      noteStore: '',
      requestTransaction: false,
    },
    ...loadFromLocalStorage(),
    setPersonalData: (name, lastName) =>
      set((state) => {
        const updatedState = {
          ...state,
          nameStore: name,
          lastNameStore: lastName,
        };
        saveToLocalStorage(updatedState);
        return updatedState;
      }),
    setTransactionDetails: (sendCoin, receiveCoin, sendAmount, receiveAmount) =>
      set((state) => {
        const updatedState = {
          ...state,
          sendCoinStore: sendCoin,
          receiveCoinStore: receiveCoin,
          sendAmountStore: sendAmount,
          receiveAmountStore: receiveAmount,
        };
        saveToLocalStorage(updatedState);
        return updatedState;
      }),
    setBankData: (cuil, numberOfOperation, nameOfBank) =>
      set((state) => {
        const updatedState = {
          ...state,
          cuilStore: cuil,
          numberOfOperationStore: numberOfOperation,
          nameOfBankStore: nameOfBank,
        };
        saveToLocalStorage(updatedState);
        return updatedState;
      }),
    setContactData: (selectCountry, telephone, email) =>
      set((state) => {
        const updatedState = {
          ...state,
          selectCountryStore: selectCountry,
          telephoneStore: telephone,
          emailStore: email,
        };
        saveToLocalStorage(updatedState);
        return updatedState;
      }),
    setEmailData: (emailOfPayoneer, emailOfPayPal) =>
      set((state) => {
        const updatedState = {
          ...state,
          emailOfPayoneerStore: emailOfPayoneer,
          emailOfPayPalStore: emailOfPayPal,
        };
        saveToLocalStorage(updatedState);
        return updatedState;
      }),
    setPayPalTransactionId: (idOfPayPalTransaction) =>
      set((state) => {
        const updatedState = {
          ...state,
          idOfPayPalTransactionStore: idOfPayPalTransaction,
        };
        saveToLocalStorage(updatedState);
        return updatedState;
      }),
    setWiseData: (nameAndLastName, nameOfWise) =>
      set((state) => {
        const updatedState = {
          ...state,
          nameAndLastNameOfWiseStore: nameAndLastName,
          nameOfWiseStore: nameOfWise,
        };
        saveToLocalStorage(updatedState);
        return updatedState;
      }),
    setNote: (note) =>
      set((state) => {
        const updatedState = { ...state, noteStore: note };
        saveToLocalStorage(updatedState);
        return updatedState;
      }),
    setRequestTransaction: (requestTransaction) =>
      set((state) => {
        const updatedState = { ...state, requestTransaction };
        saveToLocalStorage(updatedState);
        return updatedState;
      }),
    clearData: () => {
      localStorage.removeItem('requestTransactionStore');
      set({
        nameStore: '',
        lastNameStore: '',
        sendCoinStore: '',
        receiveCoinStore: '',
        sendAmountStore: '',
        receiveAmountStore: '',
        nameSendCoinStore: '',
        nameReceiveCoinStore: '',
        cuilStore: '',
        numberOfOperationStore: '',
        nameOfBankStore: '',
        selectCountryStore: '',
        telephoneStore: '',
        emailStore: '',
        emailOfPayoneerStore: undefined,
        emailOfPayPalStore: undefined,
        idOfPayPalTransactionStore: '',
        nameAndLastNameOfWiseStore: '',
        nameOfWiseStore: '',
        noteStore: '',
        requestTransaction: false,
      });
    },
  }),
);
