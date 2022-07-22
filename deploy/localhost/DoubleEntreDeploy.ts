
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";

const deployDoubleEntryPoint: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;
    const {exploiter,deployer} = await getNamedAccounts();
    const deployerAcc=await ethers.getSigner(deployer)
    
    const fortaDeploymentResult=await deploy('Forta', {
        from: deployer,
        args: [],
        log: true,
    });

    const legacyDeploymentResult=await deploy('LegacyToken', {
        from: deployer,
        args: [],
        log: true,
    });

    const cryptoVaultDeploymentResult=await deploy('CryptoVault', {
        from: deployer,
        args: [deployer],
        log: true,
    });

    const doubleEntryPointDeploymentResult=await deploy('DoubleEntryPoint', {
        from: deployer,
        args: [legacyDeploymentResult.address,cryptoVaultDeploymentResult.address,fortaDeploymentResult.address,exploiter],
        log: true,
    });

    const legacy=await ethers.getContractAt("LegacyToken",legacyDeploymentResult.address)
    const cryptoVault=await ethers.getContractAt("CryptoVault",cryptoVaultDeploymentResult.address)

    cryptoVault.connect(deployerAcc).setUnderlying(doubleEntryPointDeploymentResult.address)
    await legacy.connect(deployerAcc).mint(cryptoVaultDeploymentResult.address,BigNumber.from(`100${"0".repeat(18)}`))
    await legacy.connect(deployerAcc).delegateToNewContract(doubleEntryPointDeploymentResult.address)

    showDeploymentAddress('Forta',fortaDeploymentResult)
    showDeploymentAddress('LegacyToken',legacyDeploymentResult)
    showDeploymentAddress('CryptoVault',cryptoVaultDeploymentResult)
    showDeploymentAddress('DoubleEntryPoint',doubleEntryPointDeploymentResult)
};

export default deployDoubleEntryPoint;
deployDoubleEntryPoint.tags = ['DoubleEntryPoint'];
