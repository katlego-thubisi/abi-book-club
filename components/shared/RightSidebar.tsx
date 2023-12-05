import ClubCard from "../cards/ClubCard";

function RightSidebar() {
  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Suggested Clubs</h3>
        <div className="flex flex-col gap-1.5">
          <ClubCard />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Suggested Readers</h3>
      </div>
    </section>
  );
}

export default RightSidebar;
