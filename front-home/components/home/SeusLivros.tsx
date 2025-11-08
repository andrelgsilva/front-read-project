import Image from 'next/image'

export function SeusLivros() {
  const books = [
    {
      title: '1984',
      author: 'George Orwell',
      coverImage: '/livros/1984.jpg', // caminho da imagem
      color: 'bg-red-500'
    },
    {
      title: 'Harry Potter',
      author: 'J.K. Rowling', 
      coverImage: '/livros/harry-potter.jpg',
      color: 'bg-blue-500'
    },
    {
      title: 'São Bernardo',
      author: 'Graciliano Ramos',
      coverImage: '/livros/sao-bernardo.jpg',
      color: 'bg-amber-600'
    },
    {
      title: 'Casa-Grande & Senzala',
      author: 'Gilberto Freyre',
      coverImage: '/livros/casa-grande-senzala.jpg',
      color: 'bg-green-600'
    }
  ]

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4 text-black">Seus Livros</h2>
      
      <div className="grid grid-cols-2 gap-4 cursor-pointer">
        {books.map((book, index) => (
          <div 
            key={index} 
            className="bg-white rounded-2xl p-4 shadow-sm flex flex-col"
          >
            {/* Imagem real */}
            <div className="rounded-lg h-32 relative mb-3 overflow-hidden">
              <Image
                src={book.coverImage}
                alt={`Capa do livro ${book.title}`}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm mb-1">
                {book.title}
              </h3>
              <p className="text-gray-600 text-xs">
                por {book.author}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}