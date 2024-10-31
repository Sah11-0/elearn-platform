import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useAssignmentStore } from '../store/Assignment';

const CreatePage = () => {
	const [newAssignment, setNewAssignment] = useState({
		title: "",
		description: "",
	});

	const toast = useToast();

	const { createAssignment } = useAssignmentStore();

	const handleAddAssignment = async () => {
		const { success, message } = await createAssignment(newAssignment);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true,
			});
		}
		setNewAssignment({ title: "", description: "" });
	};

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create New Assignment
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder='Assignment Title'
							name='title'
							value={newAssignment.title}
							onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
						/>
						<Input
							placeholder='Description'
							name='description'
							value={newAssignment.description}
							onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
						/>

						<Button colorScheme='blue' onClick={handleAddAssignment} w='full'>
							Add Assignment
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};
export default CreatePage;