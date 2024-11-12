import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { Store } from '@reduxjs/toolkit';

interface ProviderProps {
  children: ReactNode;
  store: Store;  // Add the type for the store prop here
}

export function Providers({ children, store }: ProviderProps) {  // Type the props parameter explicitly
  return <Provider store={store}>{children}</Provider>;
}
