import { Card, CardBody, Image, Text, Button } from '@chakra-ui/react'

export const CardComponent = ({produto, imagem, id}) => {
    return(
        <Card>
          <CardBody>
            <Image src={ `http://localhost/admin/fotos/${imagem}p.jpg`} />
            <Text>{produto}</Text>
            <a href={`http://localhost:3000/produto/${id}`}><Button>Ver Item</Button></a>
          </CardBody>
        </Card>
    )
}