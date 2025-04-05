"use client";

import isPropValid from "@emotion/is-prop-valid";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  return (
    <StyleSheetManager
      sheet={typeof window === "undefined" ? styledComponentsStyleSheet.instance : undefined}
      shouldForwardProp={isPropValid}
    >
      {children}
    </StyleSheetManager>
  );
}
