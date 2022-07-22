
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";


const deployPuzzleWallet: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  const deploymentResult=await deploy('PuzzleWallet', {
    from: deployer,
    args: [],
    log: true,
  });

  showDeploymentAddress('PuzzleWallet',deploymentResult)
  
};

export default deployPuzzleWallet;
deployPuzzleWallet.tags = ['PuzzleWallet'];

