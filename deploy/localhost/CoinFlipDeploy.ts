
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";


const deployCoinFlip: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  const deploymentResult=await deploy('CoinFlip', {
    from: deployer,
    args: [],
    log: true,
  });

  showDeploymentAddress('CoinFlip',deploymentResult)
  
};

export default deployCoinFlip;
deployCoinFlip.tags = ['CoinFlip'];

