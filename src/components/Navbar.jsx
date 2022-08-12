import { Button, Text, Anchor, Flex, Input, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Box, Spacer, Heading, IconButton, } from "@hope-ui/solid"
import { createSignal } from "solid-js"
import { FiMenu } from 'solid-icons/fi'
  
const Navbar = (props) => {
    const [isOpen, setOpen] = createSignal(false)

    return (
        <>
            <Box zIndex="999" color={props.color} top="0" position="fixed" w="100%" backgroundColor={props.bg} py="$5" px="$10" boxShadow="$sm">
                <Flex alignItems="center">
                    <Heading size="xl" fontWeight="$medium">
                        Travel
                    </Heading>
                    <Text size="xl" fontWeight="$medium" color="$danger11">Ku</Text>
                    <Spacer/>
                    <Flex display={{"@initial": "none", "@md": "flex"}}>
                        <Anchor textDecoration="none" _hover={{"textDecoration": "none"}} href="/login">Login</Anchor>
                        <Anchor textDecoration="none" _hover={{"textDecoration": "none"}} ml="$8" href="/register">Sign Up</Anchor>
                    </Flex>
                    <IconButton colorScheme="danger" onClick={() => { setOpen(true) }} display={{"@initial": "flex", "@md": "none"}} aria-label="menu" icon={<FiMenu/>}/>
                </Flex>
            </Box>
            <Drawer opened={isOpen()} placement="left" onClose={() => {}}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton onClick={() => { setOpen(false) }} />
                    <DrawerHeader>Create your account</DrawerHeader>

                    <DrawerBody>
                        <Input placeholder="Type here..." />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant="outline" mr="$3" onClick={() => { setOpen(false) }}>
                            Cancel
                        </Button>
                        <Button>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Navbar