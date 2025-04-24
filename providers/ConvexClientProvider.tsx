'use client';

import {ReactNode} from 'react';
import {ClerkProvider, SignInButton, useAuth} from '@clerk/nextjs';
import {ConvexProviderWithClerk} from 'convex/react-clerk';
import {
  Authenticated,
  AuthLoading,
  ConvexReactClient,
  Unauthenticated,
} from 'convex/react';
import LoadingLogo from '@/components/shared/LoadingLogo';

type Props = {
  children: ReactNode;
}

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || '';
const convex = new ConvexReactClient(CONVEX_URL);

const ConvexClientProvider = ({children}: Props) => {
  return (
      <ClerkProvider>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <Authenticated>{children}</Authenticated>
          <AuthLoading><LoadingLogo/></AuthLoading>
          <Unauthenticated>
            <div className="flex flex-col items-center justify-center h-screen">
              <h1 className="text-2xl font-bold mb-4">Please sign in</h1>
              <SignInButton mode="modal" />
            </div>
          </Unauthenticated>
        </ConvexProviderWithClerk>
      </ClerkProvider>
  );
};

export default ConvexClientProvider;