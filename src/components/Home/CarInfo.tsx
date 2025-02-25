import { Car } from "@/models/Car";
import { getBrandName } from "@/lib/cars";
import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { FaGasPump, FaGaugeHigh } from "react-icons/fa6";
import { TbManualGearboxFilled } from "react-icons/tb";

type Props = {
	car: Car;
	showPrice: boolean;
};

const CarInfo = ({ car, showPrice }: Props) => {
	return (
		<div>
			{car.image && (
				<AspectRatio ratio={16 / 10} className="rounded-md mb-2">
					<Image
						src={car.image.url}
						alt={`${car.brand} ${car.model}`}
						className="h-full w-full rounded-md object-cover"
						fill
					/>
				</AspectRatio>
			)}

			<h5 className="text-lg font-medium mb-1">
				{getBrandName(car.brand)}{" "}
				<span className="font-bold">{car.model}</span>
			</h5>
			<div className="flex gap-1 items-center mb-2">
				<Badge variant={"secondary"}>
					<FaGaugeHigh className="size-3 me-1" />
					{car.horsePower}hp
				</Badge>
				<Badge variant={"secondary"}>
					<TbManualGearboxFilled className="size-3 me-1" />
					{car.transmission}
				</Badge>
				<Badge variant={"secondary"}>
					<FaGasPump className="size-3 me-1" />
					{car.fuelType}
				</Badge>
			</div>
			{showPrice && (
				<p className="text-muted-foreground text-sm">
					From $
					<span className="text-xl text-accent-foreground font-bold">
						{car.dayRate}
					</span>
					/day
				</p>
			)}
		</div>
	);
};

export default CarInfo;
