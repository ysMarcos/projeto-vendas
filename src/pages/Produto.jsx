import { Text, Image } from "@chakra-ui/react"
import { Header } from "../components/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import parse from 'html-react-parser'

export const ProdutoPage = () => {

    const { id } = useParams();
    const [ repo, setRepo ] = useState([]);

    const getProduto = useCallback(async () => {
        try {
            const { data } = await axios.get(`http://localhost/admin/api/produto/${id}`);
            setRepo( data );
        }
        catch(error){
            throw new Error(error);
        }
    })

    useEffect(() => {
        getProduto();
    }, [])

    const htmlString = String(repo.descricao)
    console.log(htmlString)

    return (
        <div>
            <Header />
            <Text> { repo.produto } </Text>
            <Image src={`http://localhost/admin/fotos/${repo["imagem"]}m.jpg`} />
            <div>{ parse(htmlString) }</div>
        </div>
    )
}