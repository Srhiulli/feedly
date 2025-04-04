import { Button, Card, Field, Input, Stack, Text } from "@chakra-ui/react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Navigate } from "react-router-dom";


const Signup = () => {
  const signupSchema = yup.object({
  user: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  });
  
   const formik = useFormik({
    initialValues: {
      user: '',
      password: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      const user = await validateUser(values.user);
      if (user) {
        Navigate('/'); 
      } else {
        formik.setStatus({ invalidUser: 'User not found.' }); 
      }
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
          <Field.Root isInvalid={formik.touched.user && !!formik.errors.user}>
            <Field.Label>Username</Field.Label>
            <Input
              type="text"
              name="user"
              placeholder="Enter your email"
              value={formik.values.user}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.user && formik.errors.user && (
              <Text color="red.500" fontSize="sm">
                {formik.errors.user}
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
     {formik.status?.invalidUser && (
          <Text color="red.500" fontSize="sm">
            {formik.status.invalidUser}
          </Text>
        )}
        <Button
          type="submit"
          variant="outline"
          onClick= {formik.isSubmitting}
        >
          Signup
        </Button>

      </Card.Footer>
    </Card.Root>
)
}

export default Signup;
