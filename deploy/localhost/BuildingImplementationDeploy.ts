
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";


const deployBuildingImplementation: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  const {deployer} = await getNamedAccounts();
  const elevator= await deployments.get("Elevator")
  const deploymentResult=await deploy('BuildingImplementation', {
    from: deployer,
    args: [elevator.address],
    log: true,
  });

  showDeploymentAddress('BuildingImplementation',deploymentResult)
  
};

export default deployBuildingImplementation;
deployBuildingImplementation.tags = ['BuildingImplementation'];
deployBuildingImplementation.dependencies=["Elevator"]

