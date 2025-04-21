import { Box, Flex, Heading, Text, Button, VStack, SimpleGrid } from '@chakra-ui/react';
import { useAuth } from '../hooks/user';
import { useEffect, useState } from 'react';
import { useFeedback } from '../hooks/feedback';

export default function Dashboard() {

  const {getFeedbackByUserId} = useFeedback();
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const { getUserById } = useAuth();


  useEffect(() => {
    fetchUser('cf58d2d0-a2e2-4faf-a31a-1b45988d5f87');
    fetchFeedback('cf58d2d0-a2e2-4faf-a31a-1b45988d5f87');
  }, [])

  const fetchUser = async (id) => {
    const response = await getUserById(id);
    if (!response?.user) {
      console.log('Usuário não encontrado');
      return;
    }
    setUser(response.user);
  };

const fetchFeedback = async (user_id) => {
  const response = await getFeedbackByUserId(user_id) 
      if (!response) {
      return;
      }
    setFeedback(response.feedback);
};
  

  const calculateAverageStars = () => {
    if (!feedback.length) return '0 / 5';
    const total = feedback.reduce((sum, f) => sum + f.stars, 0);
    const avg = total / feedback.length;
    return `${avg.toFixed(1)} / 5`;
  };

  return (
    <Box p={8} minH="100vh" minW="100vw">
      <Heading mb={6}>Hello, {user? user.name : 'loading...' } 👋</Heading>

      <SimpleGrid columns={[1, 2, 3]} spacing={6} mb={10}>
        <StatCard title="Received feedbacks" value={feedback.length} />
        <StatCard title="Average rating" value={calculateAverageStars()} />
      </SimpleGrid>

      <Flex justify="space-between" mb={4}>
        <Heading size="md">Latest feedbacks</Heading>
        <Button colorScheme="teal">Give Feedback</Button>
      </Flex>

      <VStack spacing={4} align="stretch">
        {feedback ? (
          feedback.map((item) => (
            console.log('item', item),
            <FeedbackCard
              key={item.id}
              name={item.userName || 'Unknown'}
              message={item.message}
              date={new Date(item.created_at).toLocaleDateString()}
            />
          ))
        ) : (
          'You have no feedbacks yet.'
        )}
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