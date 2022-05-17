import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { BigNumber } from "ethers"
import { ethers } from "hardhat"
import { DeployResult } from "hardhat-deploy/types"

const showDeploymentAddress=(contractName:string,deployment: DeployResult)=>{
    if(deployment.newlyDeployed){
        console.log(`New ${contractName} deployed in ${deployment.address}`)
    }else{
        console.log(`New ${contractName} deploying failed`)
    }
}


const cancelTransaction=async (transactionToCancelId: string, account: SignerWithAddress)=>{
    const transactionToCancel=await ethers.provider.getTransaction(transactionToCancelId)
    const newGasPrice=(transactionToCancel.gasPrice as BigNumber).mul(2)
    const cancelingTransactionData={
        from: account.address,
        to: account.address,
        value: 0,
        nonce: transactionToCancel.nonce,
        gasLimit: transactionToCancel.gasLimit,
        gasPrice: newGasPrice,
    }
    const cancelingTransaction=await account.sendTransaction(cancelingTransactionData)
    const cancelingTransactionReciept =await cancelingTransaction.wait()
    if(cancelingTransactionReciept.status==0){
        return [transactionToCancel.gasPrice, false]
    }
    return [transactionToCancel.gasPrice,true]

}

const cancelLastAccountTransaction=async (account: SignerWithAddress)=>{
    const cancelingTransactionData={
        from: account.address,
        to: account.address,
        value: 0,
        nonce: await account.getTransactionCount(),
        gasLimit: 21000,
        gasPrice: (await ethers.provider.getGasPrice()).mul(2),
    }
    const cancelingTransaction=await account.sendTransaction(cancelingTransactionData)
    const cancelingTransactionReciept =await cancelingTransaction.wait()
    if(cancelingTransactionReciept.status==0){
        return false
    }
    return true

}

export{showDeploymentAddress,cancelTransaction,cancelLastAccountTransaction}