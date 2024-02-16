import Image from "next/image";
import Link from "next/link";

interface Props {
  book: {
    id?: string;
    title: string;
    blurb: string;
    authors: string[];
    cover: string;
  };
}

const BookCard = ({ book }: Props) => {
  console.log(book.title, book.cover);
  return (
    <article className="w-40 sm:w-48">
      <Link href={book.cover}>
        <div className="relative w-full h-60">
          <img
            src={book.cover}
            alt={book.title}
            width={160}
            height={240}
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="text-base-semibold text-black dark:text-light-1">
            {book.title}
          </h3>
          <p className="text-black dark:text-light-1">
            {book.authors.map((a) => a)}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default BookCard;
