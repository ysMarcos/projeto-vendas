import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Text
} from '@chakra-ui/react'
import { ArrowDownIcon } from "@chakra-ui/icons";
import "./Header.css";


export const Header = () => {

    const [repo, setRepo] = useState([]);

    const getCategorias = useCallback(async () => {
        try{
            const { data } = await axios.get("http://localhost/admin/api/categorias");
            setRepo(data);

        } catch(error){
            throw new Error(error)
        }
    })

    useEffect(() => {
        getCategorias();
    }, []);


    return (
        <header>
            <a href="http://localhost:3000/"><Text>Home</Text></a>
            <Menu isLazy>
                <MenuButton>Categorias<ArrowDownIcon /></MenuButton>
                <MenuList>
                    {repo.map(categoria =>  (
                        <a href={`http://localhost:3000/categoria/${categoria.id}`}>
                            <MenuItem>
                                {categoria.categoria}
                            </MenuItem>
                        </a>
                        ) )}
                </MenuList>
            </Menu>
        </header>
    )
}