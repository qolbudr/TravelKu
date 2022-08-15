import {
    Button, 
    Box, 
    HStack,
    FormControl,
    Select,
    SelectTrigger,
    SelectPlaceholder,
    SelectValue,
    SelectIcon,
    SelectContent,
    SelectListbox,
    SelectOption,
    SelectOptionText,
    SelectOptionIndicator,
    Input
    
} from '@hope-ui/solid'
import { createSignal } from 'solid-js'
import airlinesData from "../assets/airlines.json"

const Filter = (props) => {
    const [filter, setFilter] = createSignal({
        airlines: null,
        priceStart: null,
        priceEnd: null
    })

    return (
        <Box backgroundColor="white" p="$2" w={{"@initial": "100%", "@md": "50%"}} boxShadow="$sm" mb="20px">
            <HStack gap="10px" alignItems="end">
                <FormControl>
                    <Select value={props.airlineVal} size="sm" onChange={(v) => {
                        const data = filter()
                        data.airlines = v
                        setFilter(data)
                        props.onChange(data)
                    }}>
                        <SelectTrigger>
                        <SelectPlaceholder>Airlines</SelectPlaceholder>
                        <SelectValue />
                        <SelectIcon />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectListbox>
                                <SelectOption value='ALL'>
                                <SelectOptionText>ALL AIRLINES</SelectOptionText>
                                <SelectOptionIndicator />
                                </SelectOption>
                            {Object.entries(props.airline).map(([k,v]) => 
                                <SelectOption value={k}>
                                <SelectOptionText>{v}</SelectOptionText>
                                <SelectOptionIndicator />
                                </SelectOption>
                            )}
                        </SelectListbox>
                        </SelectContent>
                    </Select>
                </FormControl>
                <FormControl>
                    <Input value={props.priceStart} onChange={(e) => {
                        const data = filter()
                        data.priceStart = e.target.value
                        setFilter(data)
                        props.onChange(data)
                    }} type="number" size="sm" placeholder="Price Start from"></Input>
                </FormControl>
                <FormControl>
                    <Input value={props.priceEnd} onChange={(e) => {
                        const data = filter()
                        data.priceEnd = e.target.value
                        setFilter(data)
                        props.onChange(data)
                    }} type="number" size="sm" placeholder="Price to"></Input>
                </FormControl>
                <Button onClick={() => props.onClick()} size="sm"  w="100px" colorScheme="danger">Filter</Button>
            </HStack>
        </Box>
    )
}

export default Filter;