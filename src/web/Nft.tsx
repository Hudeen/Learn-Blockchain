import {
    Flex,
    Center,
    Img
  } from '@chakra-ui/react'
import nft from '../assets/img/nft.png'
import MintNft from '../utils/MintNft'

export default function Nft(){
return(
    <Flex gridRow='1' alignItems='flex-start' justifyContent='center' w='100%' h='85vh' bg='#f7fafc' color='#f7fafc'>
        <Center display='flex' flexDir='column' w='100%'>
        <Img src={nft} w='250px' borderRadius='10%' mt="50px" boxShadow='md' />
        <MintNft />
        </Center>
    </Flex>
)
}

