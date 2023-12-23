import { Container, Title, Text, Button, SimpleGrid } from "@mantine/core";
import Image from "next/image";

export default function NotFoundImage() {
  return (
    <Container className="pt-[80px] pb-[20px]">
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <div>
          <Title className="font-extrabold mb-4">
            Something is not right...
          </Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Button variant="outline" size="md" mt="xl">
            Get back to home page
          </Button>
        </div>
        <Image
          src={"/404.svg"}
          alt="404-image"
          width={0}
          height={0}
          className="w-full"
        />
      </SimpleGrid>
    </Container>
  );
}
