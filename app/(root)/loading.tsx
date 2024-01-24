import { Skeleton } from "@/components/ui/skeleton";
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const loading = () => {
  return (
    <section>
      <div className="flex-col">
        <h1 className="head-text text-black dark:text-white leading-none">
          Find Your Book Club
        </h1>
        <h1 className="head-text cursive">Community</h1>
        <img
          src="\assets\underline.png"
          alt="Text Underline"
          width="150px"
          height="10px"
          className="underline"
        ></img>
        <p className="mt-7 text-black dark:text-white">
          Hop into a book club and access curated content by your favorite
          creators. Heck, you could even create your own!
        </p>
      </div>

      <article className="mt-9 flex flex-wrap gap-4">
        {items.map((item: any) => (
          <div className="w-40 sm:w-48">
            <div className="flex flex-wrap items-center gap-3">
              <Skeleton className="relative h-60 w-full rounded-lg" />
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <Skeleton className="relative h-2 w-full rounded-sm" />

              <Skeleton className="relative h-2 w-full rounded-sm" />
            </div>

            {/* <Skeleton className="relative h-16 w-full rounded-sm" /> */}
          </div>
        ))}
      </article>
    </section>
  );
};

export default loading;
