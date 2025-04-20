import { Box, Flex, Heading, Text, Button, VStack, SimpleGrid } from '@chakra-ui/react';
import prisma from '../../backend/src/lib/prismaClient';
import { useAuth } from '../hooks/user';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const { getUserById } = useAuth();


  // useEffect(() => {
  //   fetchUser('cf58d2d0-a2e2-4faf-a31a-1b45988d5f87');
  // })

  const fetchUser = async (id) => {
    const response = await getUserById(id);
    if (!response?.user) {
      console.log('Usuário não encontrado');
      return;
    }
    setUser(response.user);
  };



  const getFeedback = async (user_id) => {
    const message = await prisma.feedback.findMany({
      where: { user_id },
      select: {
        id: true,
        message: true,
        deleted_at: true,
        created_at: true
      }
    })
    if (!message) {
      console.log('feedback not found');
    }
    setFeedback(message);
  }
 

  return (
    <Box p={8} minH="100vh" minW="100vw">
      <Heading mb={6}>Olá, {user? user.name : 'loading...' } 👋</Heading>

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