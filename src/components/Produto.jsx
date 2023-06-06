import {      
        Image,  
        Box,
        Flex,
        Button,
        Input,
        InputGroup,
        InputRightElement,
        Heading,
        Select
} from '@chakra-ui/react';

import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import parse from 'html-react-parser'

export const RenderProduto = () => {

    const { id } = useParams();
    const [ produtoRepo, setProdutoRepo ] = useState([]);
    const [ frete, setFrete ] = useState([])
    const [ form, setForm ] = useState({
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

    useEffect(() => {
        getProduto();
    }, [produtoRepo])

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
                        <Button width={'10vw'} onClick={handleRegistration}>
                            Calcular Frete
                        </Button>
                    </InputRightElement>

                </InputGroup>
            </Box>
        </Flex>
    )
}