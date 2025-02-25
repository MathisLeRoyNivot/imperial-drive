import { request, gql } from "graphql-request";

export const getCarsList = async () => {
	const query = gql`
		query CarsList {
			cars(where: { availability: true }) {
				id
				model
				brand
				transmission
				horsePower
				fuelType
				seats
				image {
					url
				}
				dayRate
			}
		}
	`;

	return await request(
		"https://eu-west-2.cdn.hygraph.com/content/cm7j6e9hp002z07wbzhzhc3fm/master",
		query
	);
};

export const getCar = async (carId: string) => {
	const query = gql`
		query Car {
			car(where: { id: "${carId}" }) {
				id
				model
				brand
				transmission
				horsePower
				fuelType
				seats
				dayRate
				image {
					url
				}
			}
		}
	`;

	return await request(
		"https://eu-west-2.cdn.hygraph.com/content/cm7j6e9hp002z07wbzhzhc3fm/master",
		query
	);
};
