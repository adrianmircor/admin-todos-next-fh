'use client';

import { SessionProvider } from "next-auth/react";
import React from "react";

interface Props {
  children: React.ReactNode;
}

{/* HOC: High Order Component de tipo cliente*/ }
export default function AuthProvider({ children, ...rest }: Props) {
  return (
    <div>
      <SessionProvider>
        {children}
      </SessionProvider>
    </div>
  );
}