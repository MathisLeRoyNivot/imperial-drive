// export interface Car {
// 	id: string;
// 	brand: string;
// 	model: string;
// 	year?: number;
// 	color?: string;
// 	seats?: number;
// 	transmission: "automatic" | "manual";
// 	horsePower?: number;
// 	fuelType: "gasoline" | "diesel" | "electric" | "hybrid";
// 	carType?: "sedan" | "coupe" | "suv" | "convertible" | "hatchback" | "wagon";
// 	dayRate?: number;
// 	availability?: boolean;
// 	image?: CarImage;
// 	description?: string;
// 	// createdAt: Date;
// 	// updatedAt: Date;
// }

// interface CarImage {
// 	url: string;
// }

import { z } from "zod";

export const CarSchema = z.object({
	id: z.string(),
	brand: z.string(),
	model: z.string(),
	year: z.number().optional(),
	color: z.string().optional(),
	seats: z.number().optional(),
	transmission: z.enum(["automatic", "manual"]),
	horsePower: z.number().optional(),
	fuelType: z.enum(["gasoline", "diesel", "electric", "hybrid"]),
	carType: z
		.enum(["sedan", "coupe", "suv", "convertible", "hatchback", "wagon"])
		.optional(),
	dayRate: z.number().optional(),
	availability: z.boolean().optional(),
	image: z
		.object({
			url: z.string(),
		})
		.optional(),
	description: z.string().optional(),
});

export type Car = z.infer<typeof CarSchema>;

export const CarsSchema = z.array(CarSchema);

export enum CarBrands {
	audi = "Audi",
	bmw = "BMW",
	bugatti = "Bugatti",
	ferrari = "Ferrari",
	mcLaren = "McLaren",
	mercedesBenz = "Mercedes-Benz",
	porsche = "Porsche",
	rollsRoyce = "Rolls-Royce",
}
