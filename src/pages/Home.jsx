import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { SimpleGrid } from "@chakra-ui/react";
import { CardComponent } from "../components/Card";
import { Header } from '../components/Header';

export const HomePage = () => {

    const [repo, setRepo] = useState([]);

    const getProdutos = useCallback(async () => {
        try{
            const { data } = await axios.get("http://localhost/admin/api/produtos");
            setRepo(data);

        } catch(error){
            throw new Error(error)
        }
    })

    useEffect(() => {
        getProdutos();
    }, []);

    const renderProdutos = () => {
        return (
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))' padding={4}>
            {
                repo.map((produto) => (
                    <div>
                    <CardComponent imagem={produto.imagem} produto={produto.produto} id={produto.id} valor={produto.valor}/>
                    </div>
                ))
            }
            </SimpleGrid>
        )
    }


    return (
        <>
            <Header />
            {renderProdutos()}
        </>
    )

}