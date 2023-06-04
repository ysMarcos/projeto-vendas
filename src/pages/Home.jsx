import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Text } from "@chakra-ui/react";
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

    return (
        <>
            <Header />
                {
                    repo.map((produto) => (
                        <div>
                        <Text>A</Text>
                        <CardComponent imagem={produto.imagem} produto={produto.produto} id={produto.id}/>
                        </div>
                    ))
                }
        </>
    )

}