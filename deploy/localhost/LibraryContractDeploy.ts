
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";
import { ethers } from "hardhat";


const deployLibraryContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  const deploymentResult=await deploy('LibraryContract1', {
    from: deployer,
    args: [],
    log: true,
    contract: 'LibraryContract'
  });
  showDeploymentAddress('LibraryContract',deploymentResult)

  

  const deploymentResult2=await deploy('LibraryContract2', {
    from: deployer,
    args: [],
    contract: 'LibraryContract',
    log: true,
  });

  const libraryContract1=await ethers.getContractAt("LibraryContract",deploymentResult.address)
  await libraryContract1.setTime(1)
  
  const libraryContract2=await ethers.getContractAt("LibraryContract",deploymentResult2.address)
  await libraryContract2.setTime(2)

  
  showDeploymentAddress('LibraryContract',deploymentResult2)
  
};

export default deployLibraryContract;
deployLibraryContract.tags = ['LibraryContract'];

