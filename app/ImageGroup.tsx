"use client"
import { CSSProperties, useState } from "react";
import { useTheme } from "./Theme";


function download(url: string) {
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferer";
    const urlParts = url.split("/");
    a.download = urlParts[urlParts.length-1];
    a.click();
}

interface ArrowProps {
    direction: "right" | "left";
    type?: "short" | "long";
    style?: CSSProperties;
}

function Arrow(props: ArrowProps) {

    const isShort = props.type === "short";
    let style = {...props.style, rotate: "0deg"} as CSSProperties;
    if (props.direction === "left") {
        style = {...style, rotate: "180deg"}
    }
    return (
        <>
            <img style={style} src={`/img/arrow${isShort? "Short": "Long"}.svg`} />
        </>
    )
}


interface ImageGroupProps {
    images: string[];
}

export function ImageGroup(props: ImageGroupProps) {
    const [currentImage, setCurrentImage] = useState(0);
    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const theme = useTheme()
    
    const decrementImage = () => setCurrentImage(currentImage > 0? currentImage-1 : props.images.length-1);
    const incrementImage = () => setCurrentImage(currentImage >= props.images.length - 1? 0 : currentImage+1);

    return (
        <>
            <div className="imageGroup">
                {props.images.length > 1 && <button onMouseDown={decrementImage}><Arrow style={{height: "1em"}} direction="left" type="short"/></button>}
                {
                    props.images.map((image, idx) => {
                        return <img key={idx} src={image} alt={image} style={{left: (-currentImage)+"00%", position: "relative"}} onMouseDown={()=>setPopupOpen(true)} />;
                    })
                }
                {props.images.length > 1 && <button onMouseDown={incrementImage}><Arrow style={{height: "1em"}} direction="right" type="short"/></button>}
            </div>

            {/* Popup */
            popupOpen && <div className="popupBackground" onMouseDown={()=>setPopupOpen(false)}>
                <div className="popup">
                    <button className="button" style={{float: "right", "--hoverColor": "#f727279e"} as React.CSSProperties}>✖</button>
                    <img src={props.images[currentImage]} onMouseDown={(e)=>e.stopPropagation()} />
                    
                    <div onMouseDown={(e)=>e.stopPropagation()}>
                        {props.images.length > 1 &&<button className="button" style={{marginRight: "10px"}} onMouseDown={decrementImage}><Arrow style={{height: "1em", filter: theme.isLightMode? "invert()": ""}} direction="left"/></button> }
                        <button onClick={()=>download(props.images[currentImage].replace("/projects/","/projects-png/").replace(".avif",".png"))} className="button" style={{marginRight: "10px"}}>
                            <img src="/img/download.svg" alt="download" style={theme.isLightMode? {}: {filter: "invert(1)"}} draggable="false"/>
                        </button>
                        {props.images.length > 1 &&<button className="button" onMouseDown={incrementImage}><Arrow style={{height: "1em", filter: theme.isLightMode? "invert()": ""}} direction="right"/></button> }
                    </div>
                </div>
            </div>
            }
        </>
    );
}
