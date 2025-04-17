import { Button, Card, Field, Input, Stack, Text } from "@chakra-ui/react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from "../hooks/user";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const { handleCreateUser } = useAuth();

  const navigate = useNavigate();

  const signupSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .min(3, 'Email must be at least 3 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  });
  
   const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signupSchema,
     onSubmit: async (values, {setStatus}) => {
       const response = await handleCreateUser(values.email, values.password)
       if(response.error) {
          setStatus({ error: 'Signup failed' });
       } 
       navigate('/dashboard');
       
    },
  });
  


  return (
    <Card.Root maxW="sm" as="form" onSubmit={formik.handleSubmit}>
      <Card.Header>
        <Card.Title>Signup</Card.Title>
        <Card.Description>
          Welcome! Please signup to create your account.
        </Card.Description>
      </Card.Header>

      <Card.Body>
        <Stack gap="4" w="full">
          <Field.Root isInvalid={formik.touched.email && !!formik.errors.email}>
            <Field.Label>Email</Field.Label>
            <Input
              type="text"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <Text color="red.500" fontSize="sm">
                {formik.errors.email}
              </Text>
            )}
          </Field.Root>

          <Field.Root isInvalid={formik.touched.password && !!formik.errors.password}>
            <Field.Label>Password</Field.Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <Text color="red.500" fontSize="sm">
                {formik.errors.password}
              </Text>
            )}
          </Field.Root>
        </Stack>
      </Card.Body>

      <Card.Footer justifyContent="flex-end">
     {formik.status?.error && (
          <Text color="red.500" fontSize="sm">
            {formik.status.error}
          </Text>
        )}
        <Button
          type="submit"
          variant="outline"
        >
          Signup
        </Button>

      </Card.Footer>
    </Card.Root>
)
}

export default Signup;
