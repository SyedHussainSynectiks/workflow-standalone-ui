import { Inter } from 'next/font/google'
import './globals.css';
import { Spin } from 'antd';

import { Providers } from '@/Context/provider'
import { store } from '@/Context/store';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Workflow App',
  description: 'Manage Your Projects',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>

      </body>
    </html>
  )
}
