import { usePrepareContractWrite, useAccount, useContractWrite, useWaitForTransaction } from 'wagmi'
import { contractAbi } from '../contract/ContractAbi'
import { ethers } from 'ethers'
import { Button, Box, Text } from '@chakra-ui/react'

export default function MintNftForTokens() {
    const value = ethers.utils.parseEther("1.0")
    const { config, error: prepareError, isError: isPrepareError,
    } = usePrepareContractWrite({
        address: '0xC5aAc8d25B035Fc04f21dc85a62Cf6788C5bB3D4',
        abi: contractAbi,
        functionName: 'mintTokens',
        args: [value]
    })
    const { data, error, isError, write } = useContractWrite(config)
    const { isSuccess } = useWaitForTransaction({ hash: data?.hash})
    const { address, isConnected } = useAccount()

    if (isConnected == true && address != undefined) return (
      <Box>
        <Button color='#fff' bgColor='#000' onClick={() => write?.()}>Mint Token</Button>
          {isSuccess && ( <Text color='#000'> Successfully Mint Nft </Text> )}
          {(isPrepareError || isError) && ( <Box color='#000'>Error: {(prepareError || error)?.message}</Box> )}
      </Box>
      )

      return (
        <Text color='#000'>Nothing</Text>
      )
}