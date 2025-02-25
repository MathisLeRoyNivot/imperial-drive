"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerWithRangeProps
	extends React.HTMLAttributes<HTMLDivElement> {
	value?: DateRange | undefined;
	onChange?: (value: DateRange | undefined) => void;
}

export function DatePickerWithRange({
	className,
	value,
	onChange,
	...props
}: DatePickerWithRangeProps) {
	const today = new Date();
	const dateInAYear = addDays(today, 365);

	// Use internal state but keep it in sync with the controlled value.
	const [internalDate, setInternalDate] = React.useState<
		DateRange | undefined
	>(value || { from: new Date(), to: addDays(new Date(), 1) });

	React.useEffect(() => {
		if (value !== undefined) {
			setInternalDate(value);
		}
	}, [value]);

	const handleSelect = (newDate: DateRange | undefined) => {
		setInternalDate(newDate);
		if (onChange) {
			onChange(newDate);
		}
	};

	return (
		<div className={cn("grid gap-2", className)} {...props}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={"outline"}
						className={cn(
							"w-full justify-start text-left font-normal",
							!internalDate && "text-muted-foreground"
						)}>
						<CalendarIcon className="mr-2" />
						{internalDate?.from ? (
							internalDate.to ? (
								<>
									{format(internalDate.from, "LLL dd, y")} -{" "}
									{format(internalDate.to, "LLL dd, y")}
								</>
							) : (
								format(internalDate.from, "LLL dd, y")
							)
						) : (
							<span>From - To</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={internalDate?.from || today}
						selected={internalDate}
						onSelect={handleSelect}
						numberOfMonths={2}
						fromDate={today}
						toDate={dateInAYear}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
