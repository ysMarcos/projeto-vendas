import { useParams } from "react-router-dom"
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Text } from "@chakra-ui/react";
import { Header } from "../components/Header";

export const CategoriaPage = () => {
    
    const { categorias_id } = useParams();
    const [repo, setRepo] = useState([]);

    const getProdutosCategoria = useCallback(async () => {
        try{
            const { data } = await axios.get(`http://localhost/admin/api/categoria/${categorias_id}`);
            console.log(data)
            setRepo(data);

        } catch(error){
            throw new Error(error);
        }
    })

    useEffect(() => {
        getProdutosCategoria();
    }, []);
    
    return (
        <div>
            <Header />
            <Text>{
                repo.map((produto) => (
                    <Text>{produto.produto}</Text>
                ))}
            </Text>
        </div>
    )
}