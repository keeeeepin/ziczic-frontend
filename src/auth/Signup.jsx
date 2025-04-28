import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import useAuthStore / store
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  VStack,
  Text,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  VisuallyHidden,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { postSignupMember } from '../apis/api/member';

import { AuthContainer } from '../components/Auth/AuthContainer';


const Signup = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // naviagtion 객체생성 및 할당
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const registerInfo = {
        memberName: credentials.email,
        memberPassword: credentials.password
    };

    postSignupMember(registerInfo)
      .then((res) => {
        console.log(res.data);
        toast({
          title: '회원가입 성공',
          status: 'success',
          duration: 2500,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err.data);
        // toast
        toast({
          title: '회원가입 실패',
          status: 'error',
          duration: 2500,
          isClosable: true,
        });
      });

    setIsLoading(false);
    navigate('/login');
  };

  return (
    <AuthContainer>
      <VStack spacing={8} p={8} bg="gray.400" borderRadius="lg" boxShadow="lg"  minH="500px" maxH="500px" maxW="400px" w="90%">
        <Heading size="lg" color="purple.600">Welcome Back</Heading>
        <Text color="gray.600">Join us</Text>

      {/* <VStack spacing={4} w="100%"> */}
        <form onSubmit={handleSubmit}>
            {/* 이메일 */}
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                name="email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    email: e.target.value,
                  })
                }
                placeholder="이메일을 입력하세요"
              />
            </FormControl>

            {/* 비밀번호 */}
            <FormControl isRequired>
              <FormLabel htmlFor="password">
                Password
                <VisuallyHidden>(필수)</VisuallyHidden>
              </FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      password: e.target.value,
                    })
                  }
                  placeholder="비밀번호를 입력하세요"
                />
                <InputRightElement>
                  <IconButton
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? '비밀번호 가리기' : '비밀번호 확인'}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            {/* Button */}
            <Button type="submit" colorScheme="purple" size="lg" w="100%" mt={4} isLoading={isLoading} loadingText="회원가입 중...">
              회원가입
            </Button>
          </form>
        </VStack>
        {/* </VStack> */}
        </AuthContainer>
  );
};

export default Signup;