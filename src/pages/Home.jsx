import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Text } from "@chakra-ui/react";
import { CardComponent } from "../components/Card";
import { Header } from '../components/Header';

export const HomePage = () => {
    const [loading, setLoading] = useState(false);
    const [repo, setRepo] = useState([]);

    const getProdutos = useCallback(async () => {
        try{
            setLoading(true);
            const { data } = await axios.get("http://localhost/admin/api/produtos");
            setRepo(data);

        } catch(error){
            throw new Error(error)
        }
        finally{
            setLoading(false);
        }
    })

    useEffect(() => {
        getProdutos();
    }, []);

    console.log(repo)

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