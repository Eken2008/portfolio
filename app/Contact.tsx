export function Contact() {
    return (
        <section id="contact">
            <div className="container" style={{paddingBottom: "100px"}}>
                <h1>Contact</h1>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <a className="button projectLink" href="mailto:oskar.eklov@gmail.com" target="_blank" rel="noopener noreferrer">Email - oskar.eklov@gmail.com</a>
                    <a className="button githubLink" href="https://github.com/Eken2008" target="_blank" rel="noopener noreferrer"><img src="/img/github.svg" alt="github logo" />GitHub - Eken2008</a>
                    <a className="button linkedinLink" href="https://www.linkedin.com/in/oskar-eklov" target="_blank" rel="noopener noreferrer"><img src="/img/linkedin.png" alt="github logo" />Linkedin - Oskar Eklöv</a>
                </div>
            </div>
        </section>
    );
}