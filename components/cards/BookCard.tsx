import Image from "next/image";

interface Props {
  book: {
    id?: string;
    title: string;
    blurb: string;
    authors: string[];
    cover: string;
  };

  handleSelectItem: () => void;
}

const BookCard = ({ book, handleSelectItem }: Props) => {
  return (
    <article className="w-40 sm:w-48" onClick={() => handleSelectItem()}>
      <div>
        <div className="relative w-full h-60 overflow-hidden cursor-pointer">
          <Image
            src={book.cover}
            alt={book.title}
            width={160}
            height={240}
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="text-base-semibold text-black dark:text-light-1 pt-3">
            {book.title}
          </h3>
          <p className="text-black dark:text-light-1">
            {book.authors.map((a) => a)}
          </p>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
