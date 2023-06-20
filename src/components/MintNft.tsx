import { contractAbi } from '../contract/ContractAbi'
import { usePrepareContractWrite, useAccount, useContractWrite, useWaitForTransaction } from 'wagmi'
import { Button, Box, Text } from '@chakra-ui/react'

export default function MintNft() {
    const { config, error: prepareError, isError: isPrepareError,
    } = usePrepareContractWrite({
        address: '0xC5aAc8d25B035Fc04f21dc85a62Cf6788C5bB3D4',
        abi: contractAbi,
        functionName: 'mintEth',
    })
    const { data, error, isError, write } = useContractWrite(config)
    const { isSuccess } = useWaitForTransaction({ hash: data?.hash,})
    const { address, isConnected } = useAccount()

    if (isConnected == true && address != undefined) return (
        <Box>
            <Button color='#fff' bgColor='#000' onClick={() => write?.()}>Mint Eth</Button>
            {isSuccess && (
                <Box>
                    Successfully minted your NFT!
                </Box>
            )}
            {(isPrepareError || isError) && (
                <Box color='#000'>Error: {(prepareError || error)?.message}</Box>
            )}
        </Box>
    )

    return (
        <Text color='#000'>Hi</Text>
    )
}

