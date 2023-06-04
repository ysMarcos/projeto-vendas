import { Text, Image, SimpleGrid, Heading, Grid, GridItem, Button } from "@chakra-ui/react"
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
            const { data } = await axios.get(`http://localhost/admin/api/outros/`)
            setProdutosRepo(data)
        } catch(error) {
            throw new Error(error);
        }
    })


    useEffect(() => {
        getProduto();
    }, [])

    useEffect(() => {
        getOutrosProdutos();
    }, [])

    const renderProduto = () => {
        
        const htmlString = String(produtoRepo.descricao)
        
        return (
            <Grid
                h='50vh'
                templateAreas={`
                    "imagem titulo"
                    "imagem descricao"
                    "imagem botao"
                `}
                gridTemplateRows={'15vh 1fr 7vh'}
                gridTemplateColumns={'35vw 1fr'}
            >
                <GridItem
                    area={'imagem'}
                    >
                    <Image src={`http://localhost/admin/fotos/${produtoRepo["imagem"]}m.jpg`} />
                </GridItem>
                <GridItem
                    area={'titulo'}
                    >
                    <Heading> { produtoRepo.produto } </Heading>
                </GridItem>
                <GridItem
                    area={'descricao'}
                >
                    <div>{ parse(htmlString) }</div>
                </GridItem>
                <GridItem
                    pl={5}
                    area={'botao'}
                >
                    <Button>Comprar</Button>
                </GridItem>
            </Grid>
        )
    }

    const renderOutros = () => {
        return (
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))' padding={4}>
            {
                produtosRepo.map((produto) => (
                    <div>
                    <CardComponent imagem={produto.imagem} produto={produto.produto} id={produto.id}/>
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