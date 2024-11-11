import Layout from '@/Layout/Main';
import Home from '@/Pages/Home';
import CreateGame from '@/Pages/CreateGame';
import Game from '@/Pages/Game';
import Profile from '@/Pages/Profile';

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
            },
            {
                path: '/game/:id',
                Component: Game
            },
            {
                path: '/profile',
                Component: Profile
            }
        ]
    }
];

export default routerList;