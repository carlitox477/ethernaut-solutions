
import * as dotenv from 'dotenv'
dotenv.config()

import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";
import { network } from "hardhat";



const deployForceAttackNetwork: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    if(network.name==="rinkeby"){
        const {deployments, getNamedAccounts} = hre;
        const {deploy} = deployments;
        const {exploiter} = await getNamedAccounts();

        const deploymentResult=await deploy('ForceAttack', {
            from: exploiter,
            args: [],
            log: true
        });

        showDeploymentAddress('ForceAttack',deploymentResult)
    }
    
};

export default deployForceAttackNetwork;
deployForceAttackNetwork.tags = ['ForceAttackNetwork'];
