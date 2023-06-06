import { Text,
        Image,
        SimpleGrid, 
        Heading,
        useDisclosure,
        Box,
        Flex,
        Button,
        Input,
        InputGroup,
        InputRightElement,
        Select
    } from "@chakra-ui/react"
import { Header } from "../components/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import parse from 'html-react-parser'
import { CardComponent } from "../components/Card";

export const ProdutoPage = () => {

    const { id } = useParams();
    const [ produtoRepo, setProdutoRepo ] = useState([]);
    const [ produtosRepo, setProdutosRepo ] = useState([]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const getProduto = useCallback(async () => {
        try {
            const { data } = await axios.get(`http://localhost/admin/api/produto/${id}`);
            setProdutoRepo( data );
        }
        catch(error){
            throw new Error(error);
        }
    })

    const getOutrosProdutos = useCallback( async () => {
        try {
            const { data } = await axios.get(`http://localhost/admin/api/outros/`);
            setProdutosRepo(data);
        } catch(error) {
            throw new Error(error);
        }
    })

    /*const getCep = useCallback( async () => {
        try{
            const { data } = await axios.get(
                `/calcula-frete/${cep_destino}/${peso}/${valor}/${tipo_do_frete}/${altura}/${largura}/${comprimento}`
              )
            setCalcFrete(data);
        } catch(error){
            throw new Error(error);
        }
    } )*/

    useEffect(() => {
        getProduto();
    }, [])

    useEffect(() => {
        getOutrosProdutos();
    }, [])

    // const renderProduto = () => {
        
    //     const htmlString = String(produtoRepo.descricao)
        
    //     return (
    //         <Grid
    //             h='50vh'
    //             templateAreas={`
    //                 "imagem titulo"
    //                 "imagem preco"
    //                 "imagem botao"
    //             `}
    //             gridTemplateRows={'15vh 1fr 15vh'}
    //             gridTemplateColumns={'25vw 1fr'}
    //             marginLeft='25vw'
    //             marginTop='15vh'
    //             marginBottom='5v'
    //         >
    //             <GridItem
    //                 area={'imagem'}
    //                 width='100%'
    //                 >
    //                 <Image src={`http://localhost/admin/fotos/${produtoRepo["imagem"]}m.jpg`} />
    //             </GridItem>
    //             <GridItem
    //                 area={'titulo'}
    //                 >
    //                 <Heading> { produtoRepo.produto } </Heading>
    //             </GridItem>
    //             {/* <GridItem
    //                 area={'descricao'}
    //             >
    //                 <div>{ parse(htmlString) }</div>
    //             </GridItem> */}
    //             <GridItem
    //                 area={'preco'}
    //             >
    //                 <Heading as='h4' size='lg'>{ produtoRepo.valor }</Heading>
    //             </GridItem>
    //             <GridItem
    //                 pl={0}
    //                 area={'botao'}
    //             >
    //                 <Input placeholder="CEP" htmlSize={4} width='15vw' type='number'/>
    //                 <Button onClick={onOpen}>Comprar</Button>

    //                 <Modal isOpen={isOpen} onClose={onClose}>
    //                     <ModalOverlay />
    //                     <ModalContent>
    //                         <ModalHeader>TItulo</ModalHeader>
    //                         <ModalCloseButton />
    //                         <ModalBody>
    //                             <Text>Oi</Text>
    //                         </ModalBody>
    //                         <ModalFooter>
    //                             <Button onClick={onClose}>Fechar</Button>
    //                         </ModalFooter>
    //                     </ModalContent>
    //                 </Modal>
    //             </GridItem>
    //         </Grid>
    //     )
    // }


    const modalFrete = () => {
        
        
        return (
            <Text> OI </Text>
        )
    }

    const renderProduto = () => {

        const htmlString = String(produtoRepo.descricao);

        return (
            <Flex 
                maxW='4xl' 
                borderWidth='2px' 
                margin={'auto'}
                flexDir={'row'}
                justifyContent={'space-around'}
                >
                <Box maxW='30vw' margin={'auto'}>
                    <Image src={`http://localhost/admin/fotos/${produtoRepo["imagem"]}m.jpg`} />
                </Box>
                <Box p='2em' m='1em'>
                    <Heading as='h2' size='lg' >
                        { 
                            produtoRepo.produto 
                        }
                    </Heading>
                    
                    <Box w={'20vw'} h={'20vh'} borderWidth='1px' padding={5}>
                        {
                            parse(htmlString)
                        }
                    </Box>
                    <Select id="parcela">
                        <option value="1">1x R${ Math.round(produtoRepo.valor / 1) }</option>
                        <option value="2">2x R${ Math.round(produtoRepo.valor / 2) }</option>
                        <option value="3">3x R${ Math.round(produtoRepo.valor / 3) }</option>
                        <option value="4">4x R${ Math.round(produtoRepo.valor / 4) }</option>
                        <option value="5">5x R${ Math.round(produtoRepo.valor / 5) }</option>
                        <option value="6">6x R${ Math.round(produtoRepo.valor / 6) }</option>

                    </Select>
                    <InputGroup>
                    
                        <Input 
                            size={'md'}
                            width={'10vw'}
                            placeholder="CEP" />

                        <InputRightElement width={'10vw'}>
                            <Button width={'10vw'}>
                                Calcular Frete
                            </Button>
                        </InputRightElement>

                    </InputGroup>
                </Box>
            </Flex>
        )
    }

    const renderOutros = () => {
        return (
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))' padding={4}>
            {
                produtosRepo.map((produto) => (
                    <div>
                    <CardComponent imagem={produto.imagem} produto={produto.produto} id={produto.id} valor={produto.valor}/>
                    </div>
                ))
            }
            </SimpleGrid>
        )
    }


    return (
        <div>
            <Header />
            { renderProduto() }
            <Heading>Outros Produtos</Heading>
            { renderOutros() }
        </div>
    )
}