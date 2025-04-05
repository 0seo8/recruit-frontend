"use client";

import styled from "styled-components";
import { Button } from "./components/Button";
import { AppBar } from "./components/AppBar";

export default function Home() {
  return (
    <div>
      <main>
        <AppBar title="테스트" onClose={() => {}} />
        <Container>
          <Button>버튼</Button>
          <Button disabled>버튼</Button>
          <Button type="outline">버튼</Button>
        </Container>
      </main>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  gap: 16px;
`;
