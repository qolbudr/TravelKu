import {Box, Skeleton} from '@hope-ui/solid'
const Shimmer = () => {
    return (
        <Box mb="20px" boxShadow="$md" px={{"@initial": "20px", "@md": "30px"}} py={{"@initial": "15px", "@md": "@20px"}} w="100%" borderRadius={{"@initial": "@md", "@md": "@xl"}}>
            <Skeleton height="20px" width="30%"/>
            <Skeleton mt="10px" height="20px" width="45%"/>
            <Skeleton mt="10px" height="20px" width="85%"/>
            <Skeleton mt="10px" height="20px" width="10%"/>
        </Box>
    )
}

export default Shimmer;