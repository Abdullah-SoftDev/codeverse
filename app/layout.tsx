import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Menubar from '@/components/Menubar'
import TopLoaderBar from '@/components/TopLoaderBar'
import { Providers } from '@/context/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Codeverse',
  description: 'A universe where people can explore different projects build by the coding community.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <TopLoaderBar />
          <Navbar />
          <Menubar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
