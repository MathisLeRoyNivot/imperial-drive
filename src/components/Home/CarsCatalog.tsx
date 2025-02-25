"use client";

import React, { useState, useMemo, useEffect } from "react";
import CarsFilterOptions from "./CarsFilterOptions";
import { Car, CarSchema } from "@/models/Car";
import { Dialog, DialogTrigger } from "../ui/dialog";
import CarBookingModal from "../Booking/CarBookingModal";
import { getCar } from "@/services/api/cars";
import CarInfo from "./CarInfo";

type CarsCatalogProps = {
	carsList: Car[];
};

const CarsCatalog = ({ carsList }: CarsCatalogProps) => {
	// Local state for filter options.
	const [price, setPrice] = useState<string>("");
	const [brand, setBrand] = useState<string>("");
	const [brands, setBrands] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
	const [carToRent, setCarToRent] = useState<Car | null>(null);

	useEffect(() => {
		const brandsSet = new Set<string>();
		carsList.forEach((car: Car) => {
			brandsSet.add(car.brand);
		});
		setBrands(Array.from(brandsSet));
	}, [carsList]);

	// Filter and sort the list of cars.
	const filteredCars = useMemo(() => {
		let result = [...carsList];

		// Filter by brand if a brand is selected.
		if (brand && brand !== "all") {
			result = result.filter((car) =>
				car.brand.toLowerCase().includes(brand.toLowerCase())
			);
		}

		// Sort by dayRate according to price option.
		if (price === "low_to_high") {
			result.sort((a, b) => (a.dayRate || 0) - (b.dayRate || 0));
		} else if (price === "high_to_low") {
			result.sort((a, b) => (b.dayRate || 0) - (a.dayRate || 0));
		}

		return result;
	}, [carsList, brand, price]);

	const selectCar = (carId: string): void => {
		setCarToRent(null);
		setIsLoading(true);
		setSelectedCarId(carId);
	};

	useEffect(() => {
		fetchCar();
	}, [selectedCarId]);

	const fetchCar = async () => {
		if (selectedCarId === null) {
			setCarToRent(null);
			return;
		}

		const { car } = await getCar(selectedCarId);
		try {
			const carFetched = CarSchema.parse(car);
			setCarToRent(carFetched);
			setIsLoading(false);
		} catch (error) {
			console.error("Invalid data", error);
		}
	};

	return (
		<div className="container w-full my-10">
			<div className="flex justify-between items-center mb-4">
				<div>
					<h3 className="text-2xl font-bold">
						Our Fleet<span className="text-yellow-600">.</span>
					</h3>
					<h4 className="text-muted-foreground">
						Explore our exclusive cars you might like.
					</h4>
				</div>
				<CarsFilterOptions
					price={{
						value: price,
						onChange: setPrice,
					}}
					brands={{
						value: brand,
						elements: brands,
						onChange: setBrand,
					}}
				/>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{filteredCars.map((car: Car) => (
					<div key={car.id} className="relative group">
						<Dialog>
							<DialogTrigger asChild>
								{/* Wrapping the entire card content */}
								<div
									onClick={() => selectCar(car.id)}
									className="p-2 rounded-lg shadow border border-transparent hover:cursor-pointer hover:border-neutral-200 overflow-hidden">
									<div className="absolute inset-0 bg-white/25 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-lg"></div>
									<span className="absolute inset-0 flex items-center justify-center text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
										Book Now
									</span>
									<div className="relative z-0">
										<CarInfo car={car} showPrice={true} />
									</div>
								</div>
							</DialogTrigger>
							<CarBookingModal
								isLoading={isLoading}
								car={carToRent}
							/>
						</Dialog>
					</div>
				))}
			</div>
		</div>
	);
};

export default CarsCatalog;
