import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  TextareaAutosize,
  Toolbar,
  Typography,
} from "@mui/material";
import React, {
  BaseSyntheticEvent,
  Fragment,
  useEffect,
  useState,
} from "react";
import CopyToClipboard from "./Copy";

import "./Home.css";

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
    <main className="Home">
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
            <Typography variant="h4" component="h1" gutterBottom>
              Sanitize your chessbase PGN
            </Typography>
          </Box>
          <TextareaAutosize
            onChange={(e) => setRawPgn(e.target.value)}
            minRows={10}
            maxRows={20}
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
            <Box sx={{ mb: 4 }}>
              <Divider />
              <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  Sanitized PGN
                </Typography>
              </Box>
              <Box sx={{ mb: 4 }}>
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
                  style={{ marginLeft: 4 }}
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
                minRows={10}
                maxRows={20}
                placeholder="Result"
                style={{ width: "100%" }}
              />
            </Box>
          )}
        </Container>
      </section>
    </main>
  );
}

export default Home;
