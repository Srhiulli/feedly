import {  useState } from 'react';
import {
 Dialog,
  Button,
  Input,
  Textarea,
  Field,
} from '@chakra-ui/react';
import { useFeedback } from '../../hooks/feedback';


const CreateFeedbackDialog = ({setShowForm}) => {
const { handleCreateFeedback } = useFeedback();
const [formData, setFormData] = useState({
    title: '',
    message: '',
    stars: 1,
    is_public: false,
    status: 'resolved',
    category: 'produto',
    response: 'Ok',
    tags: ['qualidade', 'atendimento'] ,
    created_by: '18760e6c-ac14-452b-8db0-9eb3814aa800',
    user_id: '18760e6c-ac14-452b-8db0-9eb3814aa800',
  });
    
  const handleChange = (e) => {
   const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

    const handleNumberChange = (e) => {
        const { name, value } = e.target;
        const number = Number(value);
        if (value === '' || (number >= 0 && number <= 5 && value.length === 1)) {
            setFormData(prev => ({
                ...prev,
                [name]: Number(value)
            }))}
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
      try {
     const response = await handleCreateFeedback(
      formData.user_id,
      formData.created_by,
      formData.title,
      formData.message,
      formData.stars,
      formData.is_public,
      formData.status,
      formData.category,
      formData.response,
      formData.tags);
      setFormData({
        title: '',
        message: '',
        stars: 1,
        is_public: false,
        status: 'resolved',
        category: 'produto',
        response: 'Ok',
        tags: ['qualidade', 'atendimento'],
        created_by: '18760e6c-ac14-452b-8db0-9eb3814aa800',
        user_id: '18760e6c-ac14-452b-8db0-9eb3814aa800',
      });
          
          if (response) {
            setShowForm(false);
        }

    } catch (error) {
        console.error('Erro ao enviar feedback:', error);
    }
  };

   return (
    <>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Create Feedback</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <form id="create-feedback-form" onSubmit={handleSubmit}>
                <Field.Root mb={4}>
                  <Field.Label>Title</Field.Label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </Field.Root>

                <Field.Root mb={4}>
                  <Field.Label>Message</Field.Label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </Field.Root>

                <Field.Root mb={4}>
                  <Field.Label>Stars</Field.Label>
                  <Input
                    type="number"
                    name="stars"
                    min={0}
                    max={5}
                    value={formData.stars}
                    onChange={handleNumberChange}
                  />
                </Field.Root>

                 <Field.Root mb={4}>
                 Is public?
                  <input
                    type="checkbox"
                    name="is_public"
                    isChecked={formData.is_public}
                    onChange={handleChange}
                 /> 
                </Field.Root>


                   </form>
                <Dialog.Footer>
                      <Button variant="ghost" mr={3} onClick={() => setShowForm(false)}>
                      Cancel
                      </Button>
                       <Button
                           variant="outlined"
                            colorScheme="blue"
                            type="submit"
                            form="create-feedback-form"
                        >
                            Save
                    </Button>
            </Dialog.Footer>
            </Dialog.Body>
          </Dialog.Content>
    </>
  );
};

export default CreateFeedbackDialog;