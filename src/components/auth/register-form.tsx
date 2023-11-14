import { TextInput, Box, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function RegisterForm() {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="your name"
          mt="lg"
          radius={10}
          {...form.getInputProps("name")}
        />

        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          mt="lg"
          radius={10}
          {...form.getInputProps("email")}
        />

        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="your password"
          mt="lg"
          radius={10}
          {...form.getInputProps("password")}
        />
      </form>
    </Box>
  );
}
