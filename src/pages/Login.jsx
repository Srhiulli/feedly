import { Button, Card, Field, Input, Stack, Text } from "@chakra-ui/react";
import { useAuth } from "../hooks/user";
import { useFormik } from 'formik';
import * as yup from 'yup';

const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .min(3, 'Email must be at least 3 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const { validateUser } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
     const response = await validateUser(values.email, values.password);
      if(response.error) {
        setStatus({ error: 'Login failed' });
      } 
        setSubmitting(false);
    },
  });

  return (
    <Card.Root maxW="sm" as="form" onSubmit={formik.handleSubmit}>
      <Card.Header>
        <Card.Title>Login</Card.Title>
        <Card.Description>
          Welcome back! Please login to your account.
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

      <Card.Footer justifyContent="space-between">
        {formik.status?.error && (
          <Text color="red.500" fontSize="sm">
            {formik.status?.error}
          </Text>
        )}
        <Button variant="link" onClick={() => console.log('logado')}>
          Signup
        </Button>
        <Button type="submit" isLoading={formik.isSubmitting}>
          Login
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default Login;