"use client";

import React, { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";

interface IProps {
  setErrorModal: Dispatch<SetStateAction<boolean>>;
}

export default function ErrorModal({ setErrorModal }: IProps) {
  return (
    <div className=" bg-red-600 text-center text-white text-3xl rounded-lg z-10 w-1/2 h-1/2 flex flex-col justify-evenly items-center m-4 left-1/3 fixed">
      Something went wrong!!
      <br />
      Try again!!
      <Button
        variant="outline"
        className="text-black"
        onClick={() => {
          setErrorModal(false);
        }}
      >
        Got it
      </Button>
    </div>
  );
}
