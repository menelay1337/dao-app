import React from "react";
import { Background } from "./background";


export function NoTokensMessage({address}) {
  return (
   <Background item={
    <>
	  <h1 className="text-center">Decentralized autonomous organization dApp</h1>
      <p className="text-center">Your address: {address}</p>
      <p className="text-center">You don't have Dao Token</p>
      <p className="text-center">
		To get Token require organizator/director to give you a named Token.
        <br />
        <br />
      </p>
    </>
   }></Background>
  );
}
