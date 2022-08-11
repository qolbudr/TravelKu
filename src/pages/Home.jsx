import Navbar from "../components/Navbar"
import { Box, FormControl, FormLabel, Heading, IconButton, Input, SimpleGrid, FormHelperText, Text } from "@hope-ui/solid"
import { FiSearch } from 'solid-icons/fi'
import { getToken } from "../function/authorization"
import { createSignal, onMount } from "solid-js"
import Airport from 'airport-codes'

const Home = () => {
    const [amadeusToken, setAmadeusToken] = createSignal({})
    const [showDestination, setShowDestination] = createSignal(true)
    const [airportList, setAirportList] = createSignal({})

    const searchAirport = (params) => {
        const result = Airport.findWhere({ city: params }).get("name")
        setAirportList(result)
        return result;
    }

    onMount( async () => {
        setAmadeusToken(await getToken());
        console.log(amadeusToken());
        console.log(searchAirport("CGK"))
    })

    return (
        <>
            <Navbar/>
            <Box position="relative">
                <Box d="flex" alignItems="center" justifyContent="center" css={{ filter: 'brightness(0.4)' }} w="100%" h="$sm" objectFit="cover" as="img" src="https://www.teahub.io/photos/full/39-393349_flying-flight-images-hd.jpg"></Box>
                <Box p="$10" textAlign="center" color="white" top="0" left="0" bottom="0" w="100%" display="flex" position="absolute" alignItems="center" justifyContent="center">
                    <Heading size={{"@initial": "xl", "$md": "4xl"}} textTransform="uppercase">
                        Find Flight for Your Need
                    </Heading>
                    <Box position="absolute" backgroundColor="white" p={{"@initial": "$5", "@md": "$8"}} boxShadow="$md" w="80%" bottom="-30px">
                        <Box>
                        <SimpleGrid columns={{ "@initial": 1, "@md": 2 }} gap="40px">
                            <SimpleGrid columns={{ "@initial": 1, "@md": 2 }} textAlign="left" gap="10px">
                                <FormControl position="relative">
                                    <FormLabel for="email">From</FormLabel>
                                    <Input onFocus={() => setShowDestination(false)} onBlur={() => setShowDestination(true)} id="from" type="text" placeholder="Origin"/>
                                    <Box backgroundColor="white" position="absolute" border="1px solid" borderColor="$accent5" hidden={showDestination()} background="white">
                                        <Box borderBottom="1px solid" borderBottomColor="$accent5" px="$5" py="$2">
                                            <Heading fontSize="$sm" color="black">Jakarta, Jakarta</Heading>
                                            <Text fontSize="$sm" color="$accent7">Soekarno-Hatta International Airport (CGK)</Text>
                                        </Box>
                                        <Box borderBottom="1px solid" borderBottomColor="$accent5" px="$5" py="$2">
                                            <Heading fontSize="$sm" color="black">Jakarta, Jakarta</Heading>
                                            <Text fontSize="$sm" color="$accent7">Soekarno-Hatta International Airport (CGK)</Text>
                                        </Box>
                                    </Box>
                                </FormControl>
                                <FormControl>
                                    <FormLabel for="email">To</FormLabel>
                                    <Input id="to" type="text" placeholder="Destination"/>
                                </FormControl>
                            </SimpleGrid >
                            <Box bg="tomato" height="80px"></Box>
                        </SimpleGrid>
                        </Box>
                        <IconButton colorScheme="danger" position="absolute" bottom="18px" right="20px" borderRadius="$full" size="lg" icon={<FiSearch/>}/>
                    </Box>
                </Box>
            </Box>
            
        </>
    )
}

export default Home