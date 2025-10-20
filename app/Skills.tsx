interface SkillProps {
    title: string;
    content: string[];
    color: string;
}


function Skill(props: SkillProps) {
    return (
        <div className="skillCard" style={{ "--hoverColor": props.color } as React.CSSProperties}>
            <h2>{props.title}</h2>
            <ul>
                {props.content.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

export default function Skills() {
    return (
        <section id="skills">
            <div className="container">
                <h1>My Skills</h1>
                <div className="skills">
                    <Skill title="Web Development" content={["HTML, CSS, JavaScript", "TypeScript", "React", "Node.js", "Python", "Sql", "Nginx"]} color="#e1c42b"/>
                    <Skill title="Game Development" content={["Unity", "Godot", "C#", "Pygame"]}  color="#24c2ffb2"/>
                    <Skill title="Other Skills" content={["Git", "SSH", "Docker", "Linux", "Problem Solving", "3D Modelling"]} color="#44ff3e"/>
                </div>
            </div>
        </section>
    )
}