import Navbar from "../components/Navbar"
import { HStack, Spinner, SwitchPrimitive, SwitchPrimitiveThumb, Switch, notificationService, SelectOptionIndicator, SelectOption, SelectOptionText, Box, FormControl, FormLabel, Heading, IconButton, Input, SimpleGrid, Select, SelectPlaceholder, SelectContent, SelectValue, SelectIcon, SelectTrigger, SelectListbox, Skeleton, Text } from "@hope-ui/solid"
import { FiSearch } from 'solid-icons/fi'
import { getToken } from "../function/authorization" 
import * as Api from "../function/api"
import { createSignal, onMount, createEffect } from "solid-js"
import AutoComplete from "../components/AutoComplete"
import Shimmer from "../components/Shimmer"
import FlightResult from "../components/FlightResult"
import { currentDate, nextDate } from "../function/utils"
import airlinesData from "../assets/airlines.json"
import Filter from '../components/Filter'

const Home = () => {
    const [isRoundTrip, setRoundTrip] = createSignal(false)
    const [tNavbar, setNavbar] = createSignal(true)
    const [airlineList, setAirlineList] = createSignal({})
    const [formData, setFormData] = createSignal({
        origin: 'Surabaya - Indonesia (SUB)',
        to: 'Jeddah - Saudi Arabia (JED)',
        depature: currentDate(),
        return: nextDate(),
        adult: 1,
        child: '',
        class: 'Economy'
    })
    const [flightData, setFlightData] = createSignal({
        data: []
    })

    const [flightDataFilter, setFlightDataFilter] = createSignal({
        data: []
    })

    const [isLoading, setLoading] = createSignal(false)
    const [filter, setFilter] = createSignal({
        airlines: null,
        priceStart: null,
        priceEnd: null
    })
    const autoCompleteCallback = (value, type) => {
        const data = formData()
        if(type == "origin") {
            data.origin = value
        } else {
            data.to = value
        } 
        setFormData(data)
    }
    const showNotification = () => {
        notificationService.show({
            status: "danger", /* or success, warning, danger */
            title: "Something error",
            description: "Please refresh current page",
        });
    }
    const searchFlight = async () => {
        setLoading(true)
        try {
            const data = formData()
            let response = await Api.searchFlight(data, isRoundTrip())
            setFlightData(response)
            localStorage.setItem('flightData', JSON.stringify(response))
            setFlightDataFilter(response)
            setLoading(false)
            setAirlineList(flightData().dictionaries.carriers)
        } catch (e) {
            showNotification()
        }    
    }
    const goFilter = () => {
        setLoading(true)
        const data = JSON.parse(localStorage.getItem('flightData'))
        let datas = data.data

        if(filter().airlines && filter().airlines != 'ALL') {
            datas = datas.filter((item) => item.itineraries[0].segments[0].carrierCode == filter().airlines)
        }

        data.data = datas
        setLoading(false)
        setFlightDataFilter(data)
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

    return (
        <>
            <Navbar color={tNavbar() ? 'white' : 'black'} bg={tNavbar() ? 'transparent' : 'white'}/>
            <Box position="relative">
                <Box d="flex" alignItems="center" justifyContent="center" css={{ filter: 'brightness(0.4)' }} w="100%" h="$sm" objectFit="cover" as="img" src="https://www.teahub.io/photos/full/39-393349_flying-flight-images-hd.jpg"></Box>
                <Box p="$10" textAlign="center" color="white" top="0" left="0" bottom="0" w="100%" display="flex" position="absolute" alignItems="center" justifyContent="center">
                    <Heading size={{"@initial": "xl", "$md": "4xl"}} textTransform="uppercase">
                        Find Flight for Your Need
                    </Heading>
                    <Box position="absolute" backgroundColor="white" p={{"@initial": "$2 $5 $6 $5", "@md": "$2 $14 $6 $5"}} boxShadow="$md" w={{"@initial": "90%", "@md": "80%"}} bottom={{"@initial": "-300px", "@md": "-50px"}}>
                        <Box>
                        <SimpleGrid columns={{ "@initial": 1, "@md": 2 }} gap={{'@initial': '10px', '@md': '20px'}}>
                            <Box textAlign="left">
                                <SimpleGrid columns={{ "@initial": 1, "@md": 2 }} textAlign="left" gap={{"@initial": "0", "@md": "10px"}}>
                                    <AutoComplete value="Surabaya - Indonesia (SUB)" callback={autoCompleteCallback} label="From" placeholder="Origin"/>
                                    <AutoComplete value="Jeddah - Saudi Arabia (JED)" callback={autoCompleteCallback} label="To" placeholder="Destination"/>
                                </SimpleGrid >
                                <SimpleGrid columns={{ "@initial": 1, "@md": 2 }} textAlign="left" gap={{"@initial": "0", "@md": "10px"}}>
                                <FormControl>
                                    <FormLabel>Depature</FormLabel>
                                    <Input onChange={(e) => {
                                        const data = formData()
                                        data.depature = e.target.value
                                        setFormData(data)
                                    }} type="date" value={currentDate()} min={currentDate()} placeholder="Depature"/>
                                </FormControl>
                                <Box textAlign="left" color="black">
                                    <Switch size="sm" onChange={() => setRoundTrip(!isRoundTrip())} fontWeight="$medium" mb="4px" defaultChecked={isRoundTrip()}>Return?</Switch>
                                    <FormControl hidden={!isRoundTrip()}>
                                        <Input onChange={(e) => {
                                            const data = formData()
                                            data.return = e.target.value
                                            setFormData(data)
                                        }} type="date" value={nextDate()} min={nextDate()} placeholder="Depature"/>
                                    </FormControl>
                                </Box>
                                </SimpleGrid>
                            </Box>
                            
                            <Box textAlign="left">
                                <SimpleGrid columns={{ "@initial": 1, "@md": 2 }} textAlign="left" gap={{"@initial": "0", "@md": "10px"}}>
                                    <FormControl>
                                        <FormLabel>Adult Passengers</FormLabel>
                                        <Input min={1} value="1" type="number" onChange={(e) => {
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
                                    <Select value="Economy" onChange={(e) => {
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
                        <IconButton onClick={searchFlight} colorScheme="danger" position="absolute" bottom="50px" right="-$4" borderRadius="$full" size="xl" icon={ isLoading() ? <Spinner/> : <FiSearch/>}/>
                    </Box>
                </Box>
            </Box>
            <Box pb="50px" mt={{"@initial": "330px", "@md": "100px"}} mx={{"@initial": "5%", "@md": "50px"}}>
                {isLoading() ? (
                    <Shimmer/>
                ) : (
                    <Box>
                        {flightData().hasOwnProperty('dictionaries') ? (
                            <Filter 
                                airlineVal={filter().airlines} 
                                priceStart={filter().priceStart} 
                                priceEnd={filter().priceEnd} 
                                airline={airlineList()}
                                onClick={goFilter}
                                onChange={setFilter}
                            />
                        ) : (
                            <Box/>
                        )}
                        <Box>
                        {flightDataFilter().data.map((item) =>
                            <FlightResult
                                flight={flightDataFilter()}
                                item={item}
                                departureIataCode={item.itineraries[0].segments[0].departure.iataCode}
                                arrivalIataCode={item.itineraries[item.itineraries.length - 1].segments[item.itineraries[item.itineraries.length - 1].segments.length - 1].arrival.iataCode}
                                departureTime={item.itineraries[0].segments[0].departure.at}
                                arrivalTime={item.itineraries[item.itineraries.length - 1].segments[item.itineraries[item.itineraries.length - 1].segments.length - 1].arrival.at}
                                price={item.price.total}
                                carrierCode={item.itineraries[0].segments[0].carrierCode}
                                carrierNumber={item.itineraries[0].segments[0].number}
                                airlineName={flightDataFilter().dictionaries.carriers[item.itineraries[0].segments[0].carrierCode]}
                            />
                        )}
                        </Box>
                    </Box>
                )}
            </Box>
        </>
    )
}

export default Home