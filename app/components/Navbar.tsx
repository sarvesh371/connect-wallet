"use client";

import { Button } from "./button";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

declare global {
    interface Window {
        ethereum?: any;
    }
}

function Navbar() {

    const [address, setAddress] = useState<null | string>(null);

    useEffect(() => {
        const storedAddress = localStorage.getItem("address");
        if (storedAddress) {
            setAddress(storedAddress);
        }
    }, []);
    
    const connectWallet = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const walletAddress = signer.address;
            localStorage.setItem("address", walletAddress);
            setAddress(walletAddress);
        } catch (error) {
            console.error("Failed to connect wallet:", error);
        }
    };

    const disconnectWallet = () => {
        localStorage.removeItem("address");
        setAddress(null);
    };

    return (
        <nav className="flex border-b dark:border-gray-700 dark:bg-gray-900 shadow-md justify-between px-6 py-3">
            <div className="flex gap-[5vw]">
                {/* Add other nav items here if needed */}
            </div>
            <div className="flex items-center gap-3">
                {address ? (
                    <>
                        <span className="text-gray-400">
                            {address.slice(0, 6)}...{address.slice(-4)}
                        </span>
                        <Button variant="ghost" onClick={disconnectWallet}>
                            Disconnect
                        </Button>
                    </>
                ) : (
                    <Button variant="default" className="font-semibold dark:bg-[#1F2937] dark:text-white" onClick={connectWallet}>
                        Connect Wallet
                    </Button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
