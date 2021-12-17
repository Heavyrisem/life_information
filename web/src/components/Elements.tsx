import React, { useRef } from "react";
import styled from "styled-components";


export const ScrollView = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
`;

interface StyledScrollElement_P {
    hideScroll?: boolean
}
export const StyledScrollElement = styled.div<StyledScrollElement_P>`
    display: inline-block;
    background: rgba(255, 255, 255,.1);
    color: white;
    overflow: scroll;

    border-radius: 1rem;
    padding: .5rem 1rem;

    &::-webkit-scrollbar {
        display: ${(props) => props.hideScroll? "none":"inital"};
    }
    & + & {
        margin-top: 1rem;
    }
`;

interface ScrollElement_P extends React.HTMLAttributes<HTMLDivElement>, StyledScrollElement_P {
    children: ((ref: React.RefObject<HTMLDivElement>) => any) | React.ReactNode
}
export const ScrollElement = React.forwardRef<HTMLDivElement, ScrollElement_P>((props, Ref) => {
    const { children, ...rest } = props;
    Ref = useRef<HTMLDivElement>(null);

    return (
        <StyledScrollElement {...rest} ref={Ref}>
        <>{
            typeof children === "function"?
            <>{children(Ref)}</>:children
        }</>
        </StyledScrollElement>
    )
})

export const Emphasis = styled.div`
    margin: 5rem 0;
`;

export const ElementTitle = styled.span`
    color: rgba(255, 255, 255, .5);

    position: sticky;
    left: 0;
    display: inline;
    align-self: start;

    text-align: left;
    /* padding-left: 1rem; */
    font-size: .7rem;
`;
export const Subtitle = styled.span`
    color: rgba(255, 255, 255, .5);
    font-size: .8rem;
`;

export const HorizontalDivider = styled.hr`
    width: 100%;
    border: none;
    border-top: solid 1px rgba(150, 150, 150, .3);
`;

export const VerticalContainer = styled.div`
    min-width: 100%;
    display: inline-flex;
    flex-direction: column;
`;
export const VerticalElement = styled.div`
    display: inline-block;
`;
export const HorizontalContainer = styled.div`
    display: inline-block;
    display: flex;
    align-items: center;
`;
export const HorizontalElement = styled.div<{flex?: number}>`
    /* display: inline-block; */
    flex: ${({flex}) => flex!==undefined? flex : "auto"};
`;



interface Loading_P { 
    children?: any
}
export function LoadingComponent({ children }: Loading_P) {
    return (<>{children? children:<span>로딩 중입니다.</span>}</>)
}