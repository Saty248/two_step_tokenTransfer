import { AddressLike, Contract, Wallet } from 'ethers';
import { smartWalletAbi } from "./abi";
import 'dotenv/config'


export class SmartWallet{
    private static smartWallet:SmartWallet;
    
    private constructor(){}
    public static getInstance():SmartWallet{
        if (!SmartWallet.smartWallet) {
            SmartWallet.smartWallet = new SmartWallet();
          }
          return SmartWallet.smartWallet;
        
    }
    public static async adderc20ContractData(smartWalletaddress:string,erc20Contract:string):Promise<string>{
        let contract=new Contract(smartWalletaddress,smartWalletAbi);
        let tx=await contract.adderc20Contract.populateTransaction(erc20Contract)
        return tx.data
    } 
    public static async adderc721ContractData(smartWalletaddress:string,erc721Contract:string,tokenId:string):Promise<string>{
        let contract=new Contract(smartWalletaddress,smartWalletAbi);
        let tx=await contract.adderc721Contract.populateTransaction(erc721Contract,tokenId)
        return tx.data
    }
    public static async erc721CallerData(smartWalletaddress:string,erc721Contract:string,txData:string):Promise<string>{
        let smartWalletContract=new Contract(smartWalletaddress,smartWalletAbi);
        let tx=await smartWalletContract.erc721Caller.populateTransaction(erc721Contract,txData)
        return tx.data;
    }  
   /*  public static erc20Caller 
    public static erc721Caller  */
}