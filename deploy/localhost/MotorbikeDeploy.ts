
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";
import { ethers } from "hardhat";


const deployMotorbike: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    
    const engineDeploymentResult=await deploy('Engine', {
        from: deployer,
        log: true,
    });

    const motorbikeDeploymentResult=await deploy('Motorbike', {
        from: deployer,
        args: [engineDeploymentResult.address],
        log: true,
    });

    const motorbike=await ethers.getContractAt('Motorbike',motorbikeDeploymentResult.address)
    
    showDeploymentAddress('Engine',engineDeploymentResult)
    showDeploymentAddress('Motorbike',motorbikeDeploymentResult)
};

export default deployMotorbike;
deployMotorbike.tags = ['Motorbike'];

