"use client";

import CarsCatalog from "@/components/Home/CarsCatalog";
import Hero from "@/components/Home/Hero";
import SearchBar from "@/components/Home/SearchBar";
import { Car, CarsSchema } from "@/models/Car";
import { getCarsList } from "@/services/api/cars";
import { useEffect, useState } from "react";

export default function Home() {
	const [carsList, setCarsList] = useState<Car[]>([]);
	useEffect(() => {
		fetchCarsList();
	}, []);

	const fetchCarsList = async () => {
		const { cars } = await getCarsList();
		try {
			const carsFetched = CarsSchema.parse(cars);
			setCarsList(carsFetched);
		} catch (error) {
			console.error("Invalid data", error);
		}
	};

	return (
		<main className="w-100 flex flex-col items-center justify-center">
			<Hero />
			<SearchBar />
			<CarsCatalog carsList={carsList} />
		</main>
	);
}
