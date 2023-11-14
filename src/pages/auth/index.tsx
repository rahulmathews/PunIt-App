import { useRouter } from "next/router";
import { useState } from "react";

import Image from "next/image";

import { Center, Grid, Paper, Button, Group, Tabs } from "@mantine/core";

import LoginForm from "@punit-app/components/auth/login-form";
import RegisterForm from "@punit-app/components/auth/register-form";

export default function Auth() {
  const [auth, setAuth] = useState<string | null>("register");

  const router = useRouter();
  return (
    <Grid>
      <Grid.Col span={6}>
        <div className="relative h-screen">
          <Image
            src="/login-page.png"
            alt="Login Page Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </Grid.Col>
      <Grid.Col span={6}>
        {/* <Center> */}
        <Paper className="h-screen" shadow="xs" withBorder p="xl">
          <Center className="mt-[45px] ml-[100px]">
            <Grid>
              <Image
                className="ml-20"
                src="/assets/vector/isolated-monochrome-mod.svg"
                alt="Icon"
                width={100}
                height={100}
              />
              {/* Center the content in the middle of the screen */}
              <Grid.Col span={12} className="flex flex-col justify-center">
                {/* Square Box with Form */}
                <div className="w-72 p-6 bg-[#f0f0f0] shadow-[0 0 10px rgba(0,0,0,0.1)] rounded-lg">
                  {/* Your Form */}
                  <Tabs defaultValue="register" onChange={setAuth}>
                    <Tabs.List>
                      <Tabs.Tab value="register">Register</Tabs.Tab>
                      <Tabs.Tab value="login">Login</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="register">
                      <RegisterForm />
                    </Tabs.Panel>

                    <Tabs.Panel value="login">
                      <LoginForm />
                    </Tabs.Panel>
                  </Tabs>

                  <Group justify="center" mt="md">
                    <Button type="submit">
                      {auth === "register" ? "Register" : "Login"}
                    </Button>
                  </Group>
                </div>
              </Grid.Col>
            </Grid>
          </Center>
        </Paper>
        {/* </Center> */}
      </Grid.Col>
    </Grid>
  );
}
