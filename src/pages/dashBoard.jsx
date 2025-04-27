import { Box, Flex, Heading, Text, Button, VStack, SimpleGrid, Dialog } from '@chakra-ui/react';
import { useAuth } from '../hooks/user';
import { useEffect, useState } from 'react';
import { useFeedback } from '../hooks/feedback';
import { format } from 'date-fns';
import CreateFeedbackDialog from '../components/UserCard/CreateFeedback';

export default function Dashboard() {
  const { getFeedbackByUserId } = useFeedback();
  const [user, setUser] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const { getUserById } = useAuth();
  const [showForm, setShowForm] = useState(false);


  useEffect(() => {
    fetchUser('18760e6c-ac14-452b-8db0-9eb3814aa800');
    fetchFeedback('18760e6c-ac14-452b-8db0-9eb3814aa800');
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
    const response = await getFeedbackByUserId(user_id);
    if (!response) return;
    setFeedback(response.feedback);
  };
  
  const calculateAverageStars = () => {
    if (!feedback.length) return '0 / 5';
    const total = feedback.reduce((sum, f) => sum + f.stars, 0);
    const avg = total / feedback.length;
    return `${avg.toFixed(1)} / 5`;
  };

  const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.href = '/'; 
};

  return (
    <Box p={{ base: 4, lg: 8 }} minH="100vh" minW="100vw">
      <Heading mb={{ base: 4, lg: 6 }} fontSize={{ base: 'xl', lg: '2xl' }}>
        Hello, {user ? user.name : 'loading...'} 👋
      </Heading>

      <SimpleGrid 
        columns={{ base: 1, md: 2, xl: 3 }} 
        spacing={{ base: 3, lg: 6 }}
        mb={{ base: 6, lg: 10 }}
      >
        <StatCard title="Received feedbacks" value={feedback.length} />
        <StatCard title="Average rating" value={calculateAverageStars()} />
      </SimpleGrid>

      <Flex 
        justify="space-between" 
        align="center" 
        mb={4}
        flexDirection={{ base: 'column', md: 'row' }} 
        gap={3} 
      >
        <Heading size="md">Latest feedbacks</Heading>

        <Flex gap={3}>
          <Button 
            variant="ghost"
            size="md" 
            width={{ base: '100%', md: 'auto' }} 
            onClick={() => setShowForm(true)}
          >
            Give Feedback
          </Button>

          <Button 
            variant="ghost"
            size="md" 
            width={{ base: '100%', md: 'auto' }}
            onClick={handleLogout}
          >
            Logout
          </Button>
      </Flex>

  {showForm && (
    <Dialog.Root open={showForm} onOpenChange={setShowForm} size="md" placement="center">
      <Dialog.Trigger />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <CreateFeedbackDialog setShowForm={setShowForm} />                   
      </Dialog.Positioner>
    </Dialog.Root>
  )}
      </Flex>

      <VStack spacing={4} align="stretch">
        {feedback?.length ? (
          feedback.map((item) => (
            <FeedbackCard
              key={item.id}
              message={item.message}
              name={item.user?.name || 'unknown'}
              date={format(new Date(Number(item.created_at)), 'dd/MM/yyyy HH:mm')}
            />
          ))
        ) : (
          <Text>You have no feedbacks yet.</Text>
        )}
      </VStack>
    </Box>
  );
}

function StatCard({ title, value }) {
  return (
    <Box 
      p={{ base: 3, lg: 5 }}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      minWidth="0" 
    >
      <Text fontSize="sm" color="gray.500">{title}</Text>
      <Text fontSize="xl" fontWeight="bold" noOfLines={1}>{value}</Text>
    </Box>
  );
}

function FeedbackCard({ name, message, date }) {
  return (
    <Box
      p={{ base: 3, lg: 5 }}
      shadow="sm"
      borderWidth="1px"
      borderRadius="md"
    >
      <Flex 
        justify="space-between"
        direction={{ base: 'column', sm: 'row' }} 
        gap={2}
        mb={2}
      >
        {name && <Text fontWeight="bold">{name}</Text>}
        <Text fontSize="sm" color="gray.500">{date}</Text>
      </Flex>
      <Text>{message}</Text>
    </Box>
  );
}