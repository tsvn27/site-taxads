export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-6 md:py-8 text-center text-gray-400 text-xs md:text-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} Kayo Matheus. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
