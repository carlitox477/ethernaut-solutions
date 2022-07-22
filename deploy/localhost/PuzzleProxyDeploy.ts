
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";


const deployPuzzleProxy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    
    const puzzleWalletDeployment=await deployments.get('PuzzleWallet')
    const puzzleWallet= await ethers.getContractAt("PuzzleWallet",puzzleWalletDeployment.address)
    const initEncodedData= puzzleWallet.interface.encodeFunctionData("init",[BigNumber.from("1"+"0".repeat(18))])

    const deploymentResult=await deploy('PuzzleProxy', {
        from: deployer,
        args: [deployer,puzzleWalletDeployment.address,initEncodedData],
        log: true,
    });
    
    showDeploymentAddress('PuzzleProxy',deploymentResult)
};

export default deployPuzzleProxy;
deployPuzzleProxy.tags = ['PuzzleProxy'];
deployPuzzleProxy.dependencies=['PuzzleWallet']

