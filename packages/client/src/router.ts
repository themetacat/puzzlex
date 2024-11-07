import Layout from '@/Layout/Main';
import Home from '@/Pages/Home';
import CreateGame from '@/Pages/CreateGame';

const routerList = [
    {
        path: '/',
        Component: Layout,
        children: [
            {
                path: '',
                index: true,
                Component: Home
            },
            {
                path: '/create-game',
                Component: CreateGame
            }
        ]
    }
];

export default routerList;