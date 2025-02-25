import { request, gql } from "graphql-request";

export const postBooking = async (formData: any) => {
	const mutationQuery = gql`
        createBooking(
            data: {
                lastname: "",
                firstname: "",
                emailAddress: "",
                contactNumber: "${formData.contactNumber}",
                pickupLocation: "${formData.pickupLocation}",
                fromDate: "${formData.fromDate}",
                toDate: "${formData.toDate}",
                carId: {
                    connect: { id: "${formData.carId}" }
                }        
            }
        ) {
            id
        }
    `;

	console.log(mutationQuery);

	return await request(
		"https://eu-west-2.cdn.hygraph.com/content/cm7j6e9hp002z07wbzhzhc3fm/master",
		mutationQuery
	);
};
