import { createSignal, onMount } from "solid-js";
import { FormControl, Box, Text, Input, FormLabel, Heading } from "@hope-ui/solid";
import airport from 'airport-codes'

const AutoComplete = (props) => {
    const [isVisible, setVisibility] = createSignal(false)
    const [suggestion, setSuggestion] = createSignal([])
    const [value, setValue] = createSignal("")

    const showSuggestion = () => {
        setValue('')
        setVisibility(true)
    }
    const hideSuggestion = () => setVisibility(false)

    const searchSuggestion = (params) => {
        const parsedSuggestion = airport.toJSON()
        const data = parsedSuggestion.filter(item =>
                item.iata && JSON.stringify(item).toLowerCase().includes(params.toLowerCase())
        )

        setSuggestion(data.slice(0, 5))
        return data;
    }

    onMount(() => {
        searchSuggestion('bali')
    })

    return (
        <FormControl position="relative">
            <FormLabel>{props.label}</FormLabel>
            <Input value={value()} readOnly={!isVisible()} onKeyUp={(e) => searchSuggestion(e.target.value)} onClick={showSuggestion} type="text" placeholder={props.placeholder}/>
            <Box maxHeight="200px" width="100%" overflowY="scroll" zIndex="9999" backgroundColor="white" position="absolute" border="1px solid" borderColor="$accent5" hidden={!isVisible()} background="white">
                <ul>
                    {suggestion().map(item => (
                        <li>
                            <Box onClick={() => {
                                setValue(`${item.city} - ${item.country} (${item.iata}) `)
                                props.callback(value(), props.placeholder.toLowerCase())
                                hideSuggestion()
                            }} css={{cursor: 'pointer'}} borderBottom="1px solid" borderBottomColor="$accent5" px="$5" py="$2">
                                <Text fontSize="$sm" color="black">{item.city} - {item.country}</Text>
                                <Text fontSize="$xs" color="$accent7">{item.name} ({item.iata})</Text>
                            </Box>
                        </li>
                    ))}
                </ul>
            </Box>
        </FormControl>
    )
}

export default AutoComplete;