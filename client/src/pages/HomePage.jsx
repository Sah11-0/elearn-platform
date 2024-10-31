import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAssignmentStore } from "../store/assignment";
import AssignmentCard from "../components/AssignmentCard";

const HomePage = () => {
	const { fetchAssignments, assignments } = useAssignmentStore();

	useEffect(() => {
		fetchAssignments();
	}, [fetchAssignments]);

	return (
		<Container maxW='container.xl' py={12}>
			<VStack spacing={8}>
				<Text
					fontSize={"30"}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, cyan.600, cyan.700)"}
					bgClip={"text"}
					textAlign={"center"}
				>
					Current Assignments 
				</Text>

				<SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					spacing={10}
					w={"full"}
				>
					{assignments.map((assignment) => (
						<AssignmentCard key={assignment._id} assignment={assignment} />
					))}
				</SimpleGrid>

				{assignments.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No assignments found {" "}
						<Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create an assignment
							</Text>
						</Link>
					</Text>
				)}
			</VStack>
		</Container>
	);
};
export default HomePage;