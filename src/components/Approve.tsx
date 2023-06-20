import { ERC20 } from '../contract/ContractAbi'
import { usePrepareContractWrite, useAccount, useContractWrite, useWaitForTransaction } from 'wagmi'
import { Button, Box, Text } from '@chakra-ui/react'
import { ethers } from 'ethers'

export default function Approve() {
  const value = ethers.utils.parseEther("2.0")
  const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
    address: '0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1',
    abi: ERC20,
    functionName: 'approve',
    args: ['0xC5aAc8d25B035Fc04f21dc85a62Cf6788C5bB3D4', value],
  })
  const { data, error, isError, write } = useContractWrite(config)
  const { isSuccess } = useWaitForTransaction({ hash: data?.hash})
  const { address, isConnected } = useAccount()

  if (isConnected == true && address != undefined) return (
    <Box>
      <Button color='#fff' bgColor='#000' onClick={() => write?.()}>Approve</Button>
      {isSuccess && ( <Box>Successfully Approved</Box>)}
      {(isPrepareError || isError) && ( <Box color='#000'>Error: {(prepareError || error)?.message}</Box> )}
    </Box>
  )

  return (
    <Text color='#000'>Nothing</Text>
  )
}