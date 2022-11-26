import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Link,
  TextareaAutosize,
  Toolbar,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import CopyToClipboard from "./Copy";

function Footer() {
  return (
    <footer>
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="textSecondary" align="center">
          {" Open source project "}
          <Link color="inherit" href="https://github.com/atamano/pgn-sanitize">
            hosted on github
          </Link>
        </Typography>
      </Box>
    </footer>
  );
}

function Home() {
  const [rawPgn, setRawPgn] = useState("");
  const [sanitizedPgn, setSanitizedPgn] = useState("");

  useEffect(() => {
    setSanitizedPgn(rawPgn.replace(/(\r\n|\n|\r)/gm, " "));
  }, [rawPgn]);

  const onFileUpload = (e: BaseSyntheticEvent) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      if (!event || !event.target) {
        return;
      }
      const text = event.target.result;
      if (!text) {
        setRawPgn("");
        return;
      }
      const rawText = text as string;
      setRawPgn(rawText);
    };
    reader.readAsText(e.target.files[0]);
  };

  const onClear = () => {
    setRawPgn("");
  };

  return (
    <main style={{ textAlign: "center" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            PGN Sanitizer
          </Typography>
        </Toolbar>
      </AppBar>
      <section>
        <Container maxWidth="md">
          <Box sx={{ my: 4 }}>
            <Typography variant="h5" component="h1" gutterBottom>
              Sanitize your chessbase PGN
            </Typography>
          </Box>
          <TextareaAutosize
            onChange={(e) => setRawPgn(e.target.value)}
            minRows={15}
            maxRows={15}
            placeholder="Copy and paste your PGN here"
            style={{ width: "100%" }}
            value={rawPgn}
          />
          <Box sx={{ mb: 4 }}>
            <Button variant="outlined" component="label">
              Or upload your file
              <input onChange={onFileUpload} hidden type="file" />
            </Button>
          </Box>
          {!!sanitizedPgn && (
            <Stack spacing={4}>
              <Divider />
              <Box>
                <Typography variant="h6" component="h4" gutterBottom>
                  Sanitized PGN:
                </Typography>
                <CopyToClipboard>
                  {({ copy }) => (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => copy(sanitizedPgn)}
                    >
                      Copy result
                    </Button>
                  )}
                </CopyToClipboard>
                <Button
                  sx={{ ml: 1 }}
                  onClick={onClear}
                  color="warning"
                  variant="contained"
                  component="label"
                >
                  Reset
                </Button>
              </Box>
              <TextareaAutosize
                disabled
                value={sanitizedPgn}
                minRows={15}
                maxRows={15}
                placeholder="Result"
                style={{ width: "100%" }}
              />
            </Stack>
          )}
        </Container>
      </section>
      <Footer />
    </main>
  );
}

export default Home;
