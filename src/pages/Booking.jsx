import Navbar from "../components/Navbar"
import { createSignal, onMount, createEffect } from "solid-js"
import { Spinner, Grid, GridItem, FormHelperText, notificationService, SelectOptionIndicator, SelectOption, SelectOptionText, Box, FormControl, FormLabel, Heading, IconButton, Input, SimpleGrid, Select, SelectPlaceholder, SelectContent, SelectValue, SelectIcon, SelectTrigger, SelectListbox, Skeleton, Text } from "@hope-ui/solid"
import FlightResult from "../components/FlightResult"

const Booking = () => {
	const [tNavbar, setNavbar] = createSignal(true)
	const [flightData, setFlightData] = createSignal({})
	const [item, setItem] = createSignal({})

	createEffect(() => {
		const onScroll = () => {
			if(window.scrollY <= 0) {
				setNavbar(true)
			} else {
				setNavbar(false)
			}
		};
		
		window.addEventListener('scroll', onScroll);
		
		return () => {
		window.removeEventListener('scroll', onScroll);
		}
	}, []);

	onMount(async () => {
		const item = JSON.parse(localStorage.getItem('bookingData'))
		const flightData = JSON.parse(localStorage.getItem('flightData'))
		setItem(item);
		setFlightData(flightData)
		console.log(item)
	})


	return (
		<>
			{item().hasOwnProperty('itineraries') ? (
				<>
					<Navbar color={tNavbar() ? 'white' : 'black'} bg={tNavbar() ? 'transparent' : 'white'}/>
					<Box position="relative">
						<Box d="flex" alignItems="center" justifyContent="center" css={{ filter: 'brightness(0.4)' }} w="100%" h="$sm" objectFit="cover" as="img" src="https://www.teahub.io/photos/full/39-393349_flying-flight-images-hd.jpg"></Box>
						<Box p="$10" textAlign="center" color="white" top="0" left="0" bottom="0" w="100%" display="flex" position="absolute" alignItems="center" justifyContent="center">
							<Heading size={{"@initial": "xl", "$md": "4xl"}} textTransform="uppercase">
								Booking
							</Heading>
						</Box>
					</Box>

					<Box w="100%">
						<Grid templateColumns="repeat(4, 1fr)" textAlign="left" gap={{"@initial": "10px", "@md": "30px"}} p="$10">
							<GridItem colSpan={{'@initial': 4, '@md': 2}}>
								<Box>
									<Heading size="2xl">Your Booking</Heading>
									<Text size="md" mb="20px">Fill in your details and review your booking.</Text>
									<Heading size="lg" mb="10px">Contact Details</Heading>
									<Box mb="20px" boxShadow="$md" backgroundColor="white" w="100%">
										<Box borderBottom="1px solid $neutral8" p="$5">
											<Heading size="md">Contact Details (for E-ticket/Voucher)</Heading>
										</Box>
										<Box p="$5">
											<SimpleGrid columns={{ "@initial": 1, "@md": 2 }} gap="20px">
												<FormControl>
												<FormLabel>First & Middle Name (if any)</FormLabel>
												<Input type="text"/>
												<FormHelperText>(without title and punctuation)</FormHelperText>
												</FormControl>
												<FormControl>
												<FormLabel>Family Name / Last Name</FormLabel>
												<Input type="text"/>
												<FormHelperText>(without title and punctuation)</FormHelperText>
												</FormControl>
												<FormControl>
												<FormLabel>Mobile Number</FormLabel>
												<Input type="text"/>
												<FormHelperText>e.g. +62812345678, for Country Code (+62) and Mobile No. 0812345678</FormHelperText>
												</FormControl>
												<FormControl>
												<FormLabel>Email</FormLabel>
												<Input type="email"/>
												<FormHelperText>e.g. email@example.com</FormHelperText>
												</FormControl>
											</SimpleGrid>
										</Box> 
									</Box>

									<Heading size="lg" mb="10px">Traveler Details</Heading>
									<Box mb="20px" boxShadow="$md" backgroundColor="white" w="100%">
										<Box borderBottom="1px solid $neutral8" p="$5">
											<Heading size="md">Adult 1</Heading>
										</Box>
										<Box p="$5">
											<Text mb="20px" size="sm" color="green">Important: Passport valid for at least 6 months from departure date is required for international travel or transit abroad</Text>
											<Text mb="20px" size="sm" color="$warning10">Make sure that the passenger's name is exactly as written in the government issued ID/Passport/Driving License. \nAvoid any mistake, because some airlines don't allow name corrections after booking.</Text>
											<SimpleGrid columns={{ "@initial": 1, "@md": 2 }} gap="20px">
												<FormControl>
												<FormLabel>Gender</FormLabel>
												<Select value="MALE">
													<SelectTrigger>
														<SelectPlaceholder>Gender</SelectPlaceholder>
														<SelectValue />
														<SelectIcon />
													</SelectTrigger>
													<SelectContent>
														<SelectListbox>
														<For each={["MALE", "FEMALE"]}>
															{item => (
															<SelectOption value={item}>
																<SelectOptionText>{item}</SelectOptionText>
																<SelectOptionIndicator />
															</SelectOption>
															)}
														</For>
														</SelectListbox>
													</SelectContent>
												</Select>
												</FormControl>
												<Box></Box>
												<FormControl>
												<FormLabel>First & Middle Name (if any)</FormLabel>
												<Input type="text"/>
												<FormHelperText>(without title and punctuation)</FormHelperText>
												</FormControl>
												<FormControl>
												<FormLabel>Family Name / Last Name</FormLabel>
												<Input type="text"/>
												<FormHelperText>(without title and punctuation)</FormHelperText>
												</FormControl>
												<FormControl>
												<FormLabel>Date of Birth</FormLabel>
												<Input type="date"/>
												<FormHelperText>Adult Passenger (Age 12 and older)</FormHelperText>
												</FormControl>
												<FormControl>
												<FormLabel>Nationality</FormLabel>
												<Input maxLength={2} type="email"/>
												<FormHelperText>e.g. ID (Indonesia)</FormHelperText>
												</FormControl>
												<FormControl>
												<FormLabel>Passport Number</FormLabel>
												<Input type="number"/>
												<FormHelperText>For passengers below 18 years old, you may enter another valid ID number (e.g. birth certificate, student ID) or date of birth (ddmmyyyy)</FormHelperText>
												</FormControl>
												<Box></Box>
												<FormControl>
												<FormLabel>Country of Issue</FormLabel>
												<Input type="number"/>
												<FormHelperText>e.g. ID (Indonesia)</FormHelperText>
												</FormControl>
												<FormControl>
												<FormLabel>Expiry Date</FormLabel>
												<Input type="date"/>
												</FormControl>
											</SimpleGrid>
										</Box> 
									</Box>	      			
								</Box>
							</GridItem>
							<GridItem colSpan={{'@initial': 4, '@md': 2}}>
								{item().hasOwnProperty('itineraries') ? (
									<FlightResult
										flight={flightData()}
										item={item()}
										departureIataCode={item().itineraries[0].segments[0].departure.iataCode}
										arrivalIataCode={item().itineraries[item().itineraries.length - 1].segments[item().itineraries[item().itineraries.length - 1].segments.length - 1].arrival.iataCode}
										departureTime={item().itineraries[0].segments[0].departure.at}
										arrivalTime={item().itineraries[item().itineraries.length - 1].segments[item().itineraries[item().itineraries.length - 1].segments.length - 1].arrival.at}
										price={item().price.total}
										carrierCode={item().itineraries[0].segments[0].carrierCode}
										carrierNumber={item().itineraries[0].segments[0].number}
										airlineName={flightData().dictionaries.carriers[item().itineraries[0].segments[0].carrierCode]}
										hideButton={true}
									/>
								) : (
									<Box></Box>
								)}
							</GridItem>
						</Grid>
					</Box>
				</>
			) : (
				<Box w="100%" h="100vh" display="flex" alignItems="center" justifyContent="center">
					<Spinner/>
				</Box>
			)}
		</>
	)
}

export default Booking