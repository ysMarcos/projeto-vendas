import { useParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { SimpleGrid, Text } from "@chakra-ui/react";
import { Header } from "../components/Header";
import { CardComponent } from "../components/Card";

export const CategoriaPage = () => {
    
    const { categorias_id } = useParams();
    const [repo, setRepo] = useState([]);

    const getProdutosCategoria = useCallback(async () => {
        try{
            const { data } = await axios.get(`http://localhost/admin/api/categoria/${categorias_id}`);
            setRepo(data);

        } catch(error){
            throw new Error(error);
        }
    })

    useEffect(() => {
        getProdutosCategoria();
    }, []);
    
    const renderProdutosCategoria = () => {
        return(
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))' padding={4}>
                {
                    repo.map((produto) => (
                        <CardComponent imagem={produto.imagem} produto={produto.produto} id={produto.id} valor={produto.valor}/>
                    ))
                }
            </SimpleGrid>
        )
    }

    return (
        <div>
            <Header />
            { renderProdutosCategoria() }
        </div>
    )
}