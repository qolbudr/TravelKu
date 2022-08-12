import Navbar from "../components/Navbar"
import { SelectOptionIndicator, SelectOption, SelectOptionText, Box, FormControl, FormLabel, Heading, IconButton, Input, SimpleGrid, Select, SelectPlaceholder, SelectContent, SelectValue, SelectIcon, SelectTrigger, SelectListbox, Skeleton, Text } from "@hope-ui/solid"
import { FiSearch } from 'solid-icons/fi'
import { getToken } from "../function/authorization" 
import * as Api from "../function/api"
import { createSignal, onMount, createEffect } from "solid-js"
import AutoComplete from "../components/AutoComplete"
import Shimmer from "../components/Shimmer"
import FlightResult from "../components/FlightResult"

const Home = () => {
    const [amadeusToken, setAmadeusToken] = createSignal({})
    const [tNavbar, setNavbar] = createSignal(true)
    const [formData, setFormData] = createSignal({
        origin: '',
        to: '',
        depature: '',
        adult: '',
        child: '',
        class: ''
    })

    const [flightData, setFlightData] = createSignal({
        data: []
    })
    const [isLoading, setLoading] = createSignal(false)

    const autoCompleteCallback = (value, type) => {
        const data = formData()
        if(type == "origin") {
            data.origin = value
        } else {
            data.to = value
        } 
        setFormData(data)
    }

    const searchFlight = async () => {
        setLoading(true)
        const token = amadeusToken().access_token
        const data = formData()
        const response = await Api.searchFlight(data, token)
        setFlightData(response)
        setLoading(false)
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

    onMount( async () => {
        setAmadeusToken(await getToken());
    })

    return (
        <>
            <Navbar color={tNavbar() ? 'white' : 'black'} bg={tNavbar() ? 'transparent' : 'white'}/>
            <Box position="relative">
                <Box d="flex" alignItems="center" justifyContent="center" css={{ filter: 'brightness(0.4)' }} w="100%" h="$sm" objectFit="cover" as="img" src="https://www.teahub.io/photos/full/39-393349_flying-flight-images-hd.jpg"></Box>
                <Box p="$10" textAlign="center" color="white" top="0" left="0" bottom="0" w="100%" display="flex" position="absolute" alignItems="center" justifyContent="center">
                    <Heading size={{"@initial": "xl", "$md": "4xl"}} textTransform="uppercase">
                        Find Flight for Your Need
                    </Heading>
                    <Box position="absolute" backgroundColor="white" p={{"@initial": "$2 $5 $6 $5", "@md": "$2 $14 $6 $5"}} boxShadow="$md" w={{"@initial": "90%", "@md": "80%"}} bottom={{"@initial": "-150px", "@md": "-50px"}}>
                        <Box>
                        <SimpleGrid columns={{ "@initial": 1, "@md": 2 }} gap={{'@initial': '10px', '@md': '20px'}}>
                            <Box textAlign="left">
                                <SimpleGrid columns={{ "@initial": 1, "@md": 2 }} textAlign="left" gap={{"@initial": "0", "@md": "10px"}}>
                                    <AutoComplete callback={autoCompleteCallback} label="From" placeholder="Origin"/>
                                    <AutoComplete callback={autoCompleteCallback} label="To" placeholder="Destination"/>
                                </SimpleGrid >
                                <FormControl>
                                    <FormLabel>Depature</FormLabel>
                                    <Input onChange={(e) => {
                                        const data = formData()
                                        data.depature = e.target.value
                                        setFormData(data)
                                    }} type="date" placeholder="Depature"/>
                                </FormControl>
                            </Box>
                            
                            <Box textAlign="left">
                                <SimpleGrid columns={{ "@initial": 1, "@md": 2 }} textAlign="left" gap={{"@initial": "0", "@md": "10px"}}>
                                    <FormControl>
                                        <FormLabel>Adult Passengers</FormLabel>
                                        <Input type="number" onChange={(e) => {
                                            const data = formData()
                                            data.adult = e.target.value
                                            setFormData(data)
                                        }} placeholder="No. of Passengers"/>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Child Passengers</FormLabel>
                                        <Input type="number" onChange={(e) => {
                                            const data = formData()
                                            data.child = e.target.value
                                            setFormData(data)
                                        }} placeholder="No. of Passengers"/>
                                    </FormControl>
                                </SimpleGrid>
                                <FormControl>
                                    <FormLabel>Seat Class</FormLabel>
                                    <Select onChange={(e) => {
                                            const data = formData()
                                            data.class = e
                                            setFormData(data)
                                        }}>
                                        <SelectTrigger>
                                            <SelectPlaceholder>Seat Class</SelectPlaceholder>
                                            <SelectValue />
                                            <SelectIcon />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectListbox>
                                            <For each={["Economy", "Business", "First"]}>
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
                            </Box>
                        </SimpleGrid>
                        </Box>
                        <IconButton onClick={searchFlight} colorScheme="danger" position="absolute" bottom="50px" right="-$5" borderRadius="$full" size="xl" icon={<FiSearch/>}/>
                    </Box>
                </Box>
            </Box>
            <Box mt={{"@initial": "180px", "@md": "100px"}} mx={{"@initial": "5%", "@md": "50px"}}>
                {isLoading() ? (
                    <Shimmer/>
                ) : (
                    flightData().data.map((item) =>
                        <FlightResult 
                            departureIataCode={item.itineraries[0].segments[0].departure.iataCode}
                            arrivalIataCode={item.itineraries[0].segments[item.itineraries[0].segments.length - 1].arrival.iataCode}
                            departureTime={item.itineraries[0].segments[0].departure.at}
                            arrivalTime={item.itineraries[0].segments[0].arrival.at}
                            price={item.price.total}
                            carrierCode={item.itineraries[0].segments[0].carrierCode}
                            carrierNumber={item.itineraries[0].segments[0].number}
                        />
                    )
                )}
            </Box>
        </>
    )
}

export default Home