import styled from 'styled-components'

const ButtonStyled = styled.button`
    width: 120px;
    

`

export const Boton = ({onClick, children}) => {

    const style ={
        'background' : 'red'
        'border-radius' : '20%'
    }


    
    return (
        <button onClick={onClick}>
            {children}
        </button>
    );
};
