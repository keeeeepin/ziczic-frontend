import React from 'react'

import { HStack, Box, Text } from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/react';
// 사용자 프로필 이미지 // 이름

import { useAuthStore } from '../../store/useAuth';

const UserProfile = () => {

// const user = useAuthStore((state) => state.user); // Store로부터 user객체 가져오기

//   const userName = "사용자1";

  const user = useAuthStore((state) => state.member);

  return (
    <>
        <HStack w="200px" bg="#111214" p={2} spacing={3} alignItems="center" >
            <Box position="relative">
                <Avatar
                    size="sm"
                    // name={user.email}
                    bg="#5865F2"     // Discord 기본 아바타 배경색
                    color="white"
                />

            </Box>
                <Text color="white" fontSize="sm" fontWeight="medium" flex={1}>
                    {user?.email || "Guest"}
                </Text>

            <HStack>
                {/* <Icon as={PhoneIcon} color="gray.400" boxSize={4} cursor="pointer" />
                <Icon as={SettingsIcon} color="gray.400" boxSize={4} cursor="pointer" /> */}
            </HStack>
        </HStack>



    </>
  )
}

export default UserProfile