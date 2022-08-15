import { Spinner, Grid, GridItem, FormHelperText, notificationService, SelectOptionIndicator, SelectOption, SelectOptionText, Box, FormControl, FormLabel, Heading, IconButton, Input, SimpleGrid, Select, SelectPlaceholder, SelectContent, SelectValue, SelectIcon, SelectTrigger, SelectListbox, Skeleton, Text } from "@hope-ui/solid"

const AdultForm = (props) => {
    return (
        <Box mb="20px" boxShadow="$md" backgroundColor="white" w="100%">
            <Box borderBottom="1px solid $neutral8" p="$5">
                <Heading size="md">Adult Passenger</Heading>
            </Box>
            <Box p="$5">
                <Text mb="20px" size="sm" color="green">Important: Passport valid for at least 6 months from departure date is required for international travel or transit abroad</Text>
                <Text mb="20px" size="sm" color="$warning10">Make sure that the passenger's name is exactly as written in the government issued ID/Passport/Driving License. \nAvoid any mistake, because some airlines don't allow name corrections after booking.</Text>
                <SimpleGrid columns={{ "@initial": 1, "@md": 2 }} gap="20px">
                    <FormControl>
                    <FormLabel>Gender</FormLabel>
                    <Box w="100%">
                        <select name={`gender-` + props.key} style={{'border-radius': '3px', 'padding': '8px', 'width': '100%', 'color': 'black', 'border': '1px solid #d7dbdf'}} placeholder="Gender">
                            <option value="MALE">MALE</option>
                            <option value="MALE">FEMALE</option>
                        </select>
                    </Box>
                    </FormControl>
                    <Box></Box>
                    <FormControl>
                    <FormLabel>First & Middle Name (if any)</FormLabel>
                    <Input name={'fn-' + props.key} type="text"/>
                    <FormHelperText>(without title and punctuation)</FormHelperText>
                    </FormControl>
                    <FormControl>
                    <FormLabel>Family Name / Last Name</FormLabel>
                    <Input name={'ln-' + props.key} type="text"/>
                    <FormHelperText>(without title and punctuation)</FormHelperText>
                    </FormControl>
                    <FormControl>
                    <FormLabel>Date of Birth</FormLabel>
                    <Input name={'dob-' + props.key} type="date"/>
                    <FormHelperText>Adult Passenger (Age 12 and older)</FormHelperText>
                    </FormControl>
                    <FormControl>
                    <FormLabel>Nationality</FormLabel>
                    <Input name={'nat-' + props.key} maxLength={2} type="text"/>
                    <FormHelperText>e.g. ID (Indonesia)</FormHelperText>
                    </FormControl>
                    <FormControl>
                    <FormLabel>Passport Number</FormLabel>
                    <Input name={'pn-' + props.key} type="number"/>
                    <FormHelperText>For passengers below 18 years old, you may enter another valid ID number (e.g. birth certificate, student ID) or date of birth (ddmmyyyy)</FormHelperText>
                    </FormControl>
                    <Box></Box>
                    <FormControl>
                    <FormLabel>Country of Issue</FormLabel>
                    <Input name={'coi-' + props.key} type="text" maxLength="2"/>
                    <FormHelperText>e.g. ID (Indonesia)</FormHelperText>
                    </FormControl>
                    <FormControl>
                    <FormLabel>Expiry Date</FormLabel>
                    <Input name={'exp-' + props.key} type="date"/>
                    </FormControl>
                </SimpleGrid>
            </Box> 
        </Box>
    )
}

export default AdultForm;