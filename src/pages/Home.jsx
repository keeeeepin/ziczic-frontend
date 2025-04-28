import React from 'react';
import { Box, Button, VStack, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { AuthContainer } from '../components/Auth/AuthContainer';

const Home = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

  const moveSignup = () => navigate('/signup');
  const moveLogin = () => navigate('/login');

  return (
    <Box display="flex" h="100vh" w="100vw" alignItems="center" justifyContent="center" bg={bgColor}>
      <VStack spacing={6} p={8} bg={cardBg} borderRadius="lg" boxShadow="lg" maxW="400px" w="90%">
        <Heading size="lg" color="purple.600">Welcome</Heading>
        <Text color="gray.600" textAlign="center">Join our community to start chatting</Text>
        <VStack spacing={4} w="100%">
          <Button onClick={moveLogin} colorScheme="purple" size="lg" w="100%">
            Login
          </Button>
          <Button onClick={moveSignup} variant="outline" colorScheme="purple" size="lg" w="100%">
            Sign Up
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Home;