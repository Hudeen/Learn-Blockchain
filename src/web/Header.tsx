import {
    Box,
    Text,
    Flex,
    Center
  } from '@chakra-ui/react'
import Popup from '../panels/Popup'

export default function Header() {
    return(
    <Flex gridRow='1' justifyContent='space-around' w='100%' h='120px' bg='#ef5b5b' color='white'>
        <Center>
            <Text fontSize='2rem'>Hudeen's Mint Nft</Text>
        </Center>
        <Center>
            <Popup />
        </Center>
    </Flex>
)
}

 