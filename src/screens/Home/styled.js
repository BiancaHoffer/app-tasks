import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1; 
    align-items: center;
    background-color: #F4F4F2;
`;

export const AddTask = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const InputTask = styled.TextInput`
    flex: 1;
    background-color: #F4E5E2;
    color: #3b3a3b;
    margin: 10px 0px 10px 20px;
    padding: 15px;
    border-radius: 5px;
    font-size: 16px;
`;

export const ButtonTask = styled.TouchableOpacity`
    margin: 15px;
`;

export const ButtonCancelEditTask = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const TextCancelEditTask = styled.Text`
    padding: 7px;
    color: #593942;
`;
