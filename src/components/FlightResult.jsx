import {Box, Button, SimpleGrid, Text, HStack, Badge} from '@hope-ui/solid'
import * as utils from '../function/utils'
import { IoAirplane } from 'solid-icons/io'

const FlightResult = (props) => {
    const departureTime = utils.parseDate(props.departureTime)
    const arrivalTime = utils.parseDate(props.arrivalTime)
    return (
        <Box border="1px solid $danger7" borderRadius="$md" mb="20px" px={{"@initial": "20px", "@md": "30px"}} py={{"@initial": "15px", "@md": "@20px"}} w="100%">
            <SimpleGrid justifyContent="space-between" gap="10px" alignItems="center" columns={{ "@initial": 1, "@md": 3 }} textAlign="left">
                <HStack alignItems="center" gap="10px">
                    <Box w="50px" h="50px" borderRadius="$full" backgroundColor="$danger4" display="flex" alignItems="center" justifyContent="center">
                        <IoAirplane color="red"/>  
                    </Box>
                    <Text>{props.carrierCode} - {props.carrierNumber}</Text>
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
                    <Button size="sm" mt="10px" colorScheme="danger">Choose</Button>
                </Box>
            </SimpleGrid>
        </Box>
    )
}

export default FlightResult;