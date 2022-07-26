# Challenge 3: Fallback
Related hack: Value Defi

# Challenge 3: Coinflip
The key to solve this game is understanding why the CoinFlip flip function isn't random and how to exploit this failure with a contract.

When we use the word "transaction", we are not refering necesary to a movement of ether. A transaction, in blockchain development, consist in the execution of a function which is meant to be included in a block. Whe nwe send ether from our address to other we are calling the function *transfer*, which has a gas limit cost (max amount of computer power that is expected to be demanded to execute it), and we establish a price for these gas to be paid. However, an EVM compatible blockchain as ethereum, polygon or BSC allow us to include our own code in it and execute all the function included in it.

Why this is important? As we know, a block include multiple transactions, meaning that all the information from a block before its minting can be accessed during its mintings by the transactions included in it.

The flip function is:
```solidity
function flip(bool _guess) public returns (bool) {
    uint256 blockValue = uint256(blockhash(block.number.sub(1)));

    if (lastHash == blockValue) {
        revert();
    }

    lastHash = blockValue;
    uint256 coinFlip = blockValue.div(FACTOR);
    bool side = coinFlip == 1 ? true : false;

    if (side == _guess) {
        consecutiveWins++;
        return true;
    } else {
        consecutiveWins = 0;
        return false;
    }
}
```

We can see that
* ```blockvalue``` depends on the block number where the function is called, meaning that this value can be calculated by any other function executed in the same block
* ```lastHash``` if we see the full code and this function, we realize that with this value we are allowed to call this function just once per block.
* ```coinFlip``` value relies on ```blockvalue```, which we said it depends on the block. Meaning that its value can be calculated by other code executed in the same block.
* ```side``` depends on ```coinflip``` value, which means it depends on the current block.
* ```guess``` is the value we send to execute the function, if it is equal to ```side``` we will increse the ```consecutiveWins```.

It is clear this function isn't random, but how can we take advantage of these? We should deploy a contract with at least one function that calculates side and then call the function flip with this value. This will always be successful as long as we execute this new function just once per block. In other words, we need to include the next function in a contract, deploy the contract and call the function 10 times:

```solidity
function flip() public returns (bool) {
    uint256 blockValue = uint256(blockhash(block.number.sub(1)));
    uint256 coinFlip = blockValue.div(FACTOR);
    bool side = coinFlip == 1 ? true : false;
    return coinFlipContract.flip(side);
}
```

A solution for this challenge can be found in this github repository of my own, feel free to give it a look.
Related exploit: FOMO3D, 

# Challenge 4: Telephone
In order to win this challenge we need to understand the difference between tx.origin and msg.sender:
* tx.origin refers to a global variable which refers to the original external account that started a transaction. For instance, if we call the function changeOwner we will be the tx.origin, and we call a contract function which call the function changeOwner we will be the tx.origin too.
* msg.sender refers to the immediate account that invokes a function. If we call the function changeOwner we will be the msg sender. However if we call a contract function which calls the changeOwner function, the msg.sender will be equal to the contract address.

Now it is clear that the solution is deploying a contract which calls the changeOwner function.

# Challenge 5: Token
Mathematically the contract is well writen, but if you know a little about solidity before its version 0.8 you'll know that overflow and underflow isn't checked by the compiler. This means that the next line will be always true
```solidity
balances[msg.sender] - _value >= 0
```
And, what's more important for this challenge is that if ```_value``` is greater than ```balances[msg.sender]``` and ```_value<MAX_INT-balances[msg.sender]```, then ```balances[msg.sender] - _value``` will result greater than ```balances[msg.sender]```

It is important to say, that in order to get advantage of this exploit we will need to use two account, otherswise we won't change our balance.

# Challenge 5: Delegate

## Delegate call
When we use a delegate call, we call a function from other contract as if the code was pasted inside the current contract. This means that if A call B and B delegate a call to C.
* When we execute the function delegated to C, our context will be the same as B. Meaning that the msg.sender will be A and msg.value will be the value sent from A to B
* The code will be executed on B state varialbes and we are going to use ETH in B

This delegate call function which can be used for any contract allow us to create libraries.

## Call
The call function is available for every address variable. It allow us to call a function to an address. If this function is not found, it calls the fallback function. The cal function will require to specify the function signature code and its parameters. To get the function signature code we use the special function **abi-encodeWithSignature("function_name(param_type_1, param_type_2)")** (It is important that the list of paramaters don't have whitespaces between).
More information [here](https://www.youtube.com/watch?v=mz10sUmEdsM)

## msg.data
IT is important to take into account that **msg.data** include all our call data. In our exploit, it means all the bytes send by paramater with the function **call**.

According to the documentation: The complete call data holds the function and its arguments that the transaction invokes

## Exploit
First, we know that we should directly call the delegation contract beacause we can only set the msg.sender as new owner. So, we need a way to directly call the contract with out function call as data. This won't find the function we want to call and will call the fallback function, calling the pwn function and getting us the ownership

### Hardhat issues
We should add a line in the Delegation contract
```solidity
require(result==true)
```
Otherwise, it won't modified the storage values of the contract. It seems a hardhat particular issue. More info [here](https://ethereum.stackexchange.com/questions/114783/solidity-0-8-delegatecall-does-not-mutate-contracts-storage)

# Challenge 7: Force
The self destruct method can send all its ether balance to any address without a possible rejection or before the contract being deployed

# Challenge 8: Vault
Although private values aren't direct accessable by a function, we can always see the corresponding memory slot in the contract.
Up to this date (17/05/2022) memory slots have always been of 256 in EVM.

The compiler put the byte32 storage value in one single slot, while a bool depends on the variable declared before and after. In our case, bool is put in the slot 0, while the byte32 in slot 1.

This means our password is in the slot 1, if we get it we can unlock our contract.

# Challenge 9: King
The contract may seem well written, only the owner can always claim its throne and we can't modified the owner. However, it must be said that the requirement isn't becoming the king. It it that the current king (the owner) isn't allowed to claim the throne again.

Once we get this idea, we can see a vector attack with the transfer call. What if we set a contract that every time it recieve ether the transaction is reverted? This will deny everyone (included the owner) to get our throne (the contract throne, actually).

# Challenge 10: Reentrance
This atacck is pretty similar to the last one. Balances are modified after sending ether back to someone who withraw. If it is a human account, this shouldn't generate any problem. However, a contract account may activate its recieve function, and this may call back the whithraw option, draining our contract balance.

Related hacks: Maker Dao, fort ETH an ETC

# Challenge 11: Elevator
The error is pretty easy to see, the Building interface method **isLastFloor** should have been set as view, restricting an implementation that could change state value.

# Challenge 12: Privacy
We can get private storage values by getting the slot where they are stored and getting the value we want.

# Challenge 13: Gatekeeper One
* To pass gateOne we only need to use a contract
* To pass gateTwo we need to use remix console to calculate the gas we are gonna need. After some debugging we notice that the gas used until gasleft() is 254
* To pass gateThree, considering we are sending a ket of 8 bytes (64 bits):
    * ```uint32(uint64(_gateKey) == uint16(uint64(_gateKey))``` if the last 16 bits are to the last 32 bits are equal to 0. Meaning our gatekey should be sth like 0xXXXXXXXX0000XXXX
    * ```uint32(uint64(_gateKey)) != uint64(_gateKey)``` if at least one of the X Hex is different from 0: 0xXXXXXXXXOOOOOOOO
    * ```uint32(uint64(_gateKey)) == uint16(tx.origin)``` if the last 16 bits (8 HEX) are equal to the last 16 bits of the contract address. This is 0xXXXXXXXX0000TTTT

This means our gate key will be contract.address & 0xFFFFFFFF0000FFFF. We are masking our address with operator and.

# Challenge 14: Gatekeeper Two
* To pass gateOne we only need to use a contract
* The extcodesize function return the contract lenght of an address. It returns 0 if it is a user or, if we are using the caller function, if tx.origin is being contructed (extcodesize(caller) is called by the constructor). In other word, to pass gateTwo we need to call enter from the contructor.
* To pass gateThree we need ```uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))) ^ uint64(_gateKey) == uint64(0) - 1```. ^ is the XOR operator, this means that we should tho the inverse which is XOR to get the correct _gateKey: ```(uint64(0) - 1) ^ uint64(bytes8(keccak256(abi.encodePacked(msg.sender))))``` will be our correct key. We should consider that msg.sender will be our exploit contract address. So if we calculate this value inside the exploit contract we are going to have ```bytes8 key = bytes8(uint64(bytes8(keccak256(abi.encodePacked(address(this))))) ^ (uint64(0) - 1));```

# Challenge 15: Naught Coin
The key here is understanding the bad implementation of the ERC20 token. Even though transfer function was override and it was added the lockTokens modifier, others functions from ERC20 wasn't implemented. Meaning transferFrom and approve are the same than ERC20, so we can use this functions to exploit the contract.

# Challenge 16: Preservation
A delegation call simulate the execution of code from other contract in the context of the contract we are calling. This can esealy lead to vulnerabilities when these external contracts modify state variables, due to the fact that we will change memory storage slots in the caller contract.

Knowing this, we are going to build a contract which modifies its third memory storage slot and we will send this contract address as an int to the Preservation contract through the setFirstTime function. After that, we will call this function with the exploiter address as an integer.

# Challenge 17: Recovery
This challenge consists in looking into internal transactions to find the contract to destroy.

# Challenge 18: Magic number
Opcodes: https://www.ethervm.io/

We must remeber that EVM is a stack machine.

When we deploy a contract we are just sending data to the blockchain, the EVM will interpret that this data was sent to create a contract and how this contract is. This data, when we create a contract, wil be divided in two
* Initialization: This is the constructor
* Runtime: The rest of the contract that will be called whenever we call a function of the contract.

For this challenge we need that our runtime lenght to be just 10 opcodes. 

# Challenge 19: Alien Codex
Every contract is asigned 2^256 memory slot that can use.
If an array has a length of 2^256, it has access to all memory slots assigned to the contract.
For a dynamic array, the zero position is in the slot keccak256(slot_where_array_lenght_is_saved).

p = 0
2^256 - p is the position until overflow from the memory assigned to the contract, one more would be the slot 0 (at least in theory)

Exploit underflow
Edit the correct memory slot(0)

# Challenge 20: Denial
The goal of this challenge is to deny owner withraw call at any cost.
The contract show a reentrancy vulnerability that we can exploit

# Challenge 21: Shop
Take advantage of other view function to build a view function which change its answer during execution

# Challenge 22: Dex
Play with the price

# Challenge 23: DexTwo
Take advantage of the lack of token checks

# Challenge 24: Puzzle Wallet
The key here is:
* Understanding how a proxy contract works
* Understanding the multicall function
* By default the balance is 0.001 ether

First of all, we need to become the owner the Puzzle Wallet contract (Actually, the proxy). This can be done by calling the proposeNewAdmin function in the PuzzleProxy contract, due to the fact that this function allow us to change the memory slot were owner is stored.

Then we should  whitelist ourselves with the ```addToWhitelist``` function.

If we find the way to make a deposit of 0.002 ether by sending just 0.001 ether, then we can extract 0.002 ether and call the setMaxBalance function to set ourselves as admin of the proxy contract (We are going to edit the same memory slot).

Even though the ```multicall``` function was made to avoid calling the deposit function multiple times, it made nothing about the multicall function. So we can call multiple times the multicall function with a single call to the deposit function but with just 0.001 ether.

Afte making this, we call the execute function to retiire 0.002 ether and then we call the ```setMaxBalance``` to set ourselves as admin

# Challenge 25: Motorbike
This proxy made a mistake during deploy, the initialize function was never called in the implementation address, allowing anyone to call this function, become the upgrader and upgrade the contract.

# Challenge 26: DoubleEntry
Some fucking idea.

First of all, we need to understand that whenever we transfer LegacyToken we are transferyn DoubleEntryPoint tokens (see ```transfer``` function in LegacyToken contract) by calling ```delegateTransfer```.

When we call ```delegateTransfer``` we use the fortaNotify modifer, which call ```forta.notify(player, msg.data)```. Then, the Forta contracts call the handleTransaction function to the player DetectionBot contract.

So, given that whenever we call the transfer sweep function inside CryptoVault we call the transfer function from LegacyToken, and by doing this we produce the exploit, we just need to create a bot that raise an alert from the Forta contract whenever this function is called.