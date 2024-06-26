import { useMemo, useEffect, useCallback } from 'react';

import { useSetState } from 'src/hooks/use-set-state';

import { setSession } from './utils';
import { STORAGE_KEY } from './constant';
import { AuthContext } from '../auth-context';

import type { AuthState } from '../../types';

// ----------------------------------------------------------------------

/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const { state, setState } = useSetState<AuthState>({
    user: null,
    loading: true,
  });

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (accessToken) {
        setSession(accessToken);

        // const res = await axios.get(endpoints.auth.me);

        // const { user } = res.data;

        const user = {
          id: '8864c717-587d-472a-929a-8e5f298024da-0',
          displayName: 'Jaydon Frankie',
          email: 'demo@minimals.cc',
          photoURL: '',
          phoneNumber: '',
          country: '',
          address: '90210 Broadway Blvd',
          state: 'California',
          city: 'San Francisco',
          zipCode: '94116',
          about:
            'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
          role: 'admin',
          isPublic: true,
        };

        setState({ user: { ...user, accessToken }, loading: false });
      } else {
        setState({ user: null, loading: false });
      }
    } catch (error) {
      console.error(error);
      setState({ user: null, loading: false });
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user
        ? {
            ...state.user,
            role: state.user?.role ?? 'admin',
          }
        : null,
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
