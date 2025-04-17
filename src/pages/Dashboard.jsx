import { Box, Flex, Heading, Text, Button, VStack, SimpleGrid } from '@chakra-ui/react';

export default function Dashboard() {
  return (
    <Box p={8} minH="100vh" minW="100vw">
      <Heading mb={6}>Olá, Sarah 👋</Heading>

      <SimpleGrid columns={[1, 2, 3]} spacing={6} mb={10}>
        <StatCard title="Feedbacks recebidos" value="12" />
        <StatCard title="Feedbacks enviados" value="7" />
        <StatCard title="Média de avaliações" value="4.6 / 5" />
      </SimpleGrid>

      <Flex justify="space-between" mb={4}>
        <Heading size="md">Últimos feedbacks recebidos</Heading>
        <Button colorScheme="teal">Dar Feedback</Button>
      </Flex>

      <VStack spacing={4} align="stretch">
        <FeedbackCard name="João" message="Gostei da sua última entrega, bem completa!" date="12/04/2025" />
        <FeedbackCard name="Ana" message="Você foi super colaborativa no projeto!" date="10/04/2025" />
      </VStack>
    </Box>
  );
}

function StatCard({ title, value }) {
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
      <Text fontSize="sm" color="gray.500">{title}</Text>
      <Text fontSize="2xl" fontWeight="bold">{value}</Text>
    </Box>
  );
}

function FeedbackCard({ name, message, date }) {
  return (
    <Box p={5} shadow="sm" borderWidth="1px" borderRadius="md">
      <Flex justify="space-between" mb={2}>
        <Text fontWeight="bold">{name}</Text>
        <Text fontSize="sm" color="gray.500">{date}</Text>
      </Flex>
      <Text>{message}</Text>
    </Box>
  );
}