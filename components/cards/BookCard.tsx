import Image from "next/image";
import Link from "next/link";

interface Props {
  book: {
    id?: string;
    title: string;
    blurb: string;
    author: string;
    cover: string;
  };
}

const BookCard = ({ book }: Props) => {
  return (
    <article className="w-40 sm:w-48">
      <Link href={`/`}>
        <div className="relative w-full h-60">
          <Image
            src={book.cover}
            alt={book.title}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      </Link>
    </article>
  );
};

export default BookCard;
