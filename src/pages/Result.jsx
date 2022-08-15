import { useParams } from "@solidjs/router"
import Navbar from "../components/Navbar"
import { createSignal, onMount, createEffect } from "solid-js"
import { Spinner, Alert, AlertIcon, Button, Grid, GridItem, FormHelperText, notificationService, SelectOptionIndicator, SelectOption, SelectOptionText, Box, FormControl, FormLabel, Heading, IconButton, Input, SimpleGrid, Select, SelectPlaceholder, SelectContent, SelectValue, SelectIcon, SelectTrigger, SelectListbox, Skeleton, Text } from "@hope-ui/solid"
import FlightResult from "../components/FlightResult"
import { checkBooking } from "../function/api"

const Result = () => {
    const [tNavbar, setNavbar] = createSignal(true)
    const [flightData, setFlightData] = createSignal({})
    const params = useParams()
    const [isLoading, setLoading] = createSignal(true)
    const [result, setResult] = createSignal({})

    onMount( async () => {  
        const flightData = JSON.parse(localStorage.getItem('flightData'))
		setFlightData(flightData)

        let bookingId = encodeURIComponent(params.bookingId);
        if(params.bookingId2) {
            bookingId = bookingId + '%2F' + encodeURIComponent(params.bookingId2)
        }
        const result = await checkBooking(bookingId)
        setResult(result)
        setLoading(false)
    })

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

    return (
        <>
            {isLoading() ? (
                <Box display="flex" w="100%" h="100vh" alignItems="center" justifyContent="center">
                    <Spinner/>
                </Box>
            ) : (
                <>
                    <Navbar color={tNavbar() ? 'white' : 'black'} bg={tNavbar() ? 'transparent' : 'white'}/>
					<Box position="relative">
						<Box d="flex" alignItems="center" justifyContent="center" css={{ filter: 'brightness(0.4)' }} w="100%" h="$sm" objectFit="cover" as="img" src="https://www.teahub.io/photos/full/39-393349_flying-flight-images-hd.jpg"></Box>
						<Box p="$10" textAlign="center" color="white" top="0" left="0" bottom="0" w="100%" display="flex" position="absolute" alignItems="center" justifyContent="center">
							<Heading size={{"@initial": "xl", "$md": "4xl"}} textTransform="uppercase">
								Booking Details
							</Heading>
						</Box>
					</Box>
                    <Box w="100%">
                        <Grid templateColumns="repeat(4, 1fr)" textAlign="left" gap={{"@initial": "10px", "@md": "30px"}} p="$10">
							<GridItem colSpan='4'>
                            <Alert status="success">
                                <AlertIcon mr="$2_5" />
                                BOOKING SUCCESS, YOUR PNR CODE : {result().data.associatedRecords[0].reference}
                            </Alert>
                            </GridItem>
                            <GridItem colSpan='4'>
                                <FlightResult
                                    flight={flightData()}
                                    item={result().data.flightOffers[0]}
                                    departureIataCode={result().data.flightOffers[0].itineraries[0].segments[0].departure.iataCode}
                                    arrivalIataCode={result().data.flightOffers[0].itineraries[result().data.flightOffers[0].itineraries.length - 1].segments[result().data.flightOffers[0].itineraries[result().data.flightOffers[0].itineraries.length - 1].segments.length - 1].arrival.iataCode}
                                    departureTime={result().data.flightOffers[0].itineraries[0].segments[0].departure.at}
                                    arrivalTime={result().data.flightOffers[0].itineraries[result().data.flightOffers[0].itineraries.length - 1].segments[result().data.flightOffers[0].itineraries[result().data.flightOffers[0].itineraries.length - 1].segments.length - 1].arrival.at}
                                    price={result().data.flightOffers[0].price.total}
                                    carrierCode={result().data.flightOffers[0].itineraries[0].segments[0].carrierCode}
                                    carrierNumber={result().data.flightOffers[0].itineraries[0].segments[0].number}
                                    airlineName={flightData().dictionaries.carriers[result().data.flightOffers[0].itineraries[0].segments[0].carrierCode]}
                                    hideButton={true}
                                />
                            </GridItem>
                        </Grid>
                    </Box>
                </>
            )}
        </>
    )
}

export default Result;