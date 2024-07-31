import type { ConfigRoutes } from '@/types/routes'

export const configRoutes: ConfigRoutes = {
    publicRoutes: [
        '/',
        '/auth/login',
        '/auth/change-password',
        '/auth/reset-password',
        '/auth/verify-email',
    ],
    authRoutes: ['/auth/login'],
    apiRoutes: [
        '/api/login',
        '/api/users',
        '/api/company',
        '/api/roles',
    ],
    protectedRoutes: [
        '/auth/settings',
        '/products/:path*'
    ],
}
