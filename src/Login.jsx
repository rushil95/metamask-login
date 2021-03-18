import React from "react";
import Web3 from "web3";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/user",
});

export default function Login() {
    return (
        <div>
            <button onClick={handleLogin}>Login Metamask</button>
        </div>
    );
}

async function handleLogin() {
    try {
        await window.ethereum.enable();
        console.log(window.ethereum);
        const web3 = new Web3(window.ethereum);
        console.log(web3);
        const publicAddress = await web3.eth.getCoinbase();
        console.log(publicAddress);

        //Get nonce using the public address
        const response = await api.get("/nonce", {
            params: { publicAddress },
        });
        const nonce = response.data;
        
        //Sign the nonce
        const signature = await web3.eth.personal.sign(
            web3.utils.fromUtf8(`I am signing my one-time nonce: ${nonce}`),
            publicAddress
        );

        //Verify signature
        const authResponse = await api.post("/auth", {
            publicAddress,
            signature,
        });
        console.log(authResponse);
    } catch (e) {
        console.error(e);
    }
}
