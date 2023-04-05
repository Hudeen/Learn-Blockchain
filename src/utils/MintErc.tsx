import { contractAbi } from './ContractAbi'
import { usePrepareContractWrite, useContract, useAccount, useContractWrite, useWaitForTransaction, useSigner } from 'wagmi'
import {
    Button,
    Box
  } from '@chakra-ui/react'
import ethers from 'ethers';

export default async function MintNft() {

  const { data: signer, isError, isLoading } = useSigner()
  const tokenContract = {
      address: '0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1',
      abi: contractAbi,
  }
  const TokenSigner = useContract({
      ...tokenContract,
      signerOrProvider: signer,
  })
  const approve = await TokenSigner?.approve(STAKE_ADDRESS, ethers.utils.parseEther(TokenToStake!.toString()));
  
  console.log('Sheeesh')

return(

  <Box>
  <Button color='#fff' bgColor='#000' onClick={() => MintNft()}>Mint</Button>
</Box>

)
}