import { useParams } from "@solidjs/router"
import Navbar from "../components/Navbar"
import { createSignal, onMount, createEffect } from "solid-js"
import { Spinner, Button, Grid, GridItem, FormHelperText, notificationService, SelectOptionIndicator, SelectOption, SelectOptionText, Box, FormControl, FormLabel, Heading, IconButton, Input, SimpleGrid, Select, SelectPlaceholder, SelectContent, SelectValue, SelectIcon, SelectTrigger, SelectListbox, Skeleton, Text } from "@hope-ui/solid"
import FlightResult from "../components/FlightResult"

const Result = () => {
    const params = useParams()

    return (
        <>
            <Navbar color={tNavbar() ? 'white' : 'black'} bg={tNavbar() ? 'transparent' : 'white'}/>
            <Box position="relative">
                <Box d="flex" alignItems="center" justifyContent="center" css={{ filter: 'brightness(0.4)' }} w="100%" h="$sm" objectFit="cover" as="img" src="https://www.teahub.io/photos/full/39-393349_flying-flight-images-hd.jpg"></Box>
                <Box p="$10" textAlign="center" color="white" top="0" left="0" bottom="0" w="100%" display="flex" position="absolute" alignItems="center" justifyContent="center">
                    <Heading size={{"@initial": "xl", "$md": "4xl"}} textTransform="uppercase">
                        Booking Info
                    </Heading>
                </Box>
            </Box>
            <Box w="100%">
                
            </Box>
        </>
    )
}