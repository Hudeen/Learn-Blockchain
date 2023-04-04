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
  } from '@chakra-ui/react'
  import { useConnect, useAccount, useBalance} from 'wagmi'
  import metalog from '../assets/img/metalog.png'

  export default function Popup() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {address, isConnected} = useAccount();
    const {data} = useBalance({});
    const { connect, connectors, isLoading, pendingConnector } = useConnect();

        if (isConnected == true && address != undefined) {return(
            <>
            <Button color='#0e0e0e'  _hover={{ bg: '#ffffff' }} bgColor='#e4e4e4' onClick={onOpen}>{isConnected ? (address.slice(0, 6) + '...' + address.slice(-4)) : "Wallet Connect"}</Button>
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
        )}else {return(
          <Box>
          {connectors.map((connector) => (
          <Button color='#0e0e0e' _hover={{ bg: '#ffffff' }} bgColor='#b7305' disabled={!connector.ready} key={connector.id} onClick={() => connect({ connector })}>
            {!connector.ready && ' (unsupported)'} {isLoading && connector.id === pendingConnector?.id} Connect
          </Button>
          ))}
          </Box>
        )}
    }