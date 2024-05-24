import { fetchBooks } from "@/lib/actions/book.actions";

import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import Rating from "@/components/custom-ui/RatingInput";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  // fetch organization list created by user
  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  // Fetch books
  const result = await fetchBooks();

  return (
    <section>
      <div className="flex justify-between align-middle">
        <h1 className="head-text text-dark-2 dark:text-light-2">Abi's Books</h1>
      </div>
      {/* Search Bar*/}

      <div className="mt-9 flex flex-wrap gap-7">
        {result.length === 0 ? (
          <p className="no-result">No Books</p>
        ) : (
          result.map((book: any) => (
            <Link
              href={`/books/${book.id}`}
              className="w-32 sm:w-36 cursor-pointer"
            >
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative w-full h-52 lg:h-52">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="mt-2 h-11 overflow-hidden text-ellipsis">
                  <h2 className="text-base-semibold text-black dark:text-light-1">
                    {book.title}
                  </h2>
                </div>
                <div className="flex gap-1">
                  <Rating
                    defaultRating={
                      book?.reviews?.reduce(
                        (totalRating: number, review: any) => {
                          return totalRating + review.rating;
                        },
                        0
                      ) / book?.reviews?.length
                    }
                  />
                  <p className="text-black dark:text-light-1">
                    {book?.reviews?.reduce(
                      (totalRating: number, review: any) => {
                        return totalRating + review.rating;
                      },
                      0
                    ) / book?.reviews?.length}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}

export default Page;
