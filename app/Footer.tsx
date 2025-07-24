export default function Footer() {
    return (
        <section>
            <div className="container" style={{textAlign: "center"}}>
                &copy; {new Date().getFullYear()} Oskar Eklöv. Icons by <a href="https://icons8.com/" style={{color: "var(--foreground)"}} target="_blank" rel="noopener noreferrer">Icons8</a>
            </div>
        </section>
    )
}