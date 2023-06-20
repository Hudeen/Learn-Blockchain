import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Image,
    Box,
    Text,
    VStack,
    useToast
  } from '@chakra-ui/react'

  import { useConnect, useBalance, useAccount, useChainId } from 'wagmi'
  import  { getNetwork, switchNetwork } from '@wagmi/core'
  import metalog from '../images/metalog.png'
  import { polygonMumbai } from '@wagmi/core/chains'
  import { useState } from 'react'

  export default function Popup() {
    const {address, isConnected} = useAccount();
    const {data} = useBalance({
      address: address
    });
    const { chain, chains } = getNetwork()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { connect, connectors, isLoading, pendingConnector } = useConnect();
    const toast = useToast()
    const [ counter, setCounter ] =  useState(0)

    async function Switch() {
      const network = await switchNetwork({
        chainId: polygonMumbai.id
      })
    }

    if(chain != undefined){
      if(chain.id != polygonMumbai.id && isConnected) { Switch()
        if (counter == 0){
          toast({
            title: 'Switch network pls',
            duration: 9000,
            isClosable: true
          })
          setCounter(counter + 1)
        }
      }
    }

    if (isConnected == true && address != undefined) {
      return (
        <>
          <Button color='#0e0e0e' _hover={{ bg: '#ffffff' }} bgColor='#e4e4e4' onClick={onOpen}>{isConnected ? (address.slice(0, 6) + '...' + address.slice(-4)) : "Wallet Connect"}</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay /> 
              <ModalContent>
                <ModalHeader display="flex" alignItems="center" justifyContent="center">Connected</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <VStack>
                      <Image src={metalog} borderRadius='full' boxSize='150px' height='100px' width='100px'/>
                      <Text>{isConnected ? (address.slice(0, 6) + '...' + address.slice(-4)) : "Wallet Connect"}</Text>
                      <Text>{data?.formatted.slice(0, 6)} {data?.symbol}</Text> 
                    </VStack>
                  </Box>
                </ModalBody>
                <ModalFooter display="flex" alignItems="center" justifyContent="center">
                  <Button onClick={onClose}  color='#ffffff' _hover={{ bg: '#dd3939' }} bgColor='#ef5b5b'>Disconnect</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
        </>
      )} else {     
      return (
          <Box>
            {connectors.map((connector) => (
            <Button color='#0e0e0e' _hover={{ bg: '#ffffff' }} bgColor='#b7305' disabled={!connector.ready} key={connector.id} onClick={() => connect({ connector })}>
              {!connector.ready && ' (unsupported)'} {isLoading && connector.id === pendingConnector?.id} Connect
            </Button>
            ))}
          </Box>
        )
      }
    }