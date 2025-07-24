export const STACK_TECH = {
    "python": { imgUrl: "/img/stack/python.svg", url: "https://www.python.org/", color: "#3776AB" },
    "html": { imgUrl: "/img/stack/html.svg", url: "https://developer.mozilla.org/docs/Web/HTML", color: "#E34F26" },
    "css": { imgUrl: "/img/stack/css.svg", url: "https://developer.mozilla.org/docs/Web/CSS", color: "#1572B6" },
    "javascript": { imgUrl: "/img/stack/js.svg", url: "https://developer.mozilla.org/docs/Web/JavaScript", color: "#F7DF1E" },
    "nginx": { imgUrl: "/img/stack/nginx.svg", url: "https://nginx.org/", color: "#009639" },
    "typescript": { imgUrl: "/img/stack/ts.svg", url: "https://www.typescriptlang.org/", color: "#3178C6" },
    "node.js": { imgUrl: "/img/stack/node-js.svg", url: "https://nodejs.org/", color: "#339933" },
    "vite": { imgUrl: "/img/stack/vite.svg", url: "https://vitejs.dev/", color: "#646CFF" },
    "unity": { imgUrl: "/img/stack/unity.svg", url: "https://unity.com/", color: "#ffffff" },
    "c#": { imgUrl: "/img/stack/cSharp.svg", url: "https://learn.microsoft.com/en-us/dotnet/csharp/", color: "#5e3bd7" },
    "next.js": { imgUrl: "/img/stack/next-js.svg", url: "https://nextjs.org/", color: "#ffffff" },
    "react": { imgUrl: "/img/stack/react.svg", url: "https://reactjs.org/", color: "#61DAFB" },
    "pygame": { imgUrl: "/img/stack/pygame.svg", url: "https://pyga.me/", color: "#fee32d" },
    "sqlite": { imgUrl: "/img/stack/sqlite.svg", url: "https://www.sqlite.org/index.html", color: "#0C7FCC" },
}
export const STACK_TECH_LIGHT = {
    "unity": { imgUrl: "/img/stack/unity-light.svg", url: "https://unity.com/", color: "#000" },
    "next.js": { imgUrl: "/img/stack/next-js-light.svg", url: "https://nextjs.org/", color: "#000" },
}
export function getStackImg(lightmode: boolean, key: keyof typeof STACK_TECH) {
    key = key.toLowerCase() as keyof typeof STACK_TECH;
    if (lightmode && Object.keys(STACK_TECH_LIGHT).includes(key)) {
        return STACK_TECH_LIGHT[key as keyof typeof STACK_TECH_LIGHT];
    }
    return STACK_TECH[key];
}

export function mdLink(content:string) {
    return content.replace(/\[.+\]\(https?:\/\/.+\..+\)/g, (link, args) => {
        const titleEndAt = link.search(/\]\(https?:\/\/.+\..+\)/g)
        return `<a href=${link.slice(titleEndAt+2,link.length-1)} class="link" rel="noopener noreferrer" target="_blank">${link.slice(1,titleEndAt)}</a>`
    })
}