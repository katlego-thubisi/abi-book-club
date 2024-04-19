import { QueueValidation } from "@/lib/validations/queue";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
// import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";

import { cn } from "@/lib/utils";

interface Props {
  next: (startDate: Date, endDate: Date) => Promise<void>;
}

const BomQueueSchedule = ({ next }: Props) => {
  const form = useForm<z.infer<typeof QueueValidation>>({
    resolver: zodResolver(QueueValidation),
    defaultValues: {
      id: "",
      bookQueue: [null, null, null],
    },
  });

  const [date, setDate] = React.useState<any | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  const onFormSubmit = async () => {
    console.log("Queue saving");
    await next(date.from, date.to);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5 sm:gap-10"
        onSubmit={form.handleSubmit(onFormSubmit)}
      >
        <div>
          <label className="mb-1">Voting period</label>
          <div className={cn("grid gap-2")}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <Button
          type="submit"
          className="bg-red-800 dark:bg-red-800 dark:text-white"
          disabled={form.formState.isSubmitting}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default BomQueueSchedule;
