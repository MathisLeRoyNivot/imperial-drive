import React from "react";
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { getBrandName } from "@/lib/cars";
import { Car } from "@/models/Car";
import { Loader } from "../Global/Loader";
import CarInfo from "../Home/CarInfo";
import BookingForm from "./BookingForm";

type Props = {
	isLoading: boolean;
	car?: Car;
};

function CarBookingModal({ isLoading, car }: Props) {
	return (
		<DialogContent className="max-w-[425px] md:max-w-[625px] lg:max-w-[825px]">
			<DialogHeader>
				<DialogTitle className="text-xl">
					{isLoading && <Loader />}
					{!isLoading && car && (
						<>
							Reserve your {getBrandName(car.brand)} {car.model}
						</>
					)}
				</DialogTitle>
				<DialogDescription>
					Fill in the form and we&apos;ll take care of everything.
				</DialogDescription>
			</DialogHeader>
			<div className="flex gap-4">
				<div className="flex-1">
					{isLoading && <Loader />}
					{!isLoading && car && (
						<CarInfo car={car} showPrice={false} />
					)}
				</div>
				<div className="flex-1">
					{isLoading && <Loader />}
					{!isLoading && car && <BookingForm carId={car.id} />}
				</div>
			</div>
			{/* <DialogFooter></DialogFooter> */}
		</DialogContent>
	);
}

export default CarBookingModal;
