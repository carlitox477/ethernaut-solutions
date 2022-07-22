
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";

const detectionBotExploit: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;
    const {exploiter} = await getNamedAccounts();
    const cryptoVaultDeployment= await deployments.get('CryptoVault')

    const detectionBotDeploymentResult=await deploy('DetectionBot', {
        from: exploiter,
        args: [cryptoVaultDeployment.address],
        log: true,
    });

    showDeploymentAddress('DetectionBot',detectionBotDeploymentResult)


};

export default detectionBotExploit;
detectionBotExploit.tags = ['DetectionBot'];
detectionBotExploit.dependencies = ['DoubleEntryPoint'];
