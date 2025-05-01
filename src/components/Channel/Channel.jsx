import { Box, Text } from '@chakra-ui/react';
import useChannelStore from '../../store/useChannel';

const Channel = ({ id, name }) => {
  const selectedChannelId = useChannelStore((state) => state.selectedChannelId);
  const selectChannel = useChannelStore((state) => state.selectChannel);

  // 현재 채널이 선택되었는지 확인
  const isSelected = selectedChannelId === id;

  const onChannelClick = () => {
    console.log('select : ', id, ', ', name);
    selectChannel(id, name);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      h="26px"
      px={2}
      borderRadius="4px"
      bg={isSelected ? '#4F545C' : 'transparent'} // 선택된 채널 배경색
      _hover={{ bg: isSelected ? '#4F545C' : '#27242C' }} // 호버 시 배경색
      cursor="pointer"
      onClick={onChannelClick}
    >
      <Text
        fontSize="lg"
        mr={2}
        color={isSelected ? 'white' : '#9F9FA0'} // 선택된 채널 # 색상
      >
        #
      </Text>
      <Text
        fontSize="sm"
        color={isSelected ? 'white' : '#9F9FA0'} // 선택된 채널 텍스트 색상
        fontWeight={isSelected ? 'bold' : 'normal'} // 선택된 채널 텍스트 굵기
      >
        {name}
      </Text>
    </Box>
  );
};

export default Channel;
