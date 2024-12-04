import { useEffect } from 'react';
import { useMUD } from "./MUDContext";
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import RouterList from "./router";
import './reset.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {chains} from './chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: 'Puzzle',
  projectId: 'YOUR_PROJECT_ID',
  // @ts-ignore
  chains: [...chains],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

import '@rainbow-me/rainbowkit/styles.css';

const route = createBrowserRouter([
  ...RouterList,
  {
    path: '*',
    element: <Navigate to='/' />
  }
]);

export const App = () => {
  const {
    network
  } = useMUD();

  console.log('network----->>>>>', network)

  const queryClient = new QueryClient();

  useEffect(() => {
    async function setupContract() {
      try {
        // 获取当前账户地址（从网络配置中获取）
        const accounts = await network.walletClient.getAddresses();
        const signerAddress = accounts[0];
        console.log("Using signer address:", signerAddress);
        // 调用 setOwner 方法
        await network.worldContract.write.setOwner([signerAddress]);
      } catch (error) {
        console.error("Error during setupContract:", error);
      }
    }

    setupContract();
  }, [network]);

  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <RouterProvider router={route} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
};
