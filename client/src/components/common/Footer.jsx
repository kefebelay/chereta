
export default function Footer() {
    const date = new Date().getFullYear()

  return (
    <footer className="text-center m-6">
      <p >@ <span className="text-accent>">Chereta</span> {date}</p>
    </footer>
  )
}
