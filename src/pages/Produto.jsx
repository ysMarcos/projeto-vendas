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
    const [ frete, setFrete ] = useState([])
    const [ form, setForm ] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure();

    setForm({
        cep_destino: "",
        peso: 5,
        valor: produtoRepo.valor,
        tipo_do_frete: 40010,
        altura: 5,
        largura: 10,
        comprimento: 20
    })

    const handleInputChange = useCallback((event) => {
        const { value } = event.target;

        setForm({
            ...form,
            cep_destino: value
        }, [form])
    }, [form])

    const handleRegistration = useCallback( async () => {
        try{

            const {cep_destino, peso, valor, tipo_do_frete, altura, largura, comprimento} = form;

            const { data } = await axios.get(
                `/calcula-frete/${cep_destino}/${peso}/${valor}/${tipo_do_frete}/${altura}/${largura}/${comprimento}`
            )
            setFrete(data);
        } catch(error){
            throw new Error(error);
        }
    }, [frete] )

    const getProduto = useCallback(async () => {
        try {
            const { data } = await axios.get(`http://localhost/admin/api/produto/${id}`);
            setProdutoRepo( data );
        }
        catch(error){
            throw new Error(error);
        }
    }, [produtoRepo])

    const getOutrosProdutos = useCallback( async () => {
        try {
            const { data } = await axios.get(`http://localhost/admin/api/outros/`);
            setProdutosRepo(data);
        } catch(error) {
            throw new Error(error);
        }
    }, [produtosRepo])




    useEffect(() => {
        getProduto();
    }, [produtoRepo])

    useEffect(() => {
        getOutrosProdutos();
    }, [produtosRepo])

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
                            id={'cep'}
                            size={'md'}
                            width={'10vw'}
                            placeholder="CEP"
                            onChange={handleInputChange}
                        />

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