import React, { ReactNode } from 'react';
import { BookmarkedPostsProvider } from './bookmarkContext';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <BookmarkedPostsProvider>
      {children}
    </BookmarkedPostsProvider>
  );
}
