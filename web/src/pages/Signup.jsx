import { Button, Card, Field, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    user: "",
    password: "",
  });  const [errors, setErrors] = useState({
    user: "",
    password: "",
    invalidUser: "",
  });
    const newErrors = { user: "", password: "", invalidUser: "" };

  const validateForm = () => {
    let isValid = true;
    if (!formData.user.trim()) {
      newErrors.user = "Username is required";
      isValid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value.trim() !== "") {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log(formData.user);
    }
  };

  return (
    <Card.Root maxW="sm" as="form" onSubmit={handleSubmit}>
      <Card.Header>
        <Card.Title>Signup</Card.Title>
        <Card.Description>
          Welcome! Please signup to create your account.
        </Card.Description>
      </Card.Header>

      <Card.Body>
        <Stack gap="4" w="full">
          <Field.Root isInvalid={!!errors.user}>
            <Field.Label>Username</Field.Label>
            <Input
              type="text"
              name="user"
              placeholder="Enter your username"
              value={formData.user}
              onChange={handleInputChange}
            />
            {errors.user && (
              <Text color="red.500" fontSize="sm">
                {errors.user}
              </Text>
            )}
          </Field.Root>

          <Field.Root isInvalid={!!errors.password}>
            <Field.Label>Password</Field.Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <Text color="red.500" fontSize="sm">
                {errors.password}
              </Text>
            )}
          </Field.Root>
        </Stack>
      </Card.Body>

      <Card.Footer justifyContent="flex-end">
        {errors.invalidUser && (
          <Text color="red.500" fontSize="sm">
            {errors.invalidUser}
          </Text>
        )}
        <Button
          type="submit"
          variant="outline"
          onClick={() => handleSubmit}
        >
          Signup
        </Button>

      </Card.Footer>
    </Card.Root>
)
}

export default Signup;
