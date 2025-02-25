"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { DatePickerWithRange } from "../ui/date-picker-range";
import { Combobox } from "../ui/combobox";
import { pickupLocations } from "@/lib/constants";

const searchFormSchema = z.object({
	pickupLocation: z
		.string()
		.min(1, { message: "Please select a pickup location." }),
	rentalDates: z
		.object({
			from: z.date().nullable(),
			to: z.date().nullable(),
		})
		.refine((data) => data.from !== null && data.to !== null, {
			message: "Both start and end dates are required.",
			path: ["from"],
		})
		.refine(
			(data) =>
				data.from !== null && data.to !== null && data.to >= data.from,
			{ message: "End date must be after start date.", path: ["to"] }
		),
});

const SearchBar = () => {
	const searchForm = useForm<z.infer<typeof searchFormSchema>>({
		resolver: zodResolver(searchFormSchema),
		defaultValues: {
			pickupLocation: "",
			rentalDates: [null, null],
		},
	});

	function onSubmit(values: z.infer<typeof searchFormSchema>) {
		// Handle the validated and type-safe form values here.
		console.log(values);
	}

	return (
		<div className="container w-full flex items-center flex-col mt-10">
			<h3 className="text-xl font-medium mb-4">
				Book Your Royal Experience
				<span className="text-yellow-600">.</span>
			</h3>
			<Form {...searchForm}>
				<form
					onSubmit={searchForm.handleSubmit(onSubmit)}
					className="gap-2 flex items-start">
					<p className="h-9 flex items-center">
						I&apos;d like to collect my car in
					</p>

					{/* Pickup Location */}
					<FormField
						control={searchForm.control}
						name="pickupLocation"
						render={({ field }) => (
							<FormItem className="h-20">
								{/* <FormLabel>Pickup Location</FormLabel> */}
								<FormControl>
									<Combobox
										comboboxElements={pickupLocations}
										placeholder="Pickup location"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<p className="h-9 flex items-center">for the dates</p>

					{/* Rental Dates */}
					<FormField
						control={searchForm.control}
						name="rentalDates"
						render={({ field }) => (
							<FormItem className="h-20">
								{/* <FormLabel>Rental Dates</FormLabel> */}
								<FormControl>
									<DatePickerWithRange {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit">Book Now</Button>
				</form>
			</Form>
		</div>
	);
};

export default SearchBar;
