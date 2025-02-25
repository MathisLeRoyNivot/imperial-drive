import { CarBrands } from "@/models/Car";

export const getBrandName = (brand: string): string => {
	return (CarBrands as any)[brand] || brand;
};
