"use client";

import { useAccount, useDisconnect,useSignMessage } from "wagmi";
import { Button } from "./ui/button";
import SignInButton from "./SignIn";
import { useState } from "react";
import ErrorModal from "./errorModal";

type ans2 = {
  data?: {
    nonce?: any;
    message?: string;
    tempToken?: string;
  };
  error?: any;
};
export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const [isErrorModal, setErrorModal] = useState(false);
  const handleClick = async () => {
    try {
      console.log("am clicked");
      let ans = await fetch("http://localhost:3000/api", { headers: { address: `${address}` } });
      let ans2: ans2 = await ans.json();
      if (ans2.error) {
        throw new Error();
      } else {
        let onSuccess1 = () => {
          console.log("yooo successss");
        };
        let onError1 = () => {
          console.log("yooo error");
        };
        let signAns = await signMessageAsync(
          { message: `${ans2.data?.message}` },
          { onSuccess: onSuccess1, onError: onError1 },
        );
        console.log("signatures ", signAns);

        let req1Header = {
          authorization: `${ans2?.data?.tempToken}`,
          signature: `${signAns}`,
        };
        console.log("req1Header ", req1Header);
        let ans3 = await fetch("http://localhost:3000/api", {
          method: "POST",
          headers: req1Header,
        });

        let ans4 = await ans3.json();
        console.log("ans4", ans4);
        if (ans4.status == 200) {
          console.log("yooo");
        } else {
          setErrorModal(true);
        }
      }
    } catch (error) {
      console.log(error);
      setErrorModal(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      {isErrorModal && <ErrorModal setErrorModal={setErrorModal} />}

      {address && <div className="flex text-white">{address}</div>}
      <div className="flex">
        {/* <SignInButton address={address}/> */}
        <Button variant="outline" className="" onClick={handleClick}>
          Signin
        </Button>
        <Button variant="outline" className="" onClick={() => disconnect()}>
          Disconnect
        </Button>
      </div>
    </div>
  );
}
