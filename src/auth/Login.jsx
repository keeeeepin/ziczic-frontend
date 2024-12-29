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
  Text,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  VisuallyHidden,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { postLoginMember } from '../apis/api/member';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: 'email', password: 'password' });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const login = useAuthStore( state => state.login );

  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Q
    setIsLoading(true);

    const userInfo = {
      memberId: 1,
      memberName: credentials.email,
      memberPassword: credentials.password,
    };

    postLoginMember(userInfo)
      .then((res) => {

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
      });
    setIsLoading(false);
    navigate('/');
  };

  return (
    <Container maxW="lg">
      {/* Header */}
      <Stack spacing="12" padding="5">
        <Stack spacing="10" textAlign="center">
          <Heading textAlign="center">Ziczic</Heading>
        </Stack>
      </Stack>

      <Box aria-label="login form">
        <form onSubmit={handleSubmit}>
          <Stack spacing="6">
            <FormControl isRequired>
              <FormLabel htmlFor="email">이메일</FormLabel>
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
                placeholder="name@email.com"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="password">
                비밀번호
                <VisuallyHidden>(필수)</VisuallyHidden>
              </FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
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

            <Button type="submit" size="lg" fontSize="md" isLoading={isLoading} loadingText="로그인 중...">
              로그인
            </Button>
          </Stack>
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
      </Box>
    </Container>
  );
};

export default Login;
