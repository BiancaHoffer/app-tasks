import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1; 
    justify-content: center;
    align-items: center;
    background-color: #F4F4F2;
`;

export const Inputs = styled.TextInput`
    background-color: #F4E5E2;
    color: #3b3a3b;
    font-size: 16px;
    padding: 15px;
    margin: 10px;
    width: 300px;
    border-radius: 5px;
`;

export const TextButtonLogin = styled.Text`
    font-size: 16px;
    font-weight: 600;
    color: #3b3a3b;
`;

export const ButtonLogin = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    margin: 15px;
    width: 300px;
    padding: 15px;
    border-radius: 5px;
`;

export const ButtonNewAccount = styled.TouchableOpacity`
    margin-top: 5px;
    padding: 10px;
`;