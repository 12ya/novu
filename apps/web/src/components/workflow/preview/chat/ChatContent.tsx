import styled from '@emotion/styled';
import { Group, Skeleton, Stack, useMantineColorScheme } from '@mantine/core';
import { colors, Text } from '@novu/design-system';
import { useState } from 'react';
import { NovuGreyIcon, PreviewEditOverlay } from '../common';
import { When } from '../../../utils/When';

export function ChatContent({ isLoading, content, errorMsg }) {
  const [isEditOverlayVisible, setIsEditOverlayVisible] = useState(false);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const handleMouseEnter = () => {
    setIsEditOverlayVisible(true);
  };

  const handleMouseLeave = () => {
    setIsEditOverlayVisible(false);
  };

  return (
    <ContentAndOVerlayWrapperStyled onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isEditOverlayVisible && <PreviewEditOverlay />}
      <Group
        spacing={16}
        align="flex-start"
        noWrap
        sx={{
          position: 'relative',
          ...(isEditOverlayVisible && { filter: 'blur(2px)' }),
        }}
      >
        <When truthy={isLoading}>
          <Skeleton radius={8} height={40} width={40} />
          <Stack spacing={3}>
            <Skeleton height={20} width={80} />
            <Skeleton height={20} width={280} radius="xs" />
          </Stack>
        </When>
        <When truthy={!isLoading}>
          <div>
            <NovuGreyIcon color={isDark ? colors.B30 : colors.BGLight} width="32px" height="32px" />
          </div>
          <Stack spacing={5}>
            <Group spacing={8} align="flex-start" noWrap>
              <Text
                weight="bold"
                color={isDark ? colors.B80 : colors.B20}
                size="lg"
                style={{
                  lineHeight: '20px',
                }}
              >
                Your App
              </Text>
              <PillStyled isDark={isDark}>APP</PillStyled>
              <Text color={isDark ? colors.B60 : colors.B70}>now</Text>
            </Group>
            {errorMsg ? (
              <Text color={colors.error}>{errorMsg}</Text>
            ) : (
              <Text color={isDark ? colors.B80 : colors.B20}>{content}</Text>
            )}
          </Stack>
        </When>
      </Group>
    </ContentAndOVerlayWrapperStyled>
  );
}

const PillStyled = styled.div<{ isDark: boolean }>`
  background-color: ${({ isDark }) => (isDark ? colors.B40 : colors.BGLight)};
  border-radius: 4px;
  padding: 0px 6px;
  align-items: center;
  color: ${({ isDark }) => (isDark ? colors.B80 : colors.B40)};
  font-size: 10px;
  font-weight: 400;
  line-height: 20px;
`;

const ContentAndOVerlayWrapperStyled = styled.div`
  position: relative;
  padding-top: 24px;
  padding-bottom: 20px;
`;
