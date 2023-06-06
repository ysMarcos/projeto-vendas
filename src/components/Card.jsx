import { Card, CardBody, Image, Text, Button, Heading, Box } from '@chakra-ui/react'
import { formatar } from '../utils/formatar';

export const CardComponent = ({produto, imagem, id, valor}) => {
    return(
      <a href={`http://localhost:3000/produto/${id}`}>
        <Card bg={'blue.50'}>
          <CardBody>
            <Image src={ `http://localhost/admin/fotos/${imagem}p.jpg`} />
            <Heading size={'l'} align={'center'} padding='1vh 1vw 1vh 1vw'>{produto}</Heading>
            <Text padding='1vh 1vw 1vh 1vw'>{formatar(valor)}</Text>
          </CardBody>
        </Card>
      </a>
    )
}