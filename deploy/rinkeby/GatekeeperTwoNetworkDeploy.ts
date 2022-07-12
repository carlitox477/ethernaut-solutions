
import "hardhat-deploy";
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {showDeploymentAddress} from "../../scripts/utils";
import { network } from "hardhat";

const deployGatekeeperTwoExploitNetwork: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    if(network.name ==="rinkeby"){
        const {deployments, getNamedAccounts} = hre;
        const {deploy} = deployments;
        const {exploiter} = await getNamedAccounts();

        const deploymentResult=await deploy('GatekeeperTwoExploit', {
            from: exploiter,
            args: [process.env.GATEKEEPER_TWO_ADDRESS],
            log: true,
        });
        showDeploymentAddress('GatekeeperTwoExploit',deploymentResult)
    }    
};

export default deployGatekeeperTwoExploitNetwork;
deployGatekeeperTwoExploitNetwork.tags = ['GatekeeperTwoExploitNetwork'];

