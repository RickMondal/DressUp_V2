'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function AuthButtons() {
  const { data: session, status } = useSession();
  if (status === 'loading') return null;
  if (session?.user) {
    return (
      <div style={{ marginLeft: 'auto' }}>
        <span style={{ marginRight: 8 }}>Hello, {session.user.name || session.user.email}</span>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div style={{ marginLeft: 'auto' }}>
      <button onClick={() => signIn('google')}>Sign in with Google</button>
      <button onClick={() => signIn('facebook')} style={{ marginLeft: 8 }}>Facebook</button>
    </div>
  );
}
