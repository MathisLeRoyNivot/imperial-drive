import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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
import { Input } from "../ui/input";
import { postBooking } from "@/services/api/bookings";

type BookingFormProps = {
	carId: string;
};

const bookingFormSchema = z.object({
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
	contactNumber: z
		.string()
		.min(1, { message: "Please enter your contact number." }),
});

const BookingForm = ({ carId }: BookingFormProps) => {
	const bookingForm = useForm<z.infer<typeof bookingFormSchema>>({
		resolver: zodResolver(bookingFormSchema),
		defaultValues: {
			pickupLocation: "",
			rentalDates: [null, null],
			contactNumber: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof bookingFormSchema>) => {
		const formData = {
			pickupLocation: values.pickupLocation,
			fromDate: values.rentalDates.from?.toISOString(),
			toDate: values.rentalDates.to?.toISOString(),
			contactNumber: values.contactNumber,
			carId,
		};
		console.log(values, formData);

		try {
			const result = await postBooking(formData);
			console.log(result);
		} catch (error) {
			console.error("Error posting booking", error);
		}
	};

	return (
		<Form {...bookingForm}>
			<form
				onSubmit={bookingForm.handleSubmit(onSubmit)}
				className="space-y-4 w-full flex flex-col">
				<FormField
					control={bookingForm.control}
					name="pickupLocation"
					render={({ field }) => (
						<FormItem className="flex flex-col flex-1">
							<FormLabel>Pickup Location</FormLabel>
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
				<FormField
					control={bookingForm.control}
					name="rentalDates"
					render={({ field }) => (
						<FormItem className="h-20">
							<FormLabel>Rental Dates</FormLabel>
							<FormControl>
								<DatePickerWithRange
									className="w-full"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={bookingForm.control}
					name="contactNumber"
					render={({ field }) => (
						<FormItem className="flex flex-col flex-1">
							<FormLabel>Contact Number</FormLabel>
							<FormControl>
								<Input
									type="tel"
									placeholder="Enter your contact number"
									className="input"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex items-end justify-end">
					<Button type="submit">Book</Button>
				</div>
			</form>
		</Form>
	);
};

export default BookingForm;
