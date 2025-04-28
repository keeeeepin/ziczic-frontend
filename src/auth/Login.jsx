import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuth';

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
import { postLoginMember } from '../apis/api/member';

import { AuthContainer } from '../components/Auth/AuthContainer';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const setMember = useAuthStore((state)=>state.setMember);
  const clearMember = useAuthStore((state)=>state.clearMember);

  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Q
    setIsLoading(true);

    const userInfo = {
      memberName: credentials.email,
      memberPassword: credentials.password,
    };

    postLoginMember(userInfo)
      .then((res) => {
        const accessToken = res.headers.authorization.split(' ')[1];

        localStorage.setItem('token', accessToken);
        setMember(res.data, accessToken);

        toast({
          title: '로그인 성공',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err.data);
        toast({
          title: '로그인 실패',
          description: e.message || '이메일과 비밀번호를 확인해주세요',
          status: 'error',
          duration: 2500,
          isClosable: true,
        });

        navigate('/login');
      });
    setIsLoading(false);
    navigate('/ziczic/main');
  };

  return (
    <AuthContainer>
      <VStack spacing={8} p={8} bg="gray.50 "borderRadius="lg" boxShadow="lg" minH="500px" maxH="500px" maxW="400px" w="90%">
        <Heading size="lg" color="purple.600">Welcome Back</Heading>
        <Text color="gray.800">Login to your account</Text>
   
      {/* <VStack spacing={4} w="100%"> */}
        <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                name="email"
                required
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

            <FormControl isRequired>
              <FormLabel htmlFor="password">
                Password
                <VisuallyHidden>(필수)</VisuallyHidden>
              </FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'password' : 'text'}
                  autoComplete="current-password" // Q
                  required
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      password: e.target.value,
                    })
                  }
                  placeholder=""
                />
                <InputRightElement>
                  <IconButton
                    variant="ghost"
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? '비밀번호 가리기' : '비밀번호 보기'}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button type="submit" colorScheme="purple" size="lg" w="100%" mt={4} isLoading={isLoading} loadingText="로그인 중...">
              로그인
            </Button>
        </form>

        <Stack spacing="1" textAlign="center">
          <Text>
            계정이 없으신가요?
            <Button
              variant="link"
              colorScheme="blue"
              onClick={(e) => {
                e.preventDefault();
                navigate('/signup');
              }}
            >
              Join
            </Button>
          </Text>
        </Stack>
      {/* </VStack> */}

      </VStack>
</AuthContainer>
  );
};

export default Login;
