import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface IIconProps {
  type: "up" | "down";
}

interface IContainerProps {
  active: boolean;
  type: "up" | "down";
}

export const Container = styled.TouchableOpacity<IContainerProps>`
  border: 1.5px solid ${({ theme }) => theme.colors.text};
  width: 48%;
  flex-direction: row;
  border-radius: 5px;
  padding: 16px;
  align-items: center;
  justify-content: center;

  ${({ active, type }) =>
    active &&
    type === "down" &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
      border-color: ${({ theme }) => theme.colors.attention};
    `}

  ${({ active, type }) =>
    active &&
    type === "up" &&
    css`
      background-color: ${({ theme }) => theme.colors.success_light};
      border-color: ${({ theme }) => theme.colors.success};
    `}
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Icon = styled(Feather)<IIconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ theme, type }) =>
    type === "up" ? theme.colors.success : theme.colors.attention};
`;
