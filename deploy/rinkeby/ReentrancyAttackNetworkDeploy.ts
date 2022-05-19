
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";
import { network } from "hardhat";

import * as dotenv from 'dotenv'
dotenv.config()

const deployReentrancyAttackNetwork: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    if(network.name==="rinkeby"){
        const {deployments, getNamedAccounts} = hre;
        const {deploy} = deployments;
        const {exploiter} = await getNamedAccounts();
        
        const deploymentResult=await deploy('ReentrancyAttack', {
            from: exploiter,
            args: [process.env.REENTRANCE_ADDRESS as string],
            log: true,
        });

        showDeploymentAddress('ReentrancyAttack',deploymentResult)
    }
};

export default deployReentrancyAttackNetwork;
deployReentrancyAttackNetwork.tags = ['ReentrancyAttackNetwork'];

