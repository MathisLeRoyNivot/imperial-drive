"use client";

import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { getBrandName } from "@/lib/cars";
import { Label } from "../ui/label";

type CarsFilterOptionsProps = {
	price: {
		value: string;
		onChange: (value: string) => void;
	};
	brands: {
		value: string;
		elements: string[];
		onChange: (value: string) => void;
	};
};

const CarsFilterOptions: React.FC<CarsFilterOptionsProps> = ({
	price,
	brands,
}) => {
	return (
		<div className="flex items-center gap-4">
			<div>
				<Label htmlFor="sort" className="text-right">
					Sort
				</Label>
				<Select
					name="sort"
					onValueChange={price.onChange}
					value={price.value}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="low_to_high">Low to High</SelectItem>
						<SelectItem value="high_to_low">High to Low</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div>
				<Label htmlFor="brand" className="text-right">
					Brand
				</Label>
				<Select
					name="brand"
					onValueChange={brands.onChange}
					value={brands.value}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All</SelectItem>
						{brands.elements.map((brand: string, index: number) => (
							<SelectItem key={index} value={brand}>
								{getBrandName(brand)}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};

export default CarsFilterOptions;
