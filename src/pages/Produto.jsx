import { Text,
        
        SimpleGrid, 
        Heading,
        useDisclosure,

    } from "@chakra-ui/react"
import { Header } from "../components/Header";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";

import { CardComponent } from "../components/Card";
import { RenderProduto } from "../components/Produto";

export const ProdutoPage = () => {

    
    
    const [ produtosRepo, setProdutosRepo ] = useState([]);

    const { isOpen, onOpen, onClose } = useDisclosure();




    const getOutrosProdutos = useCallback( async () => {
        try {
            const { data } = await axios.get(`http://localhost/admin/api/outros/`);
            setProdutosRepo(data);
        } catch(error) {
            throw new Error(error);
        }
    }, [produtosRepo])


    useEffect(() => {
        getOutrosProdutos();
    }, [produtosRepo])

    const modalFrete = () => {
        
        
        return (
            <Text> OI </Text>
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
            <RenderProduto />
            <Heading>Outros Produtos</Heading>
            { renderOutros() }
        </div>
    )
}