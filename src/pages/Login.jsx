import { Button, Card, Field, Input, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useUserValidation } from "../hooks/user";
import { useFormik } from 'formik';
import * as yup from 'yup';

const loginSchema = yup.object({
  user: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const { validateUser } = useUserValidation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      user: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const user = await validateUser(values.user);
      if (user) {
        navigate('/dashboard'); // Redireciona se usuário existe
      } else {
        formik.setStatus({ invalidUser: 'User not found.' }); // Novo estado para erro global
      }
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

      <Card.Footer justifyContent="space-between">
        {formik.status?.invalidUser && (
          <Text color="red.500" fontSize="sm">
            {formik.status.invalidUser}
          </Text>
        )}
        <Button variant="link" onClick={() => navigate("/signup")}>
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