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
    <article className="w-40 sm:w-40" onClick={() => handleSelectItem()}>
      <div>
        <div className="relative w-full h-60 overflow-hidden cursor-pointer">
          <Image
            src={book.cover}
            alt={book.title}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex items-center ">
          <div>
            <h3 className="text-base-semibold text-black dark:text-light-1 pt-3 h-15 overflow-hidden text-ellipsis">
              {book.title}
            </h3>
            <p className="text-black dark:text-light-1 h-6 overflow-hidden">
              {book.authors.map((a) => a)}
            </p>
          </div>
          <div className="relative flex w-12 h-12 items-center justify-center">
            <Image
              src={"/assets/more.svg"}
              alt="options"
              width={24}
              height={24}
              className="onject-contain cursor-pointer"
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default BookCard;
