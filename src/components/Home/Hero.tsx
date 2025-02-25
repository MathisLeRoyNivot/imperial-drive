import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
	return (
		<div className="container grid grid-cols-1 md:grid-cols-2 py-4 h-96">
			<div className="flex flex-col justify-center">
				<div>
					<h1 className="text-3xl font-bold mb-1">
						Experience Royalty on the Road
						<span className="text-yellow-600">.</span>
					</h1>
					<h2 className="text-muted-foreground mb-3">
						Discover a fleet of elite vehicles designed for those
						who command excellence. With unparalleled service and a
						passion for perfection, every journey becomes an
						experience in luxury.
					</h2>
					{/* <Button variant={"default"}>Reserve Your Royal Ride</Button> */}
				</div>
			</div>
			<div className="flex items-center justify-center">Image</div>
		</div>
	);
};

export default Hero;
