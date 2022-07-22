
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";
import { ethers, network } from "hardhat";
import * as dotenv from 'dotenv'
dotenv.config()

const detectionBotExploitNetwork: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    if(network.name==="rinkeby"){
        const {deployments, getNamedAccounts} = hre;
        const {deploy} = deployments;
        const {exploiter} = await getNamedAccounts();

        const detectionBotDeploymentResult=await deploy('DetectionBot', {
            from: exploiter,
            args: [process.env.CRYPTO_VAULT_ADDRESS as string],
            log: true,
        });

        showDeploymentAddress('DetectionBot',detectionBotDeploymentResult)
    }

    


};

export default detectionBotExploitNetwork;
detectionBotExploitNetwork.tags = ['DetectionBotNetwork'];
