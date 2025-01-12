import { Circle, VStack, Text, HStack, Box } from '@chakra-ui/react'

const Workspace = ({name}) => {
  return (
    <Circle
        size="30px"
        bg="gray.300"
        color="gray.600"
        cursor="pointer"
        _hover={{bg: 'gray.500'}}
    >
        {name[0].toUpperCase()}
    </Circle>
  )
}

export default Workspace