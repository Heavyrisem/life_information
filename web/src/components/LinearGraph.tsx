import React, { useCallback, useEffect, useRef } from "react";
import usePrevious from "../hooks/usePrevious";
import { equalArray } from "../Utils/Array";


interface LinearGraphData {
    labels: string[]
    data: number[]
}

interface LinearGraph_P extends React.HTMLAttributes<HTMLCanvasElement> {
    parent: React.RefObject<HTMLDivElement>
    data: LinearGraphData
    Height: number
    RealHeightPercent: number
    ShowNumber?: boolean
    DataUnit?: string
}
export const LinearGraph = React.memo(function(props: LinearGraph_P) {
    const { parent, Height, RealHeightPercent, ShowNumber, DataUnit, ...rest } = props;
    const CanvasRef = useRef<HTMLCanvasElement>(null);
    const previousData = usePrevious(props.data);

    useEffect(() => {
        
        // console.log(props.data);
        if (!previousData || !equalArray(previousData.data, props.data.data)) DrawGraph();

    }, [props.data]);

    function DrawGraph() {
        console.log("DRAW GRAPH");
        const Container = parent.current;
        const Canvas = CanvasRef.current;
        if (!(Canvas && Container)) return;
        const ctx = Canvas.getContext('2d');
        if (!ctx) return;
        const Width = Container.scrollWidth - parseFloat(getComputedStyle(Container).paddingLeft) - parseFloat(getComputedStyle(Container).paddingRight);
        console.log(Container.scrollWidth);

        
        const Data = props.data;
        setCanvasDPR(Width, Height);
        const RealHeight = Height * RealHeightPercent / 100;
        // const RealWidth = (Width / Data.data.length);
        const VertialPadding = (Height - RealHeight) / 2;
        const HorizontalPadding = (Width / Data.data.length) / 2;

        ctx.fillStyle = "white";
        ctx.strokeStyle = "rgba(255, 255, 255, .3)";
        ctx.font = ".5rem";
        ctx.textAlign = "center";
        const max = Math.max(...Data.data);
        const min = Math.min(...Data.data);
        
        ctx.beginPath();

        for (let i = 0; i < Data.data.length; i++) {
            const x = HorizontalPadding + (Width / Data.data.length * i) + 1// + (Width / Data.data.length / 2);
            const y = (Height - VertialPadding) - RealHeight * ((Data.data[i] - min) / (max - min) * 100) / 100;
            
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.lineTo(x, y);
            
            if (ShowNumber) {
                ctx.fillText(`${Data.data[i]}${DataUnit? DataUnit:""}`, x, y-5);
            }
        }
        ctx.stroke();

    }

    function setCanvasDPR(width: number, height: number) {
        const Canvas = CanvasRef.current;
        if (!Canvas) return;

        const DPR = window.devicePixelRatio;

        Canvas.style.width = `${width}px`;
        Canvas.style.height = `${height}px`;

        Canvas.width = width * DPR;
        Canvas.height = height * DPR;

        const ctx = Canvas.getContext('2d');
        if (!ctx) return;
        ctx.scale(DPR, DPR);
    }

    return (
        <canvas ref={CanvasRef} {...rest}>
        
        </canvas>
    )
});