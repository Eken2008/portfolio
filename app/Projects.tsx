"use client";

import { useState } from "react";
import { ImageGroup } from "./ImageGroup";
import { mdLink, STACK_TECH, STACK_TECH_LIGHT, getStackImg } from "./Util";
import DOMPurify from 'isomorphic-dompurify';
import { useTheme } from "./Theme";


interface ProjectProps {
    name: string;
    description: string;
    image?: string[];
    link?: string;
    stack?: string[];
    github?: string;
    color?: string;
    stackFilter?: (keyof typeof STACK_TECH)[];
}


function Project(props: ProjectProps) {
    const {isLightMode} = useTheme();

    let shouldRender = (props.stackFilter === undefined || props.stackFilter.length === 0);
    if (!shouldRender) {
        props.stack?.forEach((name)=>{
            if (props.stackFilter?.includes(name.toLowerCase() as keyof typeof STACK_TECH)) {
                shouldRender = true;
            }
        })
    }

    

    return (
        shouldRender && <div className="projectCard" style={{ "--hoverColor": props.color } as React.CSSProperties}>
            <div className="projectImages">
                {props.image? <ImageGroup images={props.image.map((url)=>"/img/projects/"+url)}/> : ""}
            </div>
            <h2>{props.name}</h2>
            <p dangerouslySetInnerHTML={{__html:mdLink(DOMPurify.sanitize(props.description))}}></p>
            <div className="projectLinks">
                {props.link && <a href={props.link} target="_blank" rel="noopener noreferrer" className="projectLink button">View Project</a>}
                {props.github && <a href={props.github} target="_blank" rel="noopener noreferrer" className="githubLink button"><img src="/img/github.svg" alt="github logo" />View on GitHub</a>}
            </div>
            <div className="projectStack">
                {props.stack?.map((tech, index) => {
                    const key = tech.toLowerCase() as keyof typeof STACK_TECH;
                    const img = getStackImg(isLightMode, key)
                    return (
                        <a key={index} href={img.url} target="_blank" rel="noopener noreferrer" title={tech}><img className="button techIcon" src={img.imgUrl} alt={tech} style={{ "--hoverColor": img.color } as React.CSSProperties} /></a>
                    );
                })}
            </div>
        </div>
    );
}

export default function Projects() {
    const {isLightMode} = useTheme();
    const [filters, setFilters] = useState<(keyof typeof STACK_TECH)[]>([]);

    return (
        <>
        <section id="projects">
            <div className="container">
                <h1>Major Projects</h1>
                <div className="techFilter">
                    <h2>Filter by technology</h2>
                    {
                        Object.keys(STACK_TECH).map((tech, idx) => {
                            const name = tech as keyof typeof STACK_TECH;
                            const data = getStackImg(isLightMode, name);
                            const className = filters.includes(name)? "button techIcon active": "button techIcon"
                            
                            return <img onClick={()=>{
                                if (filters.includes(name)) {
                                    setFilters(filters.filter(f => f !== name));
                                }
                                else {
                                    setFilters(filters.concat([name]));
                                }
                            }} title={tech} key={idx} className={className} src={data.imgUrl} alt={name} style={{ "--hoverColor": data.color } as React.CSSProperties} />
                        })
                    }
                </div>
                <div className="projects">
                    <Project
                        name="Search"
                        description={`A "search engine" that allows you to search on any real search engine you want, 
                            and set custom bangs to search on specific websites, for example, typing "!w" will search on Wikipedia.
                            It is inspired by [Unduck](https://github.com/T3-Content/unduck), and is also heavily cached using Service Workers.`}
                        image={["search1.avif", "search2.avif"]}
                        link="https://search.bagott.dev"
                        stack={["HTML", "CSS", "JavaScript", "Python", "Nginx"]}
                        github="https://github.com/Eken2008/search"
                        color="#4a2b6d"
                        stackFilter={filters}
                    />
                    <Project
                        name="Train Information"
                        description="A website that shows information about trains in Sweden, such as delays, cancellations, and trains' locations in real-time.
                        It uses the official API from Trafikverket (the Swedish Transport Administration) and is written in HTML, CSS, and JavaScript.
                        I made it in ~8 hours because I got tired of the official SL app not showing the correct departure times for delayed trains (which at the time was > 50% of all trains).
                        I've planned to add more types of transportation, such as buses and trams, as well as rewriting it in TypeScript and React because people actually use it."
                        image={["traininfo1.avif", "traininfo2.avif", "traininfo3.avif"]}
                        link="https://tag.bagott.dev"
                        stack={["HTML", "CSS", "JavaScript", "Python", "SQLite", "Nginx"]}
                        stackFilter={filters}
                    />
                    <Project
                        name="Livelox Alternative"
                        description="I got tired of all livelox bugs and didn't want to pay for premium, so I made my own alternative. I wrote the viewer originally in JavaScript in a few hours but has since rewritten it in TypeScript.
                        I have also written the backend in python and it allows you to upload routes and view them. It is almost finished after just a few days of work, however there are some small things I need to fix befor making it public."
                        image={["livelox1.avif","livelox2.avif","livelox3.avif","livelox4.avif","livelox5.avif"]}
                        stack={["HTML","CSS","TypeScript","Python","SQLite","Nginx"]}
                        stackFilter={filters}
                    />
                    <Project
                        name="TDG"
                        description="TDG is an online multiplayer game where you play as a train dispatcher, trying to coordinate with other players to send trains to their destinations while there are multiple failures of the track infrastructure.
                        It is not finished yet."
                        image={["tdg1.avif", "tdg2.avif"]}
                        stack={["TypeScript", "Node.js", "Vite", "Python"]}
                        github="https://github.com/Eken2008/tdgWeb"
                        color="#225366"
                        stackFilter={filters}
                    />
                    <Project
                        name="Syntactica"
                        description="Syntactica is my first try at making a programming language. It is inspired by swedish word classes and is compiled to Python using an abstract syntax tree.
                        It's not very good, and I would not recommend using it for anything serious as it is around 24 times slower than Python and has no distiction between variables and functions.
                        Anyway, it was a fun project and I learned a lot from it, especially about abstract syntax trees, regex and file parsing. Written together with [ValpsZ](https://github.com/ValpsZ)."
                        github="https://github.com/ValpsZ/syntactica"
                        image={["syntactica.avif"]}
                        stack={["Python"]}
                        stackFilter={filters}
                    />
                    <Project
                        name="Computer"
                        description="A 16-bit computer with a custom instruction set, compiler, and assembly language written in TypeScript. It was inspired by NandGame and written together with [ValpsZ](https://github.com/ValpsZ).
                        It was a fun project that taught me a lot about how computers work, and how different and fun it can be to code in assembly. It is not completely finished as it does not have persistent storage, but you can run programs in it."
                        github="https://github.com/Eken2008/computer"
                        image={["computer.avif"]}
                        stack={["TypeScript", "Node.js"]}
                        stackFilter={filters}
                    />
                    <Project
                        name="Cosmic Climb"
                        description="Cosmic Climb is a game where you build rockets to go as high as possible, while avoiding asteroids that could move you off course and make you crash.
                        You get new parts for your rocket by flying into them, allowing you to build better rockets with more fuel and better engines.
                        The game was made together with [Bla0](https://github.com/Blaa00) in 48 hours for SGC Game Jam."
                        image={["cosmicclimb1.png", "cosmicclimb2.avif", "cosmicclimb3.avif"]}
                        link="https://bagott.dev/download/?game=cosmicclimb"
                        stack={["Unity", "C#"]}
                        color="#95842a"
                        stackFilter={filters}
                    />
                    <Project
                        name="Course Designer"
                        description="A web based course setting program for orienteering. It is not finished, but you can create a basic orienteering course and draw lines. It was partially written because [Purple Pen](https://www.purple-pen.org/) didn't handle image maps well."
                        link="https://coursedesigner.bagott.dev"
                        image={["coursedesigner.avif"]}
                        stack={["HTML", "CSS", "JavaScript", "Python", "SQLite", "Nginx"]}
                        stackFilter={filters}
                    />
                    <Project
                        name="Bagottmaskin 2000"
                        description="Bagottmaskin 2000 is a game where you push boxes around to solve different puzzles.
                        It was made for a game jam in 53 hours together with [Bla0](https://github.com/Blaa00). We ended up in the top 6.
                        The game is made in our own game engine in Python, which was not the best choice, but it was a fun challenge.
                        It is probably the best game idea and worst execution I have ever done."
                        image={["bagottmaskin1.avif", "bagottmaskin2.avif", "bagottmaskin3.avif"]}
                        link="https://bagott.dev/download/?game=bagottmaskin"
                        stack={["Python"]}
                        stackFilter={filters}
                    />
                    <Project
                        name="Västerås"
                        description={`Västerås was made for SGCJam 2024 with the theme "Brädspel" (Boardgames) together with [Bla0](https://github.com/Blaa00). It is basically a digital version of Carcassonne.
                            It is one of the best games I have made in Python, and I think it is quite fun to play. But don't expect the code quality to be good, a lot of it was written in a hurry multiple hours after my usual bedtime.`}
                        image={["vasteras1.avif"]}
                        link="https://bagott.dev/download/?game=v%C3%A4ster%C3%A5s"
                        github="https://github.com/Blaa00/SGCjam24/"
                        stack={["Python","Pygame"]}
                        stackFilter={filters}
                        color="#0f0"
                    />
                    <Project
                        name="Fishy Humans"
                        description={`In fishy humans you are out fishing to get money while trying to avoid the shark. The catch is that you are a fish and try to fish humans. The game was made during GMTK Game Jam 2023 with the theme "Roles Reversed".
                        It didn't turn out as good as we hoped because we had to spend a lot of time tweaking stuff like boyancy and the seaweed. Created together with [Bla0](https://github.com/Blaa00).`}
                        image={["fishyhumans1.avif", "fishyhumans2.avif", "fishyhumans3.avif", "fishyhumans4.avif", "fishyhumans5.avif"]}
                        link="https://backal09.itch.io/fishy-humans"
                        stack={["Unity","C#"]}
                        stackFilter={filters}
                    />
                </div>
            </div>
        </section>
        <section id="minorProjects">
            <div className="container">
                <h1>Minor Projects</h1>
                <div className="projects">
                    <Project
                        name="Portfolio"
                        description="This portfolio website, where I showcase my projects and skills. It is built with Next.js and TypeScript, is hosted using Nginx
                        and is inspired by the hover effects from Vite's website."
                        image={["portfolio1.avif", "portfolio2.avif"]}
                        link="https://oskar.bagott.dev"
                        github="https://github.com/Eken2008/portfolio"
                        stack={["Next.js", "React", "TypeScript", "Nginx"]}
                        stackFilter={filters}
                    />
                    <Project
                        name="bagott.dev"
                        description="A website for hosting my games. It is has a really flexible backend written in python and utilizes server side rendering to generate the pages allowing me to add new games and versions simply by uploading them and adding a few lines of JSON."
                        link="https://bagott.dev"
                        image={["bagott1.avif","bagott2.avif"]}
                        stack={["HTML","CSS","JavaScript","Python","Nginx"]}
                        stackFilter={filters}
                    />
                    <Project
                        name="Presentations"
                        description="A library for creating slideshows in TypeScript and CSS. It supports images, tables, videos, and animations.
                        It is designed to be easy to use and customize, and was written for a school project where I had to make a presentation, and didn't want to use PowerPoint or Google Slides.
                        During the project I got quite frustrated with the differences between Chrome and Firefox, for example that table cell heights are calculated differently in the two browsers."
                        image={["presentations1.avif","presentations2.avif","presentations3.avif"]}
                        link="https://presentations.bagott.dev/?id=0"
                        stack={["TypeScript", "CSS", "Nginx"]}
                        stackFilter={filters}
                    />
                    <Project
                        name="Pac-Orm"
                        description="Snake combined with pac-man with proceduraly generated maps."
                        image={["pac-orm.avif"]}
                        link="/projects/Pac-Orm.zip"
                        stack={["Python","Pygame"]}
                        stackFilter={filters}
                    />
                    <Project
                        name="A bus game"
                        description="I was bored, so I tried som 2.5D in pygame."
                        image={["bus.avif"]}
                        stack={["Python","Pygame"]}
                        stackFilter={filters}
                    />
                    <Project
                        name="Train Game"
                        description="A game where you drive a train around a world I made in Blender and Unity."
                        image={["train1.avif"]}
                        link="https://play.unity.com/mg/other/webgl11-g"
                        stack={["Unity", "C#"]}
                        stackFilter={filters}
                    />
                    <Project
                        name="Quiz"
                        description="A quiz game about trains."
                        image={["quiz1.avif","quiz2.avif"]}
                        link="https://quiz.bagott.dev"
                        stack={["HTML","CSS","JavaScript","Python","Nginx"]}
                        stackFilter={filters}
                    />
                    <Project
                        name="Status"
                        description="A status page for bagott.dev showing uptime and previous incidents. The frontend is entirely written by AI as a test of how good it has become.
                        It is currently hosted on the same server as everything else, making it not very reliable, but I don't want to pay for another server."
                        image={["status.avif"]}
                        link="https://status.bagott.dev"
                        stack={["HTML","CSS","JavaScript","Python","SQLite","Nginx"]}
                        stackFilter={filters}
                    />
                    <Project
                        name="Waterbox"
                        description="Waterbox was my first Unity game, it is a game where you move a box around to help you reach the goal. The box floats on water, but you don't."
                        image={["waterbox.avif"]}
                        link="https://play.unity.com/mg/other/webgl-rxp"
                        stack={["Unity", "C#"]}
                        color="#225366"
                        stackFilter={filters}
                    />
                    <Project
                        name="Bonde Jns"
                        description="Bonde Jns was the first thing I ever programmed, it was supposed to be a game with elements from Minecraft, and Factorio.
                        I made it when I was 13 years old in Python using Pygame. The code was a disaster, and I did a total of three rewrites of the codebase. I never finished it, but it was a fun project and I learned a lot from it.
                        Created together with [Bla0](https://github.com/Blaa00)."
                        image={["bondejns1.avif", "bondejns2.avif", "bondejns3.avif"]}
                        link="https://bagott.dev/download/?game=bondejns"
                        stack={["Python", "Pygame"]}
                        color="#84fd67"
                        stackFilter={filters}
                    />

                </div>
            </div>
        </section>
        </>
    );

}