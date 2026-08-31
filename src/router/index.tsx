import { createBrowserRouter } from 'react-router-dom'
import RootRedirect from '@/pages/RootRedirect'
import LocaleRoot from '@/pages/LocaleRoot'
import Layout from '@/components/Layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRedirect />,
  },
  {
    path: '/:locale',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LocaleRoot />,
      },
    ],
  },
])

export default router
