import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
    index('routes/index.tsx'), 
    route('login', 'routes/login/page.tsx'),
    route('app', 'routes/app/layout.tsx', [
        index('routes/app/index.tsx'),
    ]),
] satisfies RouteConfig;
