import Navbar from "../components/Navbar"
import { createSignal, onMount, createEffect } from "solid-js"
import { Spinner, Button, Grid, GridItem, FormHelperText, notificationService, SelectOptionIndicator, SelectOption, SelectOptionText, Box, FormControl, FormLabel, Heading, IconButton, Input, SimpleGrid, Select, SelectPlaceholder, SelectContent, SelectValue, SelectIcon, SelectTrigger, SelectListbox, Skeleton, Text } from "@hope-ui/solid"
import FlightResult from "../components/FlightResult"
import AdultForm from "../components/AdultForm"
import ChildForm from "../components/ChildForm"
import { createBooking } from '../function/api'

const Booking = () => {
	const [tNavbar, setNavbar] = createSignal(true)
	const [flightData, setFlightData] = createSignal({})
	const [item, setItem] = createSignal({})
	const [isLoading, setLoading] = createSignal(false)

	const showNotification = () => {
        notificationService.show({
            status: "danger", /* or success, warning, danger */
            title: "Something error",
            description: "Check your booking input",
        });
    }

	const validateInput = async (e) => {
		setLoading(true)
		e.preventDefault()
		try {

			const dataRaw = {
				"data": {
				"type": "flight-order",
				"flightOffers": [],
				"travelers": [],
				"remarks": {
					"general": [
					{
						"subType": "GENERAL_MISCELLANEOUS",
						"text": "ONLINE BOOKING FROM INCREIBLE VIAJES"
					}
					]
				},
				"ticketingAgreement": {
					"option": "DELAY_TO_CANCEL",
					"delay": "6D"
				},
				"contacts": [
					{
					"addresseeName": {
						"firstName": e.target.fn.value,
						"lastName": e.target.ln.value
					},
					"companyName": "TRAVELKU",
					"purpose": "STANDARD",
					"phones": [
						{
						"deviceType": "MOBILE",
						"countryCallingCode": "62",
						"number": e.target.mn.value
						}
					],
					"emailAddress": e.target.email.value,
					"address": {
						"lines": [
						"Babat"
						],
						"postalCode": "62207",
						"cityName": "Lamongan",
						"countryCode": "ID"
					}
					}
				]
				}
			}
			item().travelerPricings.map((items, key) => {
				let traveler = {
					"id": key + 1,
					"dateOfBirth": e.target[`dob-${key}`].value,
					"name": {
					"firstName": e.target[`fn-${key}`].value,
					"lastName": e.target[`ln-${key}`].value
					},
					"gender": e.target[`gender-${key}`].value,
					"contact": {
					"emailAddress": e.target.email.value,
					"phones": [
						{
						"deviceType": "MOBILE",
						"countryCallingCode": "62",
						"number": e.target.mn.value
						}
					]
					}
				} 

				if(e.target.hasOwnProperty(`pn-${key}`)) {
					const iss = e.target[`exp-${key}`].value.split('-')
					traveler.documents = []
					const doc = {
						"documentType": "PASSPORT",
						"birthPlace": "Jakarta",
						"issuanceLocation": "Jakarta",
						"issuanceDate": (parseInt(iss[0]) - 10) + '-' + iss[1] + '-' + iss[2] ,
						"number": e.target[`pn-${key}`].value,
						"expiryDate": e.target[`exp-${key}`].value,
						"issuanceCountry": e.target[`coi-${key}`].value,
						"validityCountry": e.target[`coi-${key}`].value,
						"nationality": e.target[`nat-${key}`].value,
						"holder": true
					}

					traveler.documents.push(doc)
				}

				dataRaw.data.travelers.push(traveler)
			})

			dataRaw.data.flightOffers.push(item())

			const data = await createBooking(dataRaw)
			if(data.hasOwnProperty('data')) {
				setLoading(false)
				window.location.href = '#/check-booking/' + data.data.id
			}
		} catch(e) {
			setLoading(false)
			showNotification()
		}
	}

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
					<form onSubmit={validateInput}>
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
												<Input name="fn" type="text"/>
												<FormHelperText>(without title and punctuation)</FormHelperText>
												</FormControl>
												<FormControl>
												<FormLabel>Family Name / Last Name</FormLabel>
												<Input name="ln" type="text"/>
												<FormHelperText>(without title and punctuation)</FormHelperText>
												</FormControl>
												<FormControl>
												<FormLabel>Mobile Number</FormLabel>
												<Input name="mn" type="text"/>
												<FormHelperText>e.g. +62812345678, for Country Code (+62) and Mobile No. 0812345678</FormHelperText>
												</FormControl>
												<FormControl>
												<FormLabel>Email</FormLabel>
												<Input name="email" type="email"/>
												<FormHelperText>e.g. email@example.com</FormHelperText>
												</FormControl>
											</SimpleGrid>
										</Box> 
									</Box>

									<Heading size="lg" mb="10px">Traveler Details</Heading>
									{item().travelerPricings.map((items, key) => {
										return (
											<Box>
												{items.travelerType == "ADULT" ? (
													<AdultForm key={key}/>
												) : (
													<ChildForm key={key}/>
												)}
											</Box>
										)
									})}
								</Box>
							</GridItem>
							<GridItem colSpan={{'@initial': 4, '@md': 2}}>
								{item().hasOwnProperty('itineraries') ? (
									<Box>
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
										<Button size="lg" w="100%" colorScheme="danger" type="submit">{isLoading() ? <Spinner/> : 'Booking'}</Button>
									</Box>
								) : (
									<Box></Box>
								)}
							</GridItem>
						</Grid>
						</form>
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