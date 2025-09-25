"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { useEffect } from "react";
import dayjs from "dayjs";
import { io } from "socket.io-client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import 'dayjs/locale/pt-br'

// Initializer socket.io
export const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Set locale to pt-br
    dayjs.locale('pt-br')

    // Fix para a altura do app em todos os dispositivos
    const updateAppHeight = () => {
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight - 64}px`);
    };

    // Atualiza quando a janela for redimensionada
    window.addEventListener('resize', updateAppHeight);

    // Atualiza imediatamente
    updateAppHeight();

    // Limpa o event listener quando o componente é desmontado
    return () => window.removeEventListener('resize', updateAppHeight);
  }, [])

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
      {children}

      <ProgressBar
        height="4px"
        color="#493cdd"
        shallowRouting
      />

      <Toaster />
    </ThemeProvider>
  )
}