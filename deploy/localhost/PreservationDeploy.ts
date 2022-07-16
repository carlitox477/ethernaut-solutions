
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";

const deployGatekeeperTwoExploit: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy} = deployments;
    const {exploiter} = await getNamedAccounts();
    const libraryContract1= await deployments.get("LibraryContract1")
    const libraryContract2= await deployments.get("LibraryContract2")
    
    const deploymentResult=await deploy('Preservation', {
        from: exploiter,
        args: [libraryContract1.address,libraryContract2.address],
        log: true,
    });

    showDeploymentAddress('Preservation',deploymentResult)
};

export default deployGatekeeperTwoExploit;
deployGatekeeperTwoExploit.tags = ['Preservation'];
deployGatekeeperTwoExploit.dependencies=["LibraryContract"]

