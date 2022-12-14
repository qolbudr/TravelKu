import {
  Box, 
  Button, 
  SimpleGrid, 
  Text, 
  HStack, 
  Badge, 
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Anchor
} from '@hope-ui/solid'
import * as utils from '../function/utils'
import { IoAirplane } from 'solid-icons/io'
import { createSignal } from "solid-js"
import { Link, Navigate } from "@solidjs/router"

const FlightResult = (props) => {
    const departureTime = utils.parseDate(props.departureTime)
    const arrivalTime = utils.parseDate(props.arrivalTime)
    const [isHide, setHide] = createSignal(true)

    const gotoBooking = () => {
        localStorage.setItem('bookingData', JSON.stringify(props.item))
        return (
            window.location.href = '#/booking'
        )
    }

    return (
        <>
            <Box onClick={() => setHide(!isHide())} border="1px solid $danger7" mb={props.hideButton ? '0px' : isHide() ? "30px" : "0px"} borderRadius={props.hideButton ? "none" : isHide() ? "$md" : "none"} px={{"@initial": "20px", "@md": "30px"}} py={{"@initial": "15px", "@md": "@20px"}} w="100%">
                <SimpleGrid justifyContent="space-between" gap="10px" alignItems="center" columns={{ "@initial": 1, "@md": 3 }} textAlign="left">
                    <HStack alignItems="center" gap="10px">
                        <Box  w="50px" h="50px" borderRadius="$full" backgroundColor="$danger4" display={props.hideButton ? 'none' : 'flex'} alignItems="center" justifyContent="center">
                            <IoAirplane color="red"/>  
                        </Box>
                        <Box>
                            <Text>{props.airlineName}</Text>
                            <Text size="xs">{props.carrierCode} - {props.carrierNumber}</Text>
                        </Box>
                    </HStack>
                    <HStack justifyContent="center" alignItems="center" gap="10px">
                        <Box textAlign="right">
                            <Badge colorScheme="danger">{props.departureIataCode}</Badge>
                            <Text size="sm">{departureTime.date}  {departureTime.time}</Text>
                        </Box>
                        <Box w="35%" h="1px" backgroundColor="$danger5"/>
                        <Box textAlign="left">
                            <Badge colorScheme="danger">{props.arrivalIataCode}</Badge>
                            <Text size="sm">{arrivalTime.date}  {arrivalTime.time}</Text>
                        </Box>
                    </HStack>
                    <Box textAlign={{"@initial": "left", "@md": "right"}}>
                        <Text fontSize="$lg" fontWeight="$medium" color="$danger11">IDR {utils.parsePrice(props.price)}</Text>
                        <Button display={props.hideButton ? 'none' : 'inline-flex'} onClick={() => gotoBooking()} size="sm" mt="10px" colorScheme="danger">Choose</Button>
                    </Box>
                </SimpleGrid>
            </Box>
            
            <Box hidden={props.hideButton ? false : isHide() ? true : false} border="1px solid $danger7" borderTop="none" mb="20px" px={{"@initial": "20px", "@md": "30px"}} py={{"@initial": "15px", "@md": "@20px"}} w="100%">
                {props.item.itineraries.map((itema) =>
                    <Box>
                        {itema.segments.map((item) => {
                            const departureTime = utils.parseDate(item.departure.at)
                            const arrivalTime = utils.parseDate(item.arrival.at)
                            return (
                                <Box>
                                    <Box display="flex" w="100%" alignItems="center" position="relative">
                                        <Box ml="30px" w="100%">
                                            <Box mb="10px">
                                                <Text size="sm">{item.departure.iataCode}</Text>
                                                <Text size="xs" color="$neutral11">TERMINAL {item.departure.terminal} at {departureTime.date} {departureTime.time}</Text>
                                            </Box>
                                            <Box backgroundColor="$neutral2" display="flex" w="100%" border="1px solid $danger7" borderRadius="$md" p="$5">
                                                <HStack alignItems="center" gap="10px">
                                                    <Box w="50px" h="50px" borderRadius="$full" backgroundColor="$danger4" display="flex" alignItems="center" justifyContent="center">
                                                        <IoAirplane color="red"/>  
                                                    </Box>
                                                    <Box>
                                                        <Text>{props.flight.dictionaries.carriers[item.carrierCode]}</Text>
                                                        <Text size="xs">{item.carrierCode} - {item.number}</Text>
                                                    </Box>
                                                </HStack>
                                            </Box>
                                            <Box mt="10px">
                                                <Text size="sm">{item.arrival.iataCode}</Text>
                                                <Text size="xs" color="$neutral11">TERMINAL {item.arrival.terminal} at {arrivalTime.date} {arrivalTime.time}</Text>
                                            </Box>
                                        </Box>
                                        <Box backgroundColor="$danger7" left="-5px" position="absolute" top="0" w="10px" h="10px" borderRadius="$full"></Box>
                                        <Box w="1px" backgroundColor="$danger7" position="absolute" top="0" bottom="0"></Box>
                                        <Box backgroundColor="$danger7" left="-5px" position="absolute" bottom="0" w="10px" h="10px" borderRadius="$full"></Box>
                                    </Box>

                                    <Alert status="success" my="30px">
                                        Stop and change planes in next arrival
                                    </Alert>
                                </Box>
                            )
                        })}
                    </Box>
                )}
            </Box>
            
        </>
    )
}

export default FlightResult;