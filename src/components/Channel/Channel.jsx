import { Circle, VStack, Text, HStack, Box } from '@chakra-ui/react'

const Channel = ({name}) => {
  return (
    <Circle
      size="30px"
      bg="gray.300"
      color="gray.600"
      cursor="pointer"
      _hover={{bg: 'gray.500'}}
      >
    {name}
    </Circle>
  )
}

export default Channel