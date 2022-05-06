import { DeployResult } from "hardhat-deploy/types"

const showDeploymentAddress=(contractName:string,deployment: DeployResult)=>{
    if(deployment.newlyDeployed){
        console.log(`New ${contractName} deployed in ${deployment.address}`)
    }else{
        console.log(`New ${contractName} deploying failed`)
    }
}

export default showDeploymentAddress