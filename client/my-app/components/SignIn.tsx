import React from "react";
import { Button } from "./ui/button";

let getNonce = async (address: `0x${string}` | undefined) => {
  let ans = await fetch(`http://localhost:3001/nonce?address=${address}`);
  console.log("nonce data", ans);
};
type Props = {
  address: `0x${string}` | undefined;
};

export default async function SignInButton({ address }: Props) {
  /* let ans=await getNonce(address) */

  return (
    <Button variant={"outline"} className="w-full">
      SignIn
    </Button>
  );
}
